import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Toast from '~/components/ToastMessage';
import { Routes } from '~/navigation/routes';
import { clearCart } from '~/screens/Cart/store/cartReducer';
import { baseApiClient } from '~/utils/API/baseClient';
import { profileAPI } from '~/utils/API/profileAPI';
import { queryClient } from '~/utils/hocs/withQuery';
import i18next from '~/utils/localisation';
import { mmkvStorage } from '~/utils/services/mmkvStorage/mmkvStorage';
import { MMKVKeys } from '~/utils/services/mmkvStorage/types';
import { navigationService } from '~/utils/services/navigationService';
import { clearAddresses } from '../addresses/addressesReducer';
import { setSecrets } from './profileReducer';
import { ProfileState, ProfileType, UserNutritionType } from './types';

export const clearOldDataThunk = createAsyncThunk('clearOldDataThunk', async (_, thunk) => {
  const { dispatch } = thunk;

  if (!mmkvStorage.getValue(MMKVKeys.HAS_ADDRESSES_BEEN_CLEARED_AFTER_UPDATING, 'boolean')) {
    mmkvStorage.setValue(MMKVKeys.HAS_ADDRESSES_BEEN_CLEARED_AFTER_UPDATING, true);
    dispatch(clearAddresses());
  }

  if (!mmkvStorage.getValue(MMKVKeys.HAS_CART_BEEN_CLEARED_AFTER_UPDATING, 'boolean')) {
    mmkvStorage.setValue(MMKVKeys.HAS_CART_BEEN_CLEARED_AFTER_UPDATING, true);
    dispatch(clearCart());
  }
});

export const configureProfileThunk = createAsyncThunk(
  'configureProfileThunk',
  async (user: FirebaseAuthTypes.User, thunk) => {
    const token = await user.getIdToken();
    baseApiClient.setAccessToken(token);
    thunk.dispatch(setSecrets({ userId: user.uid, token }));

    const { profile } = thunk.getState() as { profile: ProfileState };

    return await profileAPI.getProfile(profile.userId);
  },
);

export const patchProfileThunk = createAsyncThunk(
  'patchProfileThunk',
  async (patchData: Partial<ProfileType>, thunk) => {
    const { profile } = thunk.getState() as { profile: ProfileState };

    return await profileAPI.patchProfile(profile.userId, patchData);
  },
);

export const sendDeviceToken = createAsyncThunk('sendDeviceToken', async (_, thunk) => {
  const deviceToken = await messaging().getToken();

  thunk.dispatch(patchProfileThunk({ deviceToken }));
});

export const getUserNutrientsThunk = createAsyncThunk('getUserNutrientsThunk', async (_, thunk) => {
  const { profile } = thunk.getState() as { profile: ProfileState };

  return profileAPI.getUserNutrients(profile.userId);
});

export const editUserNutrientsThunk = createAsyncThunk(
  'editUserNutrientsThunk',
  async (nutrients: UserNutritionType, thunk) => {
    const { profile } = thunk.getState() as { profile: ProfileState };

    if (profile.userNutrients) {
      return await profileAPI.editUserNutrients({ ...nutrients, userId: profile.userId });
    } else {
      return await profileAPI.createUserNutrients(nutrients);
    }
  },
);

export const logoutThunk = createAsyncThunk('logoutThunk', async (_, thunk) => {
  queryClient.clear();

  baseApiClient.setAccessToken('');

  navigationService.reset(Routes.AUTH);

  auth().signOut();

  thunk.dispatch(clearDataThunk());
});

export const deleteProfileThunk = createAsyncThunk(
  'deleteProfileThunk',
  async (userId: string, thunk) => {
    try {
      await auth().currentUser?.delete();
      thunk.dispatch(clearDataThunk());
      await profileAPI.deleteProfile(userId);
      thunk.dispatch(logoutThunk());
    } catch (error) {
      console.warn('deleteProfileThunk', error);
      Toast.show({ type: 'error', message: i18next.t('authMessages.deleteError') });
      thunk.dispatch(logoutThunk());
    }
  },
);

export const clearDataThunk = createAsyncThunk('clearDataThunk', async (_, thunk) => {
  thunk.dispatch(clearCart());
  thunk.dispatch(clearAddresses());
});

export const getShopifyProductsThunk = createAsyncThunk('getShopifyProductsThunk', async () => {
  return await profileAPI.getShopifyProducts();
});

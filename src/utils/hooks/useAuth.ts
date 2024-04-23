import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

import { Routes } from '~/navigation/routes';
import { getSavesAddressesThunk } from '~/store/addresses/addressesThunks';
import { setPswResetting } from '~/store/profile/profileReducer';
import {
  clearOldDataThunk,
  configureProfileThunk,
  getShopifyProductsThunk,
  getUserNutrientsThunk,
  logoutThunk,
  sendDeviceToken,
} from '~/store/profile/profileThunks';
import { showDefaultError } from '../helpers/errorUtils';
import { useAppDispatch, useAppSelector } from './store';
import useNavigation from './useNavigation';
import { setGuideShown } from '~/store/onboardingStates/onboardingStatesReducer';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { reset, navigate } = useNavigation();
  const { isPswResetting, isError } = useAppSelector(state => state.profile);
  const { previewShown } = useAppSelector(state => state.onboardingStates);

  useEffect(() => {
    if (isError) {
      showDefaultError();
      dispatch(logoutThunk());
    }
  }, [isError]);

  const handleAuth = async () => {
    const user = auth().currentUser;
    await configureProfile();

    if (user?.phoneNumber) {
      reset(Routes.BOTTOM_TAB);
    } else {
      reset(Routes.AUTH, { screen: Routes.PHONE_SCREEN });
    }
  };

  const handleFirstAuth = async () => {
    if (showPreview()) return;

    let user = auth().currentUser;
    const userData = await configureProfile();

    if (isPswResetting) {
      dispatch(setPswResetting(false));
      await dispatch(logoutThunk());
      user = null;
    }

    if (!user || !userData) {
      dispatch(logoutThunk());
      return;
    }

    dispatch(setGuideShown(true));

    if (user.phoneNumber) {
      reset(Routes.BOTTOM_TAB);
    } else {
      reset(Routes.AUTH, { screen: Routes.PHONE_SCREEN });
    }
  };

  const showPreview = () => {
    if (previewShown) return false;

    navigate(Routes.PREVIEW_MODAL);

    return true;
  };

  const configureProfile = async () => {
    const user = auth().currentUser;

    if (!user) return;

    const data = await dispatch(configureProfileThunk(user));

    if (!data.payload) return;

    await dispatch(getUserNutrientsThunk());
    await dispatch(sendDeviceToken());
    await dispatch(getShopifyProductsThunk());
    await dispatch(clearOldDataThunk());
    await dispatch(getSavesAddressesThunk());

    return data.payload;
  };

  return { auth: handleAuth, firstAuth: handleFirstAuth };
}

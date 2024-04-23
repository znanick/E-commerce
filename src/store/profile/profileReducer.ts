import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  configureProfileThunk,
  editUserNutrientsThunk,
  getShopifyProductsThunk,
  getUserNutrientsThunk,
  logoutThunk,
  patchProfileThunk,
} from './profileThunks';
import { ProfileState, SecretsType } from './types';

const initialState: ProfileState = {
  userData: {},
  userId: '',
  token: '',
  shopifyData: null,
  userNutrients: null,

  isPswResetting: false,
  isAuth: false,
  isLoading: false,
  isError: false,
};

export const profileStoreSlice = createSlice({
  name: 'profileReducer',
  initialState,
  reducers: {
    setSecrets: (state, action: PayloadAction<SecretsType>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    setPswResetting: (state, action: PayloadAction<boolean>) => {
      state.isPswResetting = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(configureProfileThunk.pending, state => {
      return { ...state, isLoading: true, isError: false };
    });
    builder.addCase(configureProfileThunk.rejected, state => {
      return { ...state, isLoading: false, isError: true };
    });
    builder.addCase(configureProfileThunk.fulfilled, (state, action) => {
      return { ...state, userData: action.payload, isLoading: false, isAuth: true, isError: false };
    });

    builder.addCase(getShopifyProductsThunk.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getShopifyProductsThunk.fulfilled, (state, action) => {
      return { ...state, isLoading: false, shopifyData: action.payload };
    });

    builder.addCase(patchProfileThunk.fulfilled, (state, action) => {
      return { ...state, userData: action.payload };
    });

    builder.addCase(getUserNutrientsThunk.fulfilled, (state, action) => {
      return { ...state, userNutrients: action.payload };
    });
    builder.addCase(editUserNutrientsThunk.fulfilled, (state, action) => {
      return { ...state, userNutrients: action.payload };
    });

    builder.addCase(logoutThunk.pending, () => {
      return { ...initialState };
    });
  },
});

export const { setSecrets, setPswResetting } = profileStoreSlice.actions;
export const profileReducer = profileStoreSlice.reducer;

import {configureStore} from '@reduxjs/toolkit';

import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist';

import {mmkvStorage} from '~/utils/services/mmkvStorage/mmkvStorage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: mmkvStorage.reduxAdapter,
};

const persistedReducer = persistReducer(
  {
    ...persistConfig,
    whitelist: ['profile'],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

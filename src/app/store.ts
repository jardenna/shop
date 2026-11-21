import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import cartSlice from '../features/cartSlice';
import currencyReducer from '../features/currency/currencySlice';
import languageReducer from '../features/language/languageSlice';
import miniCardReducer from '../features/miniCardPopupSlice';
import modalReducer from '../features/modalSlice';
import toastReducer from '../features/toastSlice';
import apiSlice from './api/apiSlice';
import { currencyApiSlice } from './api/currencyApiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [currencyApiSlice.reducerPath]: currencyApiSlice.reducer,
    currency: currencyReducer,
    auth: authSliceReducer,
    toast: toastReducer,
    language: languageReducer,
    miniCard: miniCardReducer,
    modal: modalReducer,
    cartList: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      currencyApiSlice.middleware,
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

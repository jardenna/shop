import type { Middleware } from '@reduxjs/toolkit';
import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import cartSlice from '../features/cartSlice';
import currencyReducer from '../features/currency/currencySlice';
import languageReducer from '../features/language/languageSlice';
import miniCartReducer from '../features/miniCartPopupSlice';
import modalReducer from '../features/modalSlice';
import toastReducer, { addToast } from '../features/toastSlice';
import apiSlice from './api/apiSlice';
import { currencyApiSlice } from './api/currencyApiSlice';

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as
        | {
            data?: {
              message?: string;
            };
            status?: number;
          }
        | undefined;

      const errorStatus = payload?.status;

      if (
        typeof errorStatus === 'number' &&
        errorStatus < 500 &&
        errorStatus !== 404
      ) {
        const errorMessage =
          typeof payload?.data?.message === 'string'
            ? payload.data.message
            : 'An error occurred';

        dispatch(
          addToast({
            type: 'error',
            message: errorMessage,
          }),
        );
      }
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [currencyApiSlice.reducerPath]: currencyApiSlice.reducer,
    currency: currencyReducer,
    auth: authSliceReducer,
    toast: toastReducer,
    language: languageReducer,
    miniCart: miniCartReducer,
    modal: modalReducer,
    cartList: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      rtkQueryErrorLogger,
      currencyApiSlice.middleware,
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

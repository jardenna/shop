import type { Middleware } from '@reduxjs/toolkit';
import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import cartSlice from '../features/cartSlice';
import currencyReducer from '../features/currency/currencySlice';
import languageReducer from '../features/language/languageSlice';
import messagePopupReducer, {
  addMessagePopup,
} from '../features/messagePopupSlice';
import miniCartReducer from '../features/miniCartPopupSlice';
import modalSlice from '../features/modalSlice';
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

      if (typeof errorStatus === 'number' && errorStatus < 500) {
        const errorMessage =
          typeof payload?.data?.message === 'string'
            ? payload.data.message
            : 'An error occurred';

        dispatch(
          addMessagePopup({
            messagePopupType: 'error',
            message: errorMessage,
            componentType: 'notification',
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
    messagePopup: messagePopupReducer,
    language: languageReducer,
    modal: modalSlice,
    miniCartIsOpen: miniCartReducer,
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

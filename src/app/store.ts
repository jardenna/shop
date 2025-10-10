import type { Middleware } from '@reduxjs/toolkit';
import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import currencyReducer from '../features/currency/currencySlice';
import languageReducer from '../features/language/languageSlice';
import messagePopupReducer, {
  addMessagePopup,
} from '../features/messagePopupSlice';
import modalSlice from '../features/modalSlice';
import paginationSlice from '../features/paginationSlice';
import apiSlice from './api/apiSlice';
import currencyApiSlice from './api/currencyApiSlice';

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      if (
        action.payload &&
        typeof action.payload === 'object' &&
        'error' in action.payload
      ) {
        const errorMessage = (action.payload as { error: string }).error;

        dispatch(
          addMessagePopup({
            messagePopupType: 'error',
            message: `Error: ${errorMessage}`,
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
    pagination: paginationSlice,
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

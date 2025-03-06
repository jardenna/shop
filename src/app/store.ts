import type { Middleware } from '@reduxjs/toolkit';
import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import languageReducer from '../features/language/languageSlice';
import messagePopupReducer, {
  addMessagePopup,
} from '../features/messagePopupSlice';
import modalReducer from '../features/modalSlice';
import { TagTypesEnum } from '../types/types';
import apiSlice from './api/apiSlice';

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
          } as const),
        );
        setTimeout(() => {
          dispatch(apiSlice.util.invalidateTags([TagTypesEnum.Users]));
        }, 5000); // Invalidate the cache for the 'Records' endpoint after 5 seconds
      }
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    messagePopup: messagePopupReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

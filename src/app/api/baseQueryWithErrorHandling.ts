/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { selectLanguage } from '../../features/language/languageSlice';
import { addToast } from '../../features/toastSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const lang = localStorage.getItem('lang') || 'da'; // Get language from storage
    headers.set('x-language', lang);
    return headers;
  },
});
export interface ApiExtraOptions {
  skipErrorToast?: boolean;
}

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ApiExtraOptions
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const shouldSkipErrorToast = extraOptions?.skipErrorToast ?? false;
  console.log(extraOptions);

  if (result.error?.status === 'PARSING_ERROR') {
    const state = api.getState() as any;
    const language = selectLanguage(state);

    const fetchError: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      error: language.serverError,
    };

    return {
      error: fetchError,
    };
  }

  if (
    result.error &&
    typeof result.error.status === 'number' &&
    result.error.status < 500 &&
    !shouldSkipErrorToast
  ) {
    const errorData =
      typeof result.error.data === 'object' && result.error.data !== null
        ? result.error.data
        : {};

    api.dispatch(
      addToast({
        type: 'error',
        message:
          'message' in errorData && typeof errorData.message === 'string'
            ? errorData.message
            : 'An error occurred',
      }),
    );
  }

  return result;
};

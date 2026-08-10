import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { selectLanguage } from '../../features/language/languageSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const lang = localStorage.getItem('lang') || 'da'; // Get language from storage
    headers.set('x-language', lang);
    return headers;
  },
});

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

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

  return result;
};

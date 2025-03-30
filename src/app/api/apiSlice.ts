import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export enum TagTypesEnum {
  Auth = 'Auth',
  Users = 'Users',
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const lang = localStorage.getItem('lang') || 'da'; // Get language from storage
    headers.set('x-language', lang);
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [TagTypesEnum.Users, TagTypesEnum.Auth],
  endpoints: () => ({}),
});

export default apiSlice;

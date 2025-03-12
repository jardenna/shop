import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.currencyapi.com/v3',
  credentials: 'include',
});

const currencyApiSlice = createApi({
  reducerPath: 'currencyApi',
  baseQuery,
  endpoints: () => ({}),
});

export default currencyApiSlice;

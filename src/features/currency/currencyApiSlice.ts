import apiSlice from '../../app/api/apiSlice';

export const currencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query<any, void>({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const { useGetCurrencyQuery } = currencyApiSlice;

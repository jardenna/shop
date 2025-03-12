import apiSlice from '../../app/api/apiSlice';
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

const currencyUrl = `https://api.currencyapi.com/v3/latest?apikey=cur_live${API_KEY}`;

export const currencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRates: builder.query<number, void>({
      query: () => currencyUrl,
    }),
  }),
});

export const { useGetExchangeRatesQuery } = currencyApiSlice;

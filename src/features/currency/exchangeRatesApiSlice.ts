import currencyApiSlice from '../../app/api/currencyApiSlice';
import { currencies } from './currencyConverterUtil';

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const currencyCode = 'DKK';

const currencyUrl = `/latest?apikey=${API_KEY}&currencies=${currencies}&base_currency=${currencyCode}`;

export const exchangeRatesApiSlice = currencyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRates: builder.query<any, void>({
      query: () => currencyUrl,
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRatesApiSlice;

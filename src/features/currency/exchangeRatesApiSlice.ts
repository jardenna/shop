import { CurrencyResponse } from '../../app/api/apiTypes/sharedTypes';
import currencyApiSlice from '../../app/api/currencyApiSlice';
import { currencies, CurrencyCode } from './currencyConverterUtil';

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const currencyCode: CurrencyCode = 'DKK';

const currencyUrl = `/latest?apikey=${API_KEY}&currencies=${currencies}&base_currency=${currencyCode}`;

export const exchangeRatesApiSlice = currencyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRates: builder.query<CurrencyResponse, void>({
      query: () => currencyUrl,
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRatesApiSlice;

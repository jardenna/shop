import currencyApiSlice from '../../app/api/currencyApiSlice';

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const currencyCode = 'DKK';

const currencyUrl = `/latest?apikey=${API_KEY}&currencies=EUR%2CUSD%2CDKK%2CSEK%2CGBP%2CNOK&base_currency=${currencyCode}`;

// EUR,USD,DKK,SEK,GBP,NOK

export const exchangeRatesApiSlice = currencyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeRates: builder.query<any, void>({
      query: () => currencyUrl,
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRatesApiSlice;

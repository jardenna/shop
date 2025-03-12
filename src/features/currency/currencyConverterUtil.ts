import { currencyCode } from './exchangeRatesApiSlice';
export type Locales = 'en-US' | 'en-GB' | 'de-DE' | 'da-DK' | 'sv-SE' | 'no-No';

export const currencyToLocaleMap: Record<string, Locales> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  DKK: 'da-DK',
  SEK: 'sv-SE',
  NOK: 'no-No',
};

export const currencies = Object.keys(currencyToLocaleMap).join(',');

export const convertPrice = (
  amountDKK: number,
  currency: string,
  rates: Record<string, number>,
) => (currency === currencyCode ? amountDKK : amountDKK * rates[currency]);

export const formatCurrency = (
  amount: number,
  currencyCode: string,
): string => {
  const locale = currencyToLocaleMap[currencyCode];

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

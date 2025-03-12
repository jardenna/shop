export type Locales = 'en-US' | 'en-GB' | 'de-DE' | 'da-DK' | 'sv-SE' | 'no-No';
export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'DKK' | 'SEK' | 'NOK';

export const currencyToLocaleMap: Record<string, Locales> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  DKK: 'da-DK',
  SEK: 'sv-SE',
  NOK: 'no-No',
};

export const currencies = Object.keys(currencyToLocaleMap).join(',');

export const getFormattedPrice = (
  amountDKK: number,
  currencyCode: string,
  rates: Record<string, number>,
) => {
  const locale = currencyToLocaleMap[currencyCode];
  const convertedAmount =
    currencyCode === 'DKK' ? amountDKK : amountDKK * rates[currencyCode];

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
};

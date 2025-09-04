import type Locales from '../../utils/locales';

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'DKK' | 'SEK' | 'NOK';
type CurrencyText = '$' | '£' | '€' | 'Kr.';

export const currencyToLocaleMap: Record<CurrencyCode, Locales> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  DKK: 'da-DK',
  SEK: 'sv-SE',
  NOK: 'no-No',
};

export const currencyToText: Record<CurrencyCode, CurrencyText> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  DKK: 'Kr.',
  SEK: 'Kr.',
  NOK: 'Kr.',
};

export const currencies = Object.keys(currencyToLocaleMap).join(',');

export const getFormattedPrice = (
  price: number,
  currencyCode: CurrencyCode,
  rates: Record<string, number>,
) => {
  const locale = currencyToLocaleMap[currencyCode];
  const convertedAmount =
    currencyCode === 'DKK' ? price : price * rates[currencyCode];

  // Always round up
  const roundedAmount = Math.ceil(convertedAmount);

  // Convert currency to locales
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedAmount);
};

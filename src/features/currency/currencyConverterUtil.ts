const currencyToLocaleMap: Record<string, string> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  DKK: 'da-DK',
  SEK: 'sv-SE',
  NOK: 'no-No',
};

export const formatCurrency = (
  amount: number,
  currencyCode: string,
): string => {
  const locale = currencyToLocaleMap[currencyCode] || 'da-DK'; // Fallback to 'da-DK'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const currencies = Object.keys(currencyToLocaleMap).join(',');

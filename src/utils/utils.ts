import { ValidationMessage } from '../types/enums';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';

const formatNumber = (value: number, lang: 'en' | 'da') =>
  new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'da-DK').format(value);

const discountCalculation = (price: number, discount: number) => {
  const discountPrice = (price * discount) / 100;
  return price - discountPrice;
};

const getErrorMessage = (error: unknown): string => {
  if (
    error &&
    typeof error === 'object' &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data
  ) {
    return (error.data as { message: string }).message;
  }

  return ValidationMessage.UnknownError;
};

export {
  currencyCacheKey,
  discountCalculation,
  formatNumber,
  getErrorMessage,
  oneDay,
};

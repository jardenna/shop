import { ValidationMessage } from '../types/enums';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';

const formatNumber = (value: number, lang: 'en' | 'da') =>
  new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'da-DK').format(value);

const discountCalculation = (price: number, discount: number) => {
  const discountPrice = (price * discount) / 100;
  return price - discountPrice;
};

const maxSizeInBytes = 1024 * 1024;
const maxFileSize = 1 * maxSizeInBytes;
const maxFiles = 5;

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

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

const getlowerCaseFirstLetter = (
  key: string,
  language: Record<string, string>,
) => language[key[0].toLowerCase() + key.slice(1)] || key;

// Generic function to get visible items and count of hidden items from any list
const sliceAndCountHidden = <T>(list: T[], visibleCount: number) => {
  const visibleItems = list.slice(0, visibleCount);
  const hiddenCount = Math.max(list.length - visibleCount, 0);

  return { visibleItems, hiddenCount };
};

export {
  allowedExtensions,
  currencyCacheKey,
  discountCalculation,
  formatNumber,
  getErrorMessage,
  getlowerCaseFirstLetter,
  maxFiles,
  maxFileSize,
  oneDay,
  sliceAndCountHidden,
};

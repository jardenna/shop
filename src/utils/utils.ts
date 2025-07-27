import { SubCategoriesWithParent } from '../app/api/apiTypes/adminApiTypes';
import { ValidationMessage } from '../types/enums';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';

const formatNumber = (value: number, lang: 'en' | 'da') =>
  new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'da-DK').format(value);

const discountCalculation = (price: number, discount: number) => {
  const discountPrice = (price * discount) / 100;
  return price - discountPrice;
};

const getSizeInfoText = (
  category: SubCategoriesWithParent | undefined,
): string => {
  if (!category) {
    return 'sizesDependOnSelectedCategory';
  }
  if (category.allowedSizes.length === 0) {
    return 'sizesNotRelevant';
  }
  return '';
};

const maxSizeInBytes = 1024 * 1024;
const maxFileSize = 1 * maxSizeInBytes;

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// const extension = preview?.name.split('.').pop()?.toLowerCase();
// const isExtensionValid = extension && allowedExtensions.includes(extension);
// const isSizeValid =
//   typeof preview?.size === 'number' && preview.size <= maxFileSize;

// console.log({ isExtensionValid, isSizeValid });

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

export {
  allowedExtensions,
  currencyCacheKey,
  discountCalculation,
  formatNumber,
  getErrorMessage,
  getlowerCaseFirstLetter,
  getSizeInfoText,
  maxFileSize,
  oneDay,
};

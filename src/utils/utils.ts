import type { ProductSizes } from '../app/api/apiTypes/sharedApiTypes';
import { ValidationMessage } from '../types/enums';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';

const sizeList: ProductSizes[] = ['S', 'M', 'L', 'XL', 'Onesize'];

const colorKeys = [
  'black',
  'grey',
  'brown',
  'white',
  'blue',
  'yellow',
  'orange',
  'red',
  'purple',
  'green',
  'gold',
  'silver',
  'pink',
];

const roleButtonList = [
  { value: 'Employee', label: 'employee' },
  { value: 'User', label: 'user' },
];

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

const getlowerCaseFirstLetter = (
  key: string,
  language: Record<string, string>,
) => language[key[0].toLowerCase() + key.slice(1)] || key;

export {
  colorKeys,
  currencyCacheKey,
  discountCalculation,
  formatNumber,
  getErrorMessage,
  getlowerCaseFirstLetter,
  oneDay,
  roleButtonList,
  sizeList,
};

import type { ProductSizes } from '../app/api/apiTypes/sharedApiTypes';
import { ValidationMessage } from '../types/enums';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';

const sizeList: ProductSizes[] = ['S', 'M', 'L', 'XL', 'Onesize'];

const colorMap: Record<string, string> = {
  black: '#1f2937',
  grey: '#9ca3af',
  brown: '#8b5e3c',
  white: '#f9fafb',
  blue: '#3860a1ff',
  yellow: '#facc15',
  orange: '#fb923c',
  red: '#ef4444',
  purple: '#a855f7',
  green: '#10b981',
  gold: '#fcd34d',
  silver: '#d1d5db',
  pink: '#ec4899',
};

const colorList = [
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

export type ColorOption = {
  color: string;
  label: string;
  value: string;
  border?: string;
};

const getColorOptions = (
  colors: string[],
  language: Record<string, string>,
  borderColor?: string,
): ColorOption[] =>
  colors
    .filter((color) => colorMap[color] && language[color])
    .map((color) => ({
      label: language[color],
      value: color,
      color: colorMap[color],
      ...(color === 'white' && borderColor && { border: borderColor }),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

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
  colorList,
  colorMap,
  currencyCacheKey,
  discountCalculation,
  formatNumber,
  getColorOptions,
  getErrorMessage,
  getlowerCaseFirstLetter,
  oneDay,
  roleButtonList,
  sizeList,
};

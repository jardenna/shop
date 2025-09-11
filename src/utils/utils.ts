import { ValidationMessage } from '../types/enums';
import type { AriaLabelData } from '../types/types';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';

const discountCalculation = (price: number, discount: number) => {
  const discountPrice = (price * discount) / 100;
  return price - discountPrice;
};

// File upload utils
const maxSizeInBytes = 1024 * 1024;
const maxFileSize = 1 * maxSizeInBytes;
const maxFiles = 5;

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// Error messages
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

// Translation
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

//  Generic function that generates an array of string numbers from 1 up to `count`.
const optionsList = (count: number) =>
  [...Array(count).keys()].map((i) => (i + 1).toString());

//  Generic function that returns an accessible label for a given `count`:
//   - If a custom label exists in `ariaLabels`, it uses that.
//   - Otherwise, it falls back to a default format using the `unit`.
function getAriaLabel(count: number, ariaLabelData: AriaLabelData): string {
  const { ariaLabels, unit } = ariaLabelData;

  // Ensure the value is a string before returning, fallback to default
  const label = ariaLabels[count - 1];
  return typeof label === 'string' ? label : `${count} ${unit}`;
}

// show filters count
type Filters = Record<string, string[]>;

const getFilterSummary = (filters: Filters) => {
  const filterSummary = Object.fromEntries(
    Object.entries(filters).map(([key, values]) => [key, values.length]),
  );

  const totalFilters = Object.values(filterSummary).reduce(
    (sum, count) => sum + count,
    0,
  );

  return { filterSummary, totalFilters };
};

export {
  allowedExtensions,
  currencyCacheKey,
  discountCalculation,
  getAriaLabel,
  getErrorMessage,
  getFilterSummary,
  getlowerCaseFirstLetter,
  maxFiles,
  maxFileSize,
  oneDay,
  optionsList,
  sliceAndCountHidden,
};

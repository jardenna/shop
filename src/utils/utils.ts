import { AdminPath, ShopPath } from '../layout/nav/enums';
import type {
  AriaLabelData,
  Filters,
  FiltersCountResult,
} from '../types/types';

const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
const currencyCacheKey = 'exchangeRates';
const pageParamKey = 'page';
const productsPerPageParamKey = 'productsPerPage';

const discountCalculation = (price: number, discount: number) => {
  const discountPrice = (price * discount) / 100;
  return price - discountPrice;
};

// File upload utils
const maxSizeInBytes = 1024 * 1024;
const maxFileSize = 1 * maxSizeInBytes;
const maxFiles = 5;

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// Translation
const getlowerCaseFirstLetter = (
  key: string,
  language: Record<string, string>,
) => language[key[0].toLowerCase() + key.slice(1)] || key;

export const getCategoryTranslation = (
  key: string | undefined,
  language: Record<string, string>,
) => {
  if (!key) {
    return '';
  } // or whatever default you want

  const normalized = key[0].toLowerCase() + key.slice(1);
  return language[normalized] ?? key;
};

// Generic function to get visible items and count of hidden items from a list
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

// Filters count
const getFilterSummary = (filters: Filters): FiltersCountResult => {
  const countsByKey = Object.fromEntries(
    Object.entries(filters).map(([key, values]) => [key, values.length]),
  ) as Record<string, number>;

  const totalCount = Object.values(countsByKey).reduce(
    (sum, count) => sum + count,
    0,
  );

  return { countsByKey, totalCount };
};

const getPathName = (pathname: string) => {
  // Normalize: remove empty segments
  const pathnameList = pathname.split('/').filter(Boolean);

  return pathnameList[pathnameList.length - 1] || '';
};

const titleToCamelCase = (title: string) =>
  title.replace(/[-_](\w)/g, (_, c: string) => c.toUpperCase());

const pathEquals = (path: string | undefined, enumVal: ShopPath | AdminPath) =>
  `/${path}` === `/${enumVal}`;

export const isAdminPath = (pathname: string) =>
  pathname.startsWith(`/${AdminPath.Admin}`);

// Creates an array of pagination button numbers
function calculateBtnsRange(
  currentPage: number,
  totalBtns: number,
  maxPaginationBtns: number,
) {
  // Determine which "button group" the current page belongs to
  const startBtn =
    Math.floor((currentPage - 1) / maxPaginationBtns) * maxPaginationBtns + 1;

  // Find the last button number in the current visible group
  const endBtn = Math.min(startBtn + maxPaginationBtns - 1, totalBtns);

  const range = Array.from(
    { length: endBtn - startBtn + 1 },
    (_, i) => startBtn + i,
  );

  return range;
}

export {
  allowedExtensions,
  calculateBtnsRange,
  currencyCacheKey,
  discountCalculation,
  getAriaLabel,
  getFilterSummary,
  getlowerCaseFirstLetter,
  getPathName,
  maxFiles,
  maxFileSize,
  oneDay,
  optionsList,
  pageParamKey,
  pathEquals,
  productsPerPageParamKey,
  sliceAndCountHidden,
  titleToCamelCase,
};

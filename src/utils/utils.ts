import { AdminPath } from '../layout/nav/navConstants';

import type { FiltersCountResult, Language } from '../shared/types';

export const oneDay = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
export const currencyCacheKey = 'exchangeRates';

export const discountCalculation = (price: number, discount?: number) => {
  const discountPrice = discount ? (price * discount) / 100 : 0;
  return price - discountPrice;
};

// File upload utils
const maxSizeInBytes = 1024 * 1024;
export const maxFileSize = 1 * maxSizeInBytes;
export const maxFiles = 5;

export const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// Translation
export const translateKey = (key: string | undefined, language: Language) => {
  if (!key) {
    return '';
  }
  const normalized = key[0].toLowerCase() + key.slice(1);
  return language[normalized] ?? key;
};

// Generic function to get visible items and count of hidden items from a list
export const sliceAndCountHidden = <T>(list: T[], visibleCount?: number) => {
  const finalCount = visibleCount ?? list.length;
  const visibleItems = list.slice(0, finalCount);
  const additionalOptionsCount = Math.max(list.length - finalCount, 0);

  return { visibleItems, additionalOptionsCount };
};

// Filters count
export const getFilterSummary = (filters: object): FiltersCountResult => {
  const countsByKey: Record<string, number> = {};
  let totalCount = 0;

  const entries = Object.entries(filters) as [string, unknown][];

  for (const [paramKey, paramValue] of entries) {
    let countValue = 0;

    if (Array.isArray(paramValue)) {
      countValue = paramValue.length;
    } else if (typeof paramValue === 'string' && paramValue.trim() !== '') {
      countValue = 1;
    }

    countsByKey[paramKey] = countValue;
    totalCount += countValue;
  }

  return { countsByKey, totalCount };
};

export const getPathName = (pathname: string) => {
  // Normalize: remove empty segments
  const pathnameList = pathname.split('/').filter(Boolean);

  return pathnameList[pathnameList.length - 1] || '';
};

export const toCamelCase = (value: string) =>
  value.replace(/[-_](\w)/g, (_, character: string) => character.toUpperCase());

export const isAdminPath = (pathname: string) =>
  pathname.startsWith(`/${AdminPath.Admin}`);

// Creates an array of pagination button numbers
export function calculateBtnsRange(
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

export const maxDiscount = 90;
export const minDiscount = 0;
export const minInStock = 5;
export const vat = 25;

import { oneSize } from '../config/constants.js';

// If creating a new sub category with special sizes be sure to add it here

export const getAllowedSizes = (name = '') => {
  if (name === 'shoes') {
    return [
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      oneSize,
    ];
  }

  if (name === 'clothing') {
    return ['S', 'M', 'L', 'XL'];
  }

  if (name.includes('accessories')) {
    return [oneSize]; // Accessories have no sizes
  }

  // Default
  return ['S', 'M', 'L', 'XL'];
};

export const normalizeAllowedSizes = (productSizes = [], allowedSizes = []) => {
  if (productSizes.includes(oneSize)) {
    return [oneSize];
  }

  return allowedSizes.filter((size) => size !== oneSize);
};

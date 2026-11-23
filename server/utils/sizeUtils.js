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
      'Onesize',
    ];
  }

  if (name === 'clothing') {
    return ['S', 'M', 'L', 'XL'];
  }

  if (name.includes('accessories')) {
    return ['Onesize']; // Accessories have no sizes
  }

  // Default
  return ['S', 'M', 'L', 'XL'];
};

export const normalizeAllowedSizes = (allowedSizes = []) => {
  if (allowedSizes.includes('Onesize') && allowedSizes.length > 1) {
    return allowedSizes.filter((size) => size !== 'Onesize');
  }

  return allowedSizes;
};

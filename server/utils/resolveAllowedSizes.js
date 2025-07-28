import {
  CLOTHING_SIZES,
  KIDS_SHOE_SIZES,
  MEN_SHOE_SIZES,
  SHOE_SIZES,
} from '../config/constants.js';

const resolveAllowedSizes = ({ subKey, mainKey }) => {
  // Special case for kids shoes
  if (mainKey === 'Kids' && subKey === 'shoes') {
    return KIDS_SHOE_SIZES;
  }

  if (mainKey === 'Men' && subKey === 'shoes') {
    // Special case for Mens shoes
    return MEN_SHOE_SIZES;
  }

  // Default shoes
  if (subKey === 'shoes') return SHOE_SIZES;

  // Accessories don't have sizes
  if (subKey.includes('accessories')) return [];

  // All others
  return CLOTHING_SIZES;
};

export default resolveAllowedSizes;

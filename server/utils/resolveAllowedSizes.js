import {
  CLOTHING_SIZES,
  KIDS_SHOE_SIZES,
  MEN_SHOE_SIZES,
  SHOE_SIZES,
} from '../config/constants.js';

// Returns the allowed sizes based on the main and sub category
const resolveAllowedSizes = ({ subKey, mainKey }) => {
  // Special case for kids shoes
  if (mainKey === 'Kids' && subKey === 'shoes') {
    return KIDS_SHOE_SIZES;
  }

  if (mainKey === 'Men' && subKey === 'shoes') {
    // Special case for Mens shoes
    return MEN_SHOE_SIZES;
  }

  // If it's a shoe subcategory but not for kids or men, use women’s shoe sizes
  if (subKey === 'shoes') return SHOE_SIZES;

  // Accessories are always "Onesize"
  if (subKey.includes('accessories')) return ['Onesize'];

  // Default to general sizes (used by most other categories)
  return CLOTHING_SIZES;
};

export default resolveAllowedSizes;

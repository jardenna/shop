import { CLOTHING_SIZES, SHOE_SIZES } from '../config/constants.js';

const resolveAllowedSizes = ({ subKey }) => {
  if (subKey === 'accessories') return [];
  if (subKey === 'shoes') return SHOE_SIZES;
  return CLOTHING_SIZES;
};
export default resolveAllowedSizes;

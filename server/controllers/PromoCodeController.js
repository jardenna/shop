import asyncHandler from '../middleware/asyncHandler.js';
import { validatePromoCode } from '../validators/validatePromoCode.js';

// @desc    Create Promo code
// @route   /api/admin/promo-codes
// @method  POST
// @access  Private for admin and employees
const createPromoCode = asyncHandler(async (req, res) => {
  const isPromoCodeValid = validatePromoCode(req.body);

  console.log(isPromoCodeValid);

  res.send(req.body);
});

export { createPromoCode };

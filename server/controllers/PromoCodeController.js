import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Create Promo code
// @route   /api/admin/promo-codes
// @method  POST
// @access  Private for admin and employees
const createPromoCode = asyncHandler(async (req, res) => {
  res.send(req.body);
});

export { createPromoCode };

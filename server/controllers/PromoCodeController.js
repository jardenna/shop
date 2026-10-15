import asyncHandler from '../middleware/asyncHandler.js';
import PromoCode from '../models/promoCodeModel.js';
import { validatePromoCode } from '../validators/validatePromoCode.js';

// @desc    Create Promo code
// @route   /api/admin/promo-codes
// @method  POST
// @access  Private for admin and employees
const createPromoCode = asyncHandler(async (req, res) => {
  const validation = validatePromoCode(req.body, req.lang);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.message,
    });
  }

  const existingPromoCode = await PromoCode.findOne({
    code: req.body.code.trim().toUpperCase(),
  });

  if (existingPromoCode) {
    return res.status(400).json({
      success: false,
      message: t('promoCodeAlreadyExists', req.lang),
    });
  }

  const promoCode = await PromoCode.create(req.body);

  res.status(201).json({
    success: true,
    promoCode,
  });
});

export { createPromoCode };

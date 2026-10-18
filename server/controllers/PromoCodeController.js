import asyncHandler from '../middleware/asyncHandler.js';
import PromoCode from '../models/promoCodeModel.js';
import { getPromoCodesWithStatus } from '../utils/promoCodeUtils.js';
import { t } from '../utils/translator.js';
import { validatePromoCode } from '../validators/validatePromoCode.js';

// @desc    Create Promo code
// @route   /api/admin/promo-codes
// @method  POST
// @access  Private for admin and employees
const createPromoCode = asyncHandler(async (req, res) => {
  const validation = validatePromoCode({
    promoCode: req.body,
    lang: req.lang,
    isUpdate: false,
  });

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

// @desc    Get Promo code
// @route   /api/admin/promo-codes
// @method  GET
// @access  Private for admin and employees
const getPromoCode = asyncHandler(async (req, res) => {
  const promoCodes = await PromoCode.find();
  const CodesWithStatus = getPromoCodesWithStatus(promoCodes);

  res.status(200).json(CodesWithStatus);
});

// @desc    Get Promo code by id
// @route   /api/admin/promo-codes/id
// @method  GET
// @access  Private for admin and employees
const getPromoCodeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const promoCode = await PromoCode.findById(id);

  if (!promoCode) {
    return res.status(404).json({
      success: false,
      message: t('resourceNotFound', req.lang),
    });
  }

  res.status(200).json(promoCode);
});

// @desc    Update Promo code
// @route   /api/admin/promo-codes/:id
// @method  PATCH
// @access  Private for admin and employees
const updatePromoCode = asyncHandler(async (req, res) => {
  const { code, label, percent, active, startsAt, expiresAt } = req.body;
  const promoCode = await PromoCode.findById(req.params.id);

  if (!promoCode) {
    return res.status(404).json({
      success: false,
      message: t('promoCodeNotFound', req.lang),
    });
  }

  const validation = validatePromoCode({
    promoCode: req.body,
    lang: req.lang,
    isUpdate: true,
  });

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.message,
    });
  }

  const existingPromoCode = await PromoCode.findOne({
    code: code.trim().toUpperCase(),
    _id: { $ne: promoCode._id },
  });

  if (existingPromoCode) {
    return res.status(400).json({
      success: false,
      message: t('promoCodeAlreadyExists', req.lang),
    });
  }

  promoCode.code = code;
  promoCode.label = label;
  promoCode.percent = percent;
  promoCode.active = active;
  promoCode.startsAt = startsAt;
  promoCode.expiresAt = expiresAt;

  const updatedPromoCode = await promoCode.save();

  res.status(200).json({
    success: true,
    message: t('promoCodeUpdated', req.lang),
    promoCode: updatedPromoCode,
  });
});

export { createPromoCode, getPromoCode, getPromoCodeById, updatePromoCode };

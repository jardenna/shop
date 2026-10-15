const validatePromoCode = (promoCode, lang) => {
  if (typeof promoCode.code !== 'string' || !promoCode.code.trim()) {
    return {
      success: false,
      message: 'Please provide a promo code',
    };
  }
  if (typeof promoCode.label !== 'string' || !promoCode.label.trim()) {
    return {
      success: false,
      message: 'Please provide a label',
    };
  }

  if (
    typeof promoCode.percent !== 'number' ||
    !Number.isFinite(promoCode.percent) ||
    promoCode.percent < 1 ||
    promoCode.percent > 99
  ) {
    return {
      success: false,
      message: 'Percent must be between 1 and 99%',
    };
  }
  if (typeof promoCode.active !== 'boolean') {
    return {
      success: false,
      message: 'Please provide an active state true or false',
    };
  }
  if (isNaN(Date.parse(promoCode.startsAt))) {
    return {
      success: false,
      message: 'Invalid start date format',
    };
  }
  if (isNaN(Date.parse(promoCode.expiresAt))) {
    return {
      success: false,
      message: 'Invalid end date format',
    };
  }
  if (new Date(promoCode.startsAt) >= new Date(promoCode.expiresAt)) {
    return {
      success: false,
      message: 'End date must be after start date',
    };
  }

  return { success: true };
};

export { validatePromoCode };

import { t } from '../utils/translator.js';

const validatePromoCode = ({ promoCode, lang, isUpdate }) => {
  if (typeof promoCode.code !== 'string' || !promoCode.code.trim()) {
    return {
      success: false,
      message: 'Please provide a promo code',
      message: t('promoCodeRequired', lang),
    };
  }
  if (typeof promoCode.label !== 'string' || !promoCode.label.trim()) {
    return {
      success: false,
      message: t('promoCodeLabelRequired', lang),
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
      message: t('promoCodePercentInvalid', lang),
    };
  }
  if (typeof promoCode.active !== 'boolean') {
    return {
      success: false,
      message: 'Please provide an active state true or false',
      message: t('promoCodeActiveInvalid', lang),
    };
  }
  if (isNaN(Date.parse(promoCode.startsAt))) {
    return {
      success: false,
      message: t('promoCodeStartDateInvalid', lang),
    };
  }
  if (isNaN(Date.parse(promoCode.expiresAt))) {
    return {
      success: false,
      message: t('promoCodeEndDateInvalid', lang),
    };
  }

  const currentDate = new Date();
  const startDate = new Date(promoCode.startsAt);
  if (new Date(promoCode.startsAt) >= new Date(promoCode.expiresAt)) {
    return {
      success: false,
      message: t('promoCodeDateRangeInvalid', lang),
    };
  }

  if (!isUpdate && startDate < new Date(currentDate.setHours(0, 0, 0, 0))) {
    return {
      success: false,
      message: t('startDateCannotBeInThePast', lang),
    };
  }

  return { success: true };
};

export { validatePromoCode };

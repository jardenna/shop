import { EMPLOYEE_DISCOUNT, ROLES } from '../config/constants.js';
import PromoCode from '../models/promoCodeModel.js';
import { t } from '../utils/translator.js';

export const getActiveDiscount = async ({ role, code, lang }) => {
  if (role === ROLES.EMPLOYEE) {
    return {
      percent: EMPLOYEE_DISCOUNT,
      label: t('employeeDiscount', lang),
      code: '',
    };
  }

  const trimmedCode = code?.trim().toUpperCase();

  if (!trimmedCode) {
    return {
      code: '',
      percent: 0,
      label: '',
    };
  }

  const promoCode = await PromoCode.findOne({
    code: trimmedCode,
    active: true,
    startsAt: { $lte: new Date() },
    expiresAt: { $gt: new Date() },
  }).lean();

  if (!promoCode) {
    return {
      code: '',
      percent: 0,
      label: '',
    };
  }

  return {
    code: promoCode.code,
    percent: promoCode.percent,
    label: promoCode.label,
  };
};

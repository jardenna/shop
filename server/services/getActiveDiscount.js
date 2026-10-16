import { EMPLOYEE_DISCOUNT } from '../config/constants.js';
import PromoCode from '../models/promoCodeModel.js';

export const getActiveDiscount = async (role, code) => {
  if (role === 'Employee') {
    return {
      percent: EMPLOYEE_DISCOUNT,
      label: 'employeeDiscount',
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

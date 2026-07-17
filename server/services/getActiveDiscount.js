import { EMPLOYEE_DISCOUNT, PROMO_CODES } from '../config/constants.js';

export const getActiveDiscount = (role, code) => {
  if (role === 'Employee') {
    return {
      percent: EMPLOYEE_DISCOUNT,
      label: 'employee',
      code: '',
    };
  }

  const trimmedCode = code?.trim().toUpperCase();
  const promoCode = PROMO_CODES.find(({ code }) => code === trimmedCode);

  if (promoCode && promoCode.active) {
    return {
      code: promoCode.code,
      percent: promoCode.percent,
      label: promoCode.label,
    };
  }

  return {
    code: '',
    percent: 0,
    label: '',
  };
};

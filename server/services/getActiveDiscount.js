import { EMPLOYEE_DISCOUNT, PROMO_CODES } from '../config/constants.js';

export const getActiveDiscount = (role, promoCodeQuery) => {
  if (role === 'Employee') {
    return { percent: EMPLOYEE_DISCOUNT, label: 'employee' };
  }

  const promoCode = PROMO_CODES.find(({ code }) => code === promoCodeQuery);

  if (promoCode) {
    return {
      percent: promoCode.percent,
      label: promoCode.label,
    };
  }

  return { percent: 0, label: '' };
};

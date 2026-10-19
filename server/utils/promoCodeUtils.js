import { isAfter, isBefore } from 'date-fns';

const currentDate = new Date();

export const getPromoCodesWithStatus = (promoCodes) =>
  promoCodes.map((promoCode) => {
    let status;

    if (!promoCode.active) {
      status = 'inactive';
    } else if (isAfter(currentDate, promoCode.expiresAt)) {
      status = 'expired';
    } else if (isBefore(currentDate, promoCode.startsAt)) {
      status = 'scheduled';
    } else {
      status = 'active';
    }

    return {
      ...promoCode.toObject(),
      status,
    };
  });

import { isAfter, isBefore } from 'date-fns';
import PromoCode from '../models/promoCodeModel.js';

export const getPromoCodesWithStatus = (promoCodes) =>
  promoCodes.map((promoCode) => {
    const currentDate = new Date();
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

export const hasOverlappingActivePromoCode = async ({
  startsAt,
  expiresAt,
  excludeId,
}) => {
  const query = {
    active: true,
    startsAt: { $lt: new Date(expiresAt) },
    expiresAt: { $gt: new Date(startsAt) },
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return PromoCode.exists(query);
};

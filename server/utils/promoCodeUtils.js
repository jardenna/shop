import { isBefore } from 'date-fns';
import { EXPIRED, INACTIVE, SCHEDULED } from '../config/constants.js';
import PromoCode from '../models/promoCodeModel.js';

export const getPromoCodesWithStatus = (promoCodes) =>
  promoCodes.map((promoCode) => {
    const currentDate = new Date();
    let status;

    if (!promoCode.active) {
      status = INACTIVE;
    } else if (!isBefore(currentDate, promoCode.expiresAt)) {
      status = EXPIRED;
    } else if (isBefore(currentDate, promoCode.startsAt)) {
      status = SCHEDULED;
    } else {
      status = 'current';
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

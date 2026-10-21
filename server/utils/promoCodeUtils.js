import { isBefore } from 'date-fns';
import { PROMO_CODE_STATUS } from '../config/constants.js';
import PromoCode from '../models/promoCodeModel.js';

export const getPromoCodesWithStatus = (promoCodes) =>
  promoCodes.map((promoCode) => {
    const currentDate = new Date();
    let status;

    if (!promoCode.active) {
      status = PROMO_CODE_STATUS.INACTIVE;
    } else if (!isBefore(currentDate, promoCode.expiresAt)) {
      status = PROMO_CODE_STATUS.EXPIRED;
    } else if (isBefore(currentDate, promoCode.startsAt)) {
      status = PROMO_CODE_STATUS.SCHEDULED;
    } else {
      status = PROMO_CODE_STATUS.CURRENT;
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

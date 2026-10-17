import { PromoCode } from '../../app/api/apiTypes/promoCodeApiTypes';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

export function validatePromoCode(values: PromoCode) {
  const errors: ValidationErrors<PromoCode> = {};
  const { code, label, percent, startsAt, expiresAt } = values;

  if (!code.trim()) {
    errors.code = ValidationMessage.PleaseEnterDiscountCode;
  }

  if (!label.trim()) {
    errors.label = ValidationMessage.PleaseEnterDescription;
  }

  if (!percent || percent < 1 || percent > 99) {
    errors.percent = ValidationMessage.InvalidDiscountPercentage;
  }

  if (!startsAt) {
    errors.startsAt = ValidationMessage.PleaseEnterStartDate;
  } else if (new Date(startsAt) < new Date()) {
    errors.startsAt = ValidationMessage.StartDateCannotBeInThePast;
  }

  if (!expiresAt) {
    errors.expiresAt = ValidationMessage.PleaseEnterEndDate;
  } else if (startsAt && new Date(expiresAt) < new Date(startsAt)) {
    errors.expiresAt = ValidationMessage.EndDateCannotBeBeforeStartDate;
  }

  return errors;
}

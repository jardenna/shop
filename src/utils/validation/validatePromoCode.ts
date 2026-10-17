import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

export interface PromoCodeFormValues {
  code: string;
  expiresAt: string;
  label: string;
  percent: number | null;
  startsAt: string;
}

export function validatePromoCode(values: PromoCodeFormValues) {
  const errors: ValidationErrors<PromoCodeFormValues> = {};
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

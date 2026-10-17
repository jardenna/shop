import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

interface PromoParams {
  promoCode: string;
}
export function validatePromoCode(values: PromoParams) {
  const errors: ValidationErrors<PromoParams> = {};
  const { promoCode } = values;

  if (promoCode === '') {
    errors.promoCode = ValidationMessage.PleaseEnterDiscountCode;
  }

  return errors;
}

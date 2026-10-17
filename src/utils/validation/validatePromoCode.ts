import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

interface PrompParams {
  promoCode: string;
}
export function validatePromoCode(values: PrompParams) {
  const errors: ValidationErrors<PrompParams> = {};
  const { promoCode } = values;

  if (promoCode === '') {
    errors.promoCode = ValidationMessage.PleaseEnterDiscountCode;
  }

  return errors;
}

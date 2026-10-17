import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

interface CartPromoCodeValues {
  promoCode: string;
}

export function validateCartPromoCode(values: CartPromoCodeValues) {
  const errors: ValidationErrors<CartPromoCodeValues> = {};
  const { promoCode } = values;

  if (promoCode === '') {
    errors.promoCode = ValidationMessage.PleaseEnterDiscountCode;
  }

  return errors;
}

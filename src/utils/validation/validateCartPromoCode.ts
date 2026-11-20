import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../shared/constants';

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

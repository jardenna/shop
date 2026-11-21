import type { InitialShopValues } from '../../features/shop/components/ProductPurchaseOptions';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../shared/constants';

export function validateShopProduct(values: InitialShopValues) {
  const errors: ValidationErrors<InitialShopValues> = {};
  const { color, size } = values;

  if (color === '') {
    errors.color = ValidationMessage.ColorRequired;
  }

  if (size === '') {
    errors.size = ValidationMessage.SizeRequired;
  }

  return errors;
}

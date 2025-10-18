import { InitialShopValues } from '../../features/shop/components/SingleProductForm';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

function validateShopProduct(values: InitialShopValues) {
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

export default validateShopProduct;

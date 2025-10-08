import { InitialShopValues } from '../../features/shop/components/ShopProductForm';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

function validateShopProduct(values: InitialShopValues) {
  const errors: ValidationErrors = {};
  const { color, size } = values;

  if (color === '') {
    errors.colors = ValidationMessage.ColorRequired;
  }

  if (size === '') {
    errors.sizes = ValidationMessage.SizeRequired;
  }

  return errors;
}

export default validateShopProduct;

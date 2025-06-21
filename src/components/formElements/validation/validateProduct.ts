import { ProductRequest } from '../../../app/api/apiTypes/adminApiTypes';
import { ValidationErrors } from '../../../hooks/useFormValidation';
import { ValidationMessage } from '../../../types/enums';

function validateProduct(values: ProductRequest) {
  const errors: ValidationErrors = {};
  const {
    brand,
    colors,
    description,
    material,
    price,
    subCategory,
    productName,
    sizes,
  } = values;

  if (!productName) {
    errors.productName = ValidationMessage.ProductNameRequired;
  }

  if (!brand) {
    errors.brand = ValidationMessage.BrandRequired;
  }

  if (!description) {
    errors.description = ValidationMessage.ProductDescriptionRequired;
  }
  if (!material) {
    errors.material = ValidationMessage.MaterialRequired;
  }

  if (!price) {
    errors.price = ValidationMessage.PriceRequired;
  }

  if (subCategory === '') {
    errors.subCategory = ValidationMessage.CategoryRequired;
  }

  if (colors.length === 0) {
    errors.colors = ValidationMessage.ColorRequired;
  }

  if (sizes.length === 0) {
    errors.sizes = ValidationMessage.SizeRequired;
  }

  return errors;
}

export default validateProduct;

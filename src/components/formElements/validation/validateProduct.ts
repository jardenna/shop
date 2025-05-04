import { ProductRequest } from '../../../app/api/apiTypes';
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
  } = values;
  console.log(subCategory === '');

  if (!productName) {
    errors.productName = ValidationMessage.PleaseEnterCategoryName;
  }
  if (!brand) {
    errors.brand = ValidationMessage.PleaseEnterCategoryName;
  }

  if (!description) {
    errors.description = ValidationMessage.PleaseEnterCategoryName;
  }
  if (!material) {
    errors.material = ValidationMessage.PleaseEnterCategoryName;
  }
  if (!price) {
    errors.price = ValidationMessage.PleaseEnterCategoryName;
  }

  if (!material) {
    errors.material = ValidationMessage.PleaseEnterCategoryName;
  }
  if (subCategory === '') {
    errors.subCategory = ValidationMessage.PleaseEnterCategoryName;
  }

  if (colors.length === 0) {
    errors.colors = ValidationMessage.PleaseSelectParentCategory;
  }

  return errors;
}

export default validateProduct;

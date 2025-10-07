import type { ValidationErrors } from '../../hooks/useFormValidation';
import type { CategoryState } from '../../pages/category/CreateCategoryPage';
import { ValidationMessage } from '../../types/enums';

function validateCategory(values: CategoryState) {
  const errors: ValidationErrors = {};
  const { categoryName } = values;

  if (!categoryName) {
    errors.categoryName = ValidationMessage.PleaseEnterCategoryName;
  }

  return errors;
}

export default validateCategory;

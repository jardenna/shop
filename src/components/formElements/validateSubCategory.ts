import { CreateSubCategoryRequest } from '../../app/api/apiTypes';
import { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';

function validateSubCategory(values: CreateSubCategoryRequest) {
  const errors: ValidationErrors = {};
  const { subCategoryName } = values;

  // Email Errors
  if (!subCategoryName) {
    errors.categoryName = ValidationMessage.PleaseEnterCategoryName;
  }

  return errors;
}

export default validateSubCategory;

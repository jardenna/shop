import { ValidationErrors } from '../../../hooks/useFormValidation';
import { SubCategoryState } from '../../../pages/subCategory/CreateSubCategoryPage';
import { ValidationMessage } from '../../../types/enums';

function validateSubcategory(values: SubCategoryState) {
  const errors: ValidationErrors = {};
  const { category, subCategoryName } = values;

  if (!subCategoryName) {
    errors.subCategoryName = ValidationMessage.PleaseEnterCategoryName;
  }

  if (!category) {
    errors.category = ValidationMessage.PleaseEnterCategoryName;
  }

  return errors;
}

export default validateSubcategory;

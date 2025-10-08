import type { ValidationErrors } from '../../hooks/useFormValidation';
import type { SubCategoryState } from '../../pages/subCategory/CreateSubCategoryPage';
import { ValidationMessage } from '../../types/enums';

function validateSubcategory(values: SubCategoryState) {
  const errors: ValidationErrors<SubCategoryState> = {};
  const { category, subCategoryName, translationKey } = values;

  if (!subCategoryName) {
    errors.subCategoryName = ValidationMessage.PleaseEnterCategoryName;
  }

  if (!translationKey) {
    errors.translationKey = ValidationMessage.PleaseEnterTranslationKey;
  }

  if (!category) {
    errors.category = ValidationMessage.PleaseSelectParentCategory;
  }

  return errors;
}

export default validateSubcategory;

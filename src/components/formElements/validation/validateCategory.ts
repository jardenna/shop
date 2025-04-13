import { ValidationErrors } from '../../../hooks/useFormValidation';
import { CategoryState } from '../../../pages/category/CreateCategoryPage';
import { ValidationMessage } from '../../../types/enums';

// type OmittedRLoginType = Omit<CategoryState, 'username' | 'confirmPassword'>;

function validationCategories(values: CategoryState) {
  const errors: ValidationErrors = {};
  const { categoryName } = values;

  if (!categoryName) {
    errors.categoryName = ValidationMessage.PleaseEnterCategoryName;
  }

  return errors;
}

export default validationCategories;

import { Category } from '../../../app/api/apiTypes';
import { ValidationMessage } from '../../../types/enums';

function validateUpdateCategory(values: Partial<Category>) {
  const { categoryName } = values;
  let error;

  // Name Errors
  if (categoryName === '') {
    error = ValidationMessage.PleaseEnterName;
  }

  return error;
}

export default validateUpdateCategory;

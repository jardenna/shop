import type { InitialStateValues } from '../../components/selectbox/SelectField';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../shared/constants';

export function validateProductNew(values: InitialStateValues) {
  const errors: ValidationErrors<InitialStateValues> = {};
  const { subCategory } = values;

  if (!subCategory || subCategory.value === '') {
    errors.subCategory = ValidationMessage.CategoryRequired;
  }

  return errors;
}

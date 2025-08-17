import type { ValidationErrors } from '../../../hooks/useFormValidation';
import { InitialNotifyValues } from '../../../pages/SingleProductPage';
import { ValidationMessage } from '../../../types/enums';
import validateEmail from './CommonFieldValidation';

function validateNotityMe(values: InitialNotifyValues) {
  const errors: ValidationErrors = {};
  const { email, sizes } = values;

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (sizes.length === 0) {
    errors.sizes = ValidationMessage.SizeRequired;
  }

  return errors;
}

export default validateNotityMe;

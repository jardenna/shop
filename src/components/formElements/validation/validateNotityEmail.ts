import type { ValidationErrors } from '../../../hooks/useFormValidation';
import { InitialNotifyValues } from '../../../pages/SingleProductPage';
import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';

function validateNEmail(values: InitialNotifyValues) {
  const errors: ValidationErrors = {};
  const { email } = values;

  // Email Errors
  if (!email) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  } else if (typeof email === 'string' && !emailRegex.test(email)) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  }

  return errors;
}

export default validateNEmail;

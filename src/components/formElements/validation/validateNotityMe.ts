import type { ValidationErrors } from '../../../hooks/useFormValidation';
import { InitialNotifyValues } from '../../../pages/SingleProductPage';
import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';

function validateNotityMe(values: InitialNotifyValues) {
  const errors: ValidationErrors = {};
  const { email, sizes } = values;

  // Email Errors
  if (!email) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  } else if (typeof email === 'string' && !emailRegex.test(email)) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  }

  if (sizes.length === 0) {
    errors.sizes = ValidationMessage.SizeRequired;
  }

  return errors;
}

export default validateNotityMe;

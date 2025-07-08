import type { ValidationErrors } from '../../../hooks/useFormValidation';
import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';
import type { AuthFormValues } from './validateCreateAccount';

type OmittedRLoginType = Omit<AuthFormValues, 'username' | 'confirmPassword'>;

function validateLogin(values: OmittedRLoginType) {
  const errors: ValidationErrors = {};
  const { email, password } = values;

  // Email Errors
  if (!email) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  } else if (typeof email === 'string' && !emailRegex.test(email)) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  }

  // Password Errors
  if (!password) {
    errors.password = ValidationMessage.PleaseEnterPassword;
  }

  return errors;
}

export default validateLogin;

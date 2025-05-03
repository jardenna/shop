import { ValidationErrors } from '../../../hooks/useFormValidation';
import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';
import { AuthFormValues } from './validateSignup';

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

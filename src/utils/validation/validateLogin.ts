import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import validateEmail from './CommonFieldValidation';
import type { AuthFormValues } from './validateCreateAccount';

type OmittedRLoginType = Omit<AuthFormValues, 'username' | 'confirmPassword'>;

function validateLogin(values: OmittedRLoginType) {
  const errors: ValidationErrors = {};
  const { email, password } = values;

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  // Password Errors
  if (!password) {
    errors.password = ValidationMessage.PleaseEnterPassword;
  }

  return errors;
}

export default validateLogin;

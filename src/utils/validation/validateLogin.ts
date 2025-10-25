import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import type { OmitChecked } from '../../types/types';
import validateEmail from './CommonFieldValidation';
import type { AuthFormValues } from './validateCreateAccount';

type OmittedRLoginType = OmitChecked<
  AuthFormValues,
  'username' | 'confirmPassword'
>;

function validateLogin(values: OmittedRLoginType) {
  const errors: ValidationErrors<OmittedRLoginType> = {};
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

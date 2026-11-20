import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../shared/constants';
import type { OmitChecked } from '../../shared/types';
import { validateEmail } from './CommonFieldValidation';
import type { AuthFormValues } from './validateCreateAccount';

type OmittedLoginType = OmitChecked<
  AuthFormValues,
  'username' | 'confirmPassword'
>;

export function validateLogin(values: OmittedLoginType) {
  const errors: ValidationErrors<OmittedLoginType> = {};
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

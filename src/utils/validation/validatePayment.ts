import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import type { OmitChecked } from '../../types/types';
import { validateEmail } from './CommonFieldValidation';
import type { AuthFormValues } from './validateCreateAccount';

type validatePayment = OmitChecked<
  AuthFormValues,
  'username' | 'confirmPassword'
>;

export function validatePayment(values: validatePayment) {
  const errors: ValidationErrors<validatePayment> = {};
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

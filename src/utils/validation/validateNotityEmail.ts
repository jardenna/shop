import type { InitialNotifyValues } from '../../features/shop/components/NotifyMe';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { validateEmail } from './CommonFieldValidation';

export function validateNEmail(values: InitialNotifyValues) {
  const errors: ValidationErrors<InitialNotifyValues> = {};
  const { email } = values;

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  return errors;
}

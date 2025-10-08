import type { InitialNotifyValues } from '../../features/shop/components/NotifyMe';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import validateEmail from './CommonFieldValidation';

function validateNEmail(values: InitialNotifyValues) {
  const errors: ValidationErrors = {};
  const { email } = values;

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }
  // if (!email) {
  //   errors.email = ValidationMessage.PleaseEnterValidEmail;
  // } else if (typeof email === 'string' && !emailRegex.test(email)) {
  //   errors.email = ValidationMessage.PleaseEnterValidEmail;
  // }

  return errors;
}

export default validateNEmail;

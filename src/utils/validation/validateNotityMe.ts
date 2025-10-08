import type { InitialNotifyValues } from '../../features/shop/components/NotifyMe';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import validateEmail from './CommonFieldValidation';

function validateNotityMe(values: InitialNotifyValues) {
  const errors: ValidationErrors<InitialNotifyValues> = {};
  const { email, sizes } = values;

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (sizes.length === 0) {
    errors.sizes = ValidationMessage.SizeRequired;
  }

  return errors;
}

export default validateNotityMe;

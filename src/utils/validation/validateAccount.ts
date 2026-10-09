import { BaseProfile } from '../../app/api/apiTypes/shopApiTypes';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import { phoneNumberRegex } from '../regex';
import { validateEmail } from './CommonFieldValidation';

export function validateAccount(values: BaseProfile) {
  const errors: ValidationErrors<BaseProfile> = {};
  const { username, email, phoneNo } = values;

  if (!username) {
    errors.username = ValidationMessage.PleaseEnterName;
  }

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  // Phone Errors
  if (phoneNo && !phoneNumberRegex.test(phoneNo)) {
    errors.phoneNo = ValidationMessage.PleaseEnterValidPhone;
  }

  return errors;
}

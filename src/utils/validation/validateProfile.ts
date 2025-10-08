import { BaseProfile } from '../../app/api/apiTypes/shopApiTypes';
import type { ValidationErrors } from '../../hooks/useFormValidation';
import { ValidationMessage } from '../../types/enums';
import validateEmail from './CommonFieldValidation';

function validateProfile(values: BaseProfile) {
  const errors: ValidationErrors = {};
  const { username, email } = values;

  if (!username) {
    errors.username = ValidationMessage.PleaseEnterName;
  }

  // Email Errors
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  return errors;
}

export default validateProfile;

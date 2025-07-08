import type { ValidationErrors } from '../../../hooks/useFormValidation';
import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';

export type AuthFormValues = {
  confirmPassword: string;
  email: string;
  password: string;
  username: string;
};

function validateCreateAccount(values: AuthFormValues) {
  const errors: ValidationErrors = {};
  const { username, email, password, confirmPassword } = values;

  // Name Errors
  if (!username) {
    errors.username = ValidationMessage.PleaseEnterName;
  }

  // Email Errors
  if (!email) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  } else if (!emailRegex.test(email)) {
    errors.email = ValidationMessage.PleaseEnterValidEmail;
  }
  // Password Errors
  if (!password) {
    errors.password = ValidationMessage.PleaseEnterPassword;
  } else if (password.length < 8) {
    errors.password = ValidationMessage.PasswordMinLength;
  }

  // Confirm Password
  if (!confirmPassword) {
    errors.confirmPassword = ValidationMessage.PleaseEnterPassword;
  } else if (password !== confirmPassword) {
    errors.confirmPassword = ValidationMessage.PasswordDoNotMatch;
  }

  return errors;
}

export default validateCreateAccount;

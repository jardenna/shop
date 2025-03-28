import { UserResponse } from '../../../app/api/apiTypes';
import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';

function validateUpdateUser(values: Partial<UserResponse>) {
  const { username, email } = values;
  let error;

  // Name Errors
  if (username === '') {
    error = ValidationMessage.PleaseEnterName;
  }

  // Email Errors
  if (email === '') {
    error = ValidationMessage.PleaseEnterEmail;
  }

  if (email && !emailRegex.test(email)) {
    error = ValidationMessage.PleaseEnterValidEmail;
  }

  return error;
}

export default validateUpdateUser;

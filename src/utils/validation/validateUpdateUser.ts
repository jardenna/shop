import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { ValidationMessage } from '../../types/enums';
import { emailRegex } from '../regex';

export function validateUpdateUser(values: Partial<UserResponse>) {
  const { username, email } = values;
  let error;
  // Name Errors
  if (username === '') {
    error = ValidationMessage.nothingWasUpdated;
  }

  // Email Errors
  if (email === '') {
    error = ValidationMessage.nothingWasUpdated;
  }

  if (email && !emailRegex.test(email)) {
    error = ValidationMessage.nothingWasUpdated;
  }

  return error;
}

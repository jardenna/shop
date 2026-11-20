import type { UserResponse } from '../../app/api/apiTypes/userApiTypes';
import { ValidationMessage } from '../../types/constants';
import { emailRegex } from '../regex';

export function validateUpdateUser(values: Partial<UserResponse>) {
  const { username, email } = values;

  const isEmptyInput = username === '' || email === '';
  const isInvalidEmail = email ? !emailRegex.test(email) : false;

  if (isEmptyInput || isInvalidEmail) {
    return ValidationMessage.nothingWasUpdated;
  }
}

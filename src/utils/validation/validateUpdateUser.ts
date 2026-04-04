import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { ValidationMessage } from '../../types/enums';
import { emailRegex } from '../regex';

export function validateUpdateUser(values: Partial<UserResponse>) {
  const { username, email } = values;

  const isEmptyInput = username === '' || email === '';
  const isInvalidEmail = email ? !emailRegex.test(email) : false;

  if (isEmptyInput || isInvalidEmail) {
    return ValidationMessage.nothingWasUpdated;
  }
}

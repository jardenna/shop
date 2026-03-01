import { ValidationMessage } from '../../types/enums';
import { emailRegex } from '../regex';

export const validateEmail = (email: string) => {
  if (!email) {
    return ValidationMessage.PleaseEnterEmail;
  }

  if (!emailRegex.test(email)) {
    return ValidationMessage.PleaseEnterValidEmail;
  }

  return null;
};

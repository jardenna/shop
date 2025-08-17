import { ValidationMessage } from '../../../types/enums';
import { emailRegex } from '../../../utils/regex';

const validateEmail = (email: string) => {
  if (!email) {
    return ValidationMessage.PleaseEnterEmail;
  }

  if (!emailRegex.test(email)) {
    return ValidationMessage.PleaseEnterValidEmail;
  }

  return null;
};

export default validateEmail;

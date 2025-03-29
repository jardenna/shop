import { emailRegex } from './regex.js';
import { t } from './translator.js';

const validateEmail = (email, lang) => {
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      status: 422,
      payload: { success: false, message: t('pleaseEnterValidEmail', lang) },
    };
  }
  return { isValid: true };
};

export { validateEmail };

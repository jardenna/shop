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

const passwordPolicy = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const validatePassword = (password) => {
  if (password.length < passwordPolicy.minLength) {
    return 'passwordMinLength'; // Return translation key instead of message
  }
  if (!/[a-z]/.test(password)) {
    return 'passwordLowercase';
  }
  if (!/[A-Z]/.test(password)) {
    return 'passwordUppercase';
  }
  if (!/[0-9]/.test(password)) {
    return 'passwordNumber';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'passwordSymbol';
  }
  return null; // Valid password
};

export { passwordPolicy, validateEmail, validatePassword };

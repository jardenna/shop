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

export { passwordPolicy, validatePassword };

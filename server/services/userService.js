import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { t } from '../utils/translator.js';

import { validateEmail, validatePassword } from '../validators/validateAuth.js';

// @desc    Create a new user (Common for self-registration and admin creation)
// @route   /api/auth/register
// @method   POST
// @access  Public (register) / Admin (create-user)
export const createUserService = async ({
  username,
  email,
  password,
  role,
  language,
}) => {
  const emailResult = validateEmail(email, language);

  if (!emailResult.isValid) {
    const error = new Error(emailResult.payload.message);
    error.statusCode = emailResult.status;
    throw error;
  }

  const passwordErrorKey = validatePassword(password);

  if (passwordErrorKey) {
    const error = new Error(t(passwordErrorKey, language));
    error.statusCode = 400;
    throw error;
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    return await User.create({
      username,
      email,
      password: hashPassword,
      role,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error(t('userAlreadyExist', language));

      duplicateError.statusCode = 400;
      throw duplicateError;
    }

    throw error;
  }
};

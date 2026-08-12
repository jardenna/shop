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
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error(t('userAlreadyExist', language));
    error.statusCode = 400;
    throw error;
  }

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

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  return newUser;
};

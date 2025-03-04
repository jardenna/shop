import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { validatePassword } from '../utils/passwordValidator.js';
import { emailRegex } from '../utils/regex.js';
import { t } from '../utils/translator.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: t('fillAll', req.lang),
    });
  }

  // Validate email
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: t('invalidEmail', req.lang),
    });
  }

  // Validate password
  if (password) {
    const passwordErrorKey = validatePassword(password);

    if (passwordErrorKey) {
      return res.status(400).json({
        message: t(passwordErrorKey, req.lang),
      });
    }
  }

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: t('userAlreadyExist', req.lang),
    });
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();
});

export { createUser };

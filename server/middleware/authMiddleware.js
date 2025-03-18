import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { t } from '../utils/translator.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // Exclude password field
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: t('notAuthorizedTokenFailed', req.lang),
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: t('notAuthorizedNoToken', req.lang),
    });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: t('notAuthorizedAdmin', req.lang),
    });
  }
};

export { authenticate, authorizeAdmin };

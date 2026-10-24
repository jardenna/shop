import jwt from 'jsonwebtoken';
import { ROLES } from '../config/constants.js';
import User from '../models/userModel.js';
import { t } from '../utils/translator.js';
import asyncHandler from './asyncHandler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: t('notAuthorizedNoToken', req.lang),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: t('notAuthorizedTokenFailed', req.lang),
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: t('notAuthorizedTokenFailed', req.lang),
    });
  }
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: t('notAuthorized', req.lang),
    });
  }
};

export const authorizeEmployee = (req, res, next) => {
  if (req.user && req.user.role === ROLES.EMPLOYEE) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: t('notAuthorized'),
    });
  }
};

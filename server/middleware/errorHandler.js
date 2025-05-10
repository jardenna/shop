import mongoose from 'mongoose';
import { t } from '../utils/translator.js';

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: t('couldNotFindInfo', req.lang),
    });
  }

  // CastError - invalid ObjectId
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 400;
    message = t('pleaseSelectParentCategory', req.lang);
  }

  // Duplicate key error
  if (error.code === 11000) {
    statusCode = 400;
    message = t('categoryAlreadyExist', req.lang);
  }

  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => t(err.message, req.lang))
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export default errorHandler;

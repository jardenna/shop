import { t } from '../utils/translator.js';

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // Handle CastError (e.g. invalid ObjectId)
  if (error.name === 'CastError') {
    const isIdParam = error.path === '_id' && req.params?.id;

    if (isIdParam) {
      statusCode = 404;
      message = t('couldNotFindInfo', req.lang);
    } else {
      console.warn(
        `[CastError] Path: ${error.path} | Value: ${error.value} | Route: ${req.originalUrl}`,
      );
      statusCode = 400;
      message = t('couldNotFindInfo', req.lang);
    }
  }

  // Duplicate key error
  if (error.code === 11000) {
    statusCode = 400;
    message = t('categoryAlreadyExist', req.lang);
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => t(err.message, req.lang))
      .join(', ');
  }

  // Multer specific error handling
  if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = t('fileExceedsSize', req.lang);
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = t('invalidFileType', req.lang);
  }

  // Custom "no files" error
  if (error.message === t('noImagesProvided', req.lang)) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export default errorHandler;

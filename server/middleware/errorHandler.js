const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // Handle specific error types
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Please add a parent category ID';
  }

  if (error.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export default errorHandler;

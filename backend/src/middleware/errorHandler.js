import env from '../config/env.js';

export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Multer error handling
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = `Uploaded file exceeds size limit of ${env.MAX_UPLOAD_SIZE_MB}MB.`;
    }
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid session token.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Session token has expired. Please sign in again.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}


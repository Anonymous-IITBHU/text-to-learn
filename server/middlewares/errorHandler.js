/**
 * Global error-handling middleware.
 * Catches unhandled errors from route handlers and returns a consistent JSON response.
 */
const errorHandler = (err, _req, res, _next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorHandler;

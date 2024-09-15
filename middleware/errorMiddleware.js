const errorMiddleware = (err, req, res, next) => {
  // Set the status code (default to 500 for server errors)
  const statusCode = err.status || 500;

  // Send a JSON response with the error message and status code
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    status: statusCode,
  });
};

export default errorMiddleware;

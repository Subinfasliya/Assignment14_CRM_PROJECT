const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";

  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with these details already exists";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid request data";
  } else if (statusCode < 500) {
    message = err.message || message;
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler
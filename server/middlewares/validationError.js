const { validationResult } = require("express-validator");

const validationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return res.status(400).json({
      success: false,
      message: validationErrors[0].message,
      errors: validationErrors,
    });
  }

  next();
};

module.exports = validationError

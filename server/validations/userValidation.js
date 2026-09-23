const { body } = require("express-validator");

const userFields = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("phone")
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Please provide a valid Indian phone number"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),
];

const createUserValidation = [
  ...userFields(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters long"),
];

const updateUserValidation = userFields().map((validation) =>
  validation.optional(),
);

module.exports = { createUserValidation, updateUserValidation };
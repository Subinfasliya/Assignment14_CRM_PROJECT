const { register, login } = require("../../controllers/authController");
const validationError = require("../../middlewares/validationError");
const {
  registerValidation,
  loginValidation,
} = require("../../validations/authValidation");

const authRouter = require("express").Router();

authRouter.post("/register", registerValidation, validationError, register);
authRouter.post("/login", loginValidation, validationError, login);

module.exports = authRouter;

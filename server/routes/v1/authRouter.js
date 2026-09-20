const { register, login, getMe, logout, refreshAccessToken } = require("../../controllers/authController");
const protect = require("../../middlewares/authMiddleware");
const validationError = require("../../middlewares/validationError");
const {
  registerValidation,
  loginValidation,
} = require("../../validations/authValidation");

const authRouter = require("express").Router();

authRouter.get("/me", protect, getMe)
authRouter.post("/register", registerValidation, validationError, register);
authRouter.post("/login", loginValidation, validationError, login);
authRouter.post("/refresh", refreshAccessToken);
authRouter.post("/logout", logout)
module.exports = authRouter;

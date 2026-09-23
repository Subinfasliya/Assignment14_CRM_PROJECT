const { register, login, getMe, logout, refreshAccessToken } = require("../../controllers/authController");
const protect = require("../../middlewares/authMiddleware");
const validationError = require("../../middlewares/validationError");
const { rateLimit } = require("express-rate-limit");
const {
  registerValidation,
  loginValidation,
} = require("../../validations/authValidation");

const authRouter = require("express").Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication requests. Please try again later.",
  },
});
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many failed login attempts. Please try again later.",
  },
});

authRouter.get("/me", authLimiter, protect, getMe)
authRouter.post("/register", authLimiter, registerValidation, validationError, register);
authRouter.post("/login", loginLimiter, loginValidation, validationError, login);
authRouter.post("/refresh", authLimiter, refreshAccessToken);
authRouter.post("/logout", authLimiter, logout)
module.exports = authRouter;

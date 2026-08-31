require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_EXPIRES_IN = "15m";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload._id,
      role: payload.role,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );
};

const verifyToken = (userToken) => {
  return jwt.verify(userToken, JWT_SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};

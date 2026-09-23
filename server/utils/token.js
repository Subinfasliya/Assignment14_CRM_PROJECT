require("dotenv").config();

const jwt = require("jsonwebtoken");

const getSecret = (name) => {
  const secret = process.env[name];

  if (!secret || (process.env.NODE_ENV === "production" && secret.length < 32)) {
    throw new Error(`${name} must be configured with at least 32 characters`);
  }

  return secret;
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    getSecret("JWT_ACCESS_SECRET"),
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
      algorithm: "HS256",
    },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    getSecret("JWT_REFRESH_SECRET"),
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
      algorithm: "HS256",
    },
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, getSecret("JWT_ACCESS_SECRET"), {
    algorithms: ["HS256"],
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, getSecret("JWT_REFRESH_SECRET"), {
    algorithms: ["HS256"],
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

const RefreshToken = require("../models/refreshTokenModel");
const User = require("../models/userModel");
const { hashedPassword, comparePassword } = require("../utils/password");
const { hashRefreshToken } = require("../utils/refreshToken");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token");

const REFRESH_COOKIE_NAME = "refreshToken";

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const getRefreshCookieOptions = () => ({
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite: process.env.REFRESH_COOKIE_SAME_SITE || "none",

  maxAge: REFRESH_TOKEN_MAX_AGE,

  path: "/api/v1/auth",
});

const getRefreshTokenExpiry = () => {
  return new Date(Date.now() + REFRESH_TOKEN_MAX_AGE);
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExisit = await User.findOne({ email });

    if (userExisit) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashPassword = await hashedPassword(password);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "Successfully Registered",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      tokenHash: hashRefreshToken(refreshToken),
      user: user._id,
      expiresAt: getRefreshTokenExpiry(),
    });

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

    res.status(200).json({
      success: true,
      message: "Login successful",

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    let decoded;

    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // Find stored token hash
    const tokenHash = hashRefreshToken(refreshToken);

    const storedToken = await RefreshToken.findOne({
      tokenHash,
      user: decoded.id,
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked or is invalid",
      });
    }

    // Check revoked

    if (storedToken.revokedAt) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has already been revoked",
      });
    }

    // Check expiration
    if (storedToken.expiresAt <= new Date()) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has expired",
      });
    }

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Rotate old REFRESH TOKEN
    storedToken.revokedAt = new Date();

    await storedToken.save();

    // Generate NEW tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Store NEW refresh token hash

    await RefreshToken.create({
      tokenHash: hashRefreshToken(newRefreshToken),
      user: user._id,
      expiresAt: getRefreshTokenExpiry(),
    });

    // Replace cookie
    res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, getRefreshCookieOptions());

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Revoke refresh token in database

    if (refreshToken) {
      const tokenHash = hashRefreshToken(refreshToken);

      await RefreshToken.findOneAndUpdate(
        {
          tokenHash,
        },
        {
          revokedAt: new Date(),
        },
      );
    }

    // Remove cookie

    res.clearCookie(REFRESH_COOKIE_NAME, getRefreshCookieOptions());

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, logout, refreshAccessToken };

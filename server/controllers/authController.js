const User = require("../models/userModel");
const { hashedPassword, comparePassword } = require("../utils/password");
const { sendTokenResponse } = require("../utils/sendToken");

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

    // Set cookie and send response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, logout };

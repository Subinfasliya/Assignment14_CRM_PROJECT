const User = require("../models/userModel");
const { generateToken } = require("../utils/jwt");
const { hashedPassword, comparePassword } = require("../utils/password");

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

    const token = generateToken({ id: user._id, role: user.role });



    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
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

module.exports = { register, login };

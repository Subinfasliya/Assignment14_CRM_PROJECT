
const { generateToken } = require("./jwt");

const sendTokenResponse = (user, statusCode, res) => {
 
  const token = generateToken({ _id: user._id, role: user.role });

  // Cookie options
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};

  module.exports = { sendTokenResponse };
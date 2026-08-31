const bcrypt = require("bcryptjs");

const SALT_ROUND = 12;

const hashedPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUND);
  return hashPassword;
};

const comparePassword = async (plainPassword, storedHash) => {
  const isMatchedPassword = await bcrypt.compare(plainPassword, storedHash);
  return isMatchedPassword;
};

module.exports = {
  hashedPassword,
  comparePassword,
};

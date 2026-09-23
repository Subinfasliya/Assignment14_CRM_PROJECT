const test = require("node:test");
const assert = require("node:assert/strict");

process.env.JWT_ACCESS_SECRET = "test-access-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";

const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/token");

const user = {
  _id: "507f1f77bcf86cd799439011",
  role: "admin",
};

test("access and refresh tokens round-trip with their configured secrets", () => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  assert.equal(verifyAccessToken(accessToken).id, user._id);
  assert.equal(verifyAccessToken(accessToken).role, user.role);
  assert.equal(verifyRefreshToken(refreshToken).id, user._id);
});
const jwt = require("jsonwebtoken");

/**
 * Generate access token
 * @param {object} payload - Data yang akan di-encode (misal { userId, email })
 * @returns {string} - JWT token
 */
exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Default 1 jam
  });
};

/**
 * Verify access token
 * @param {string} token - JWT token
 * @returns {object} - Decoded payload
 * @throws {Error} - Jika token invalid atau expired
 */
exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

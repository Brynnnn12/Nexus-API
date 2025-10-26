const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { responseError } = require("../../../utils/globals/response");
const {
  verifyAccessToken,
  generateAccessToken,
} = require("../../../config/jwt");

exports.authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseError(res, 401, null, "Unauthorized: Tidak ada token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return responseError(res, 401, null, "Unauthorized: Token expired");
    }
    if (err.name === "JsonWebTokenError") {
      return responseError(res, 401, null, "Unauthorized: token tidak valid");
    }
    return responseError(res, 500, null, "Server Bermasalah");
  }
});

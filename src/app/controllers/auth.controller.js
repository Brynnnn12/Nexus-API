const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  responseSuccess,
  responseError,
} = require("../../utils/globals/response");
const { register, login, deleteAccount } = require("../services/auth.service");

/**
 * Register user
 */
exports.register = asyncHandler(async (req, res) => {
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validation failed");
  }

  const { name, email, password, passwordConfirmation } = req.body;

  try {
    const result = await register({
      name,
      email,
      password,
      passwordConfirmation,
    });
    return responseSuccess(res, 201, result, "User registered successfully");
  } catch (error) {
    return responseError(res, 400, error.message, "Registrasi gagal");
  }
});

/**
 * Login user
 */
exports.login = asyncHandler(async (req, res) => {
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { email, password } = req.body;

  try {
    const result = await login({ email, password });
    return responseSuccess(res, 200, result, "Login berhasil");
  } catch (error) {
    return responseError(res, 401, error.message, "Login gagal");
  }
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  try {
    const result = await deleteAccount(userId);
    return responseSuccess(res, 200, result, "Akun berhasil dihapus");
  } catch (error) {
    return responseError(res, 404, error.message, "Gagal menghapus akun");
  }
});

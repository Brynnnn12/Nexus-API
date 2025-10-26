const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  responseSuccess,
  responseError,
} = require("../../utils/globals/response");
const ProfileService = require("../services/profile.service");

exports.getProfile = asyncHandler(async (req, res) => {
  const { id: userId } = req.user; // Dari auth middleware

  try {
    const profile = await ProfileService.getProfile(userId);
    return responseSuccess(res, 200, profile, "Mengambil profile");
  } catch (error) {
    return responseError(res, 404, null, error.message);
  }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileService.getUserProfile(id);
    return responseSuccess(res, 200, profile, "Mengambil profile user");
  } catch (error) {
    return responseError(res, 404, error.message, "Profile tidak ditemukan");
  }
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id: userId } = req.user;
  const { displayName, bio } = req.body;

  try {
    const profile = await ProfileService.updateProfile(userId, {
      displayName,
      bio,
    });
    return responseSuccess(res, 200, profile, "Profile diperbarui");
  } catch (error) {
    return responseError(res, 400, error.message, "Gagal memperbarui profile");
  }
});

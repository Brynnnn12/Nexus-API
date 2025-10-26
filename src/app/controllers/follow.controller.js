const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  responseSuccess,
  responseError,
} = require("../../utils/globals/response");
const FollowService = require("../services/follow.service");

exports.followUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id: followerId } = req.user;
  const { id: followingId } = req.params;

  try {
    const follow = await FollowService.followUser(followerId, followingId);
    return responseSuccess(res, 201, follow, "Mengikuti user");
  } catch (error) {
    return responseError(res, 400, null, error.message);
  }
});

exports.unfollowUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id: followerId } = req.user;
  const { id: followingId } = req.params;

  try {
    const result = await FollowService.unfollowUser(followerId, followingId);
    return responseSuccess(
      res,
      200,
      result,
      "Berhasil berhenti mengikuti user"
    );
  } catch (error) {
    return responseError(res, 400, null, error.message);
  }
});

exports.getFollowers = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  try {
    const followers = await FollowService.getFollowers(userId);
    return responseSuccess(res, 200, followers, "Berhasil mengambil followers");
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

exports.getFollowing = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  try {
    const following = await FollowService.getFollowing(userId);
    return responseSuccess(res, 200, following, "Berhasil mengambil following");
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

exports.getFollowStats = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  try {
    const stats = await FollowService.getFollowStats(userId);
    return responseSuccess(
      res,
      200,
      stats,
      "Statistik mengikuti berhasil diambil"
    );
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  responseSuccess,
  responseError,
} = require("../../utils/globals/response");
const LikeService = require("../services/like.service");

exports.likePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id: userId } = req.user;
  const { id: postId } = req.params;

  try {
    const like = await LikeService.likePost(userId, postId);
    return responseSuccess(res, 201, like, "Menyukai post");
  } catch (error) {
    return responseError(res, 400, null, error.message);
  }
});

exports.unlikePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id: userId } = req.user;
  const { id: postId } = req.params;

  try {
    const result = await LikeService.unlikePost(userId, postId);
    return responseSuccess(
      res,
      200,
      result,
      "Berhasil menghapus suka dari post"
    );
  } catch (error) {
    return responseError(res, 400, null, error.message);
  }
});

exports.getLikesByPost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  try {
    const likes = await LikeService.getLikesByPost(postId);
    return responseSuccess(res, 200, likes, "Mengambil likes dari post");
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

exports.getLikesCount = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  try {
    const count = await LikeService.getLikesCount(postId);
    return responseSuccess(
      res,
      200,
      { count },
      "Mengambil jumlah likes dari post"
    );
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

exports.getLikesByUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  try {
    const likes = await LikeService.getLikesByUser(userId);
    return responseSuccess(res, 200, likes, "Mengambil likes dari user");
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

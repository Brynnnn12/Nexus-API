const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  responseSuccess,
  responseError,
} = require("../../utils/globals/response");
const PostService = require("../services/post.service");

exports.getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostService.getPost(id);
    return responseSuccess(res, 200, post, "Mengambil post");
  } catch (error) {
    return responseError(res, 404, error.message, "Post tidak ditemukan");
  }
});

exports.getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await PostService.getAllPosts(page, limit);
    // Return dengan format yang benar
    return res.status(200).json({
      status: "success",
      message: "Mengambil semua post",
      data: result.data, // langsung array posts
      meta: result.meta,
    });
  } catch (error) {
    return responseError(res, 500, error.message, "Gagal mengambil posts");
  }
});

exports.getPostsByUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await PostService.getPostsByUser(userId, page, limit);
    // Return dengan format yang benar
    return res.status(200).json({
      status: "success",
      message: "Mengambil post dari user",
      data: result.data, // langsung array posts
      meta: result.meta,
    });
  } catch (error) {
    return responseError(res, 500, error.message, "Gagal mengambil posts user");
  }
});

exports.createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id: userId } = req.user;
  const { content } = req.body;

  try {
    const post = await PostService.createPost(userId, { content });
    return responseSuccess(res, 201, post, "Membuat post");
  } catch (error) {
    return responseError(res, 500, null, error.message);
  }
});

exports.updatePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseError(res, 400, errors.array(), "Validasi gagal");
  }

  const { id } = req.params;
  const { id: userId } = req.user;
  const { content } = req.body;

  try {
    const post = await PostService.updatePost(id, userId, { content });
    return responseSuccess(res, 200, post, "Post diperbarui");
  } catch (error) {
    return responseError(res, 403, null, error.message);
  }
});

exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const result = await PostService.deletePost(id, userId);
    return responseSuccess(res, 200, result, "Post dihapus");
  } catch (error) {
    return responseError(res, 403, null, error.message);
  }
});

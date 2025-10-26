const LikeRepository = require("../repositories/like.repository");

exports.likePost = async (userId, postId) => {
  const existingLike = await LikeRepository.findLike(userId, postId);
  if (existingLike) {
    throw new Error("Already liked this post");
  }

  return await LikeRepository.createLike(userId, postId);
};

exports.unlikePost = async (userId, postId) => {
  const like = await LikeRepository.findLike(userId, postId);
  if (!like) {
    throw new Error("Not liked this post");
  }

  const deleted = await LikeRepository.deleteLike(userId, postId);
  if (!deleted) {
    throw new Error("Unlike failed");
  }
  return { message: "Unliked successfully" };
};

exports.getLikesByPost = async (postId) => {
  return await LikeRepository.getLikesByPost(postId);
};

exports.getLikesCount = async (postId) => {
  return await LikeRepository.getLikesCount(postId);
};

exports.getLikesByUser = async (userId) => {
  return await LikeRepository.getLikesByUser(userId);
};

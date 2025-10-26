const { Like } = require("../../database/models");

exports.findLike = async (userId, postId) => {
  return await Like.findOne({
    where: { userId, postId },
  });
};

exports.createLike = async (userId, postId) => {
  return await Like.create({ userId, postId });
};

exports.deleteLike = async (userId, postId) => {
  return await Like.destroy({
    where: { userId, postId },
  });
};

exports.getLikesByPost = async (postId) => {
  return await Like.findAll({
    where: { postId },
    include: [
      {
        model: require("../../database/models").User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

exports.getLikesCount = async (postId) => {
  return await Like.count({
    where: { postId },
  });
};

exports.getLikesByUser = async (userId) => {
  return await Like.findAll({
    where: { userId },
    include: [{ model: require("../../database/models").Post, as: "post" }],
  });
};

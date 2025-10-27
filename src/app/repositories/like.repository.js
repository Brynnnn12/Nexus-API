const { Like } = require("../../database/models");

exports.findLike = async (userId, postId) => {
  return await Like.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
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
    attributes: {
      exclude: ["userId", "postId", "createdAt", "updatedAt"],
    },
    where: { postId },
    include: [
      {
        model: require("../../database/models").User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: require("../../database/models").Post,
        as: "post",
        attributes: ["content"],
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
    attributes: {
      exclude: ["userId", "postId", "createdAt", "updatedAt"],
    },
    where: { userId },
    include: [
      {
        model: require("../../database/models").Post,
        as: "post",
        attributes: ["content"],
      },
    ],
  });
};

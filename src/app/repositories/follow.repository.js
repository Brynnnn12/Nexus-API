const { Follow } = require("../../database/models");

exports.findFollow = async (followerId, followingId) => {
  return await Follow.findOne({
    where: { followerId, followingId },
  });
};

exports.createFollow = async (followerId, followingId) => {
  return await Follow.create({ followerId, followingId });
};

exports.deleteFollow = async (followerId, followingId) => {
  return await Follow.destroy({
    where: { followerId, followingId },
  });
};

exports.getFollowers = async (userId) => {
  return await Follow.findAll({
    where: { followingId: userId },
    attributes: {
      exclude: ["followerId", "followingId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: require("../../database/models").User,
        as: "follower",
        attributes: ["name"],
      },
    ],
  });
};

exports.getFollowing = async (userId) => {
  return await Follow.findAll({
    where: { followerId: userId },
    attributes: {
      exclude: ["followerId", "followingId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: require("../../database/models").User,
        as: "following",
        attributes: ["name"],
      },
    ],
  });
};

exports.getFollowersCount = async (userId) => {
  return await Follow.count({
    where: { followingId: userId },
  });
};

exports.getFollowingCount = async (userId) => {
  return await Follow.count({
    where: { followerId: userId },
  });
};

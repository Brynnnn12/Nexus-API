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
    include: [
      {
        model: require("../../database/models").User,
        as: "follower",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

exports.getFollowing = async (userId) => {
  return await Follow.findAll({
    where: { followerId: userId },
    include: [
      {
        model: require("../../database/models").User,
        as: "following",
        attributes: ["id", "name", "email"],
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

const FollowRepository = require("../repositories/follow.repository");

exports.followUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await FollowRepository.findFollow(
    followerId,
    followingId
  );
  if (existingFollow) {
    throw new Error("Already following this user");
  }

  return await FollowRepository.createFollow(followerId, followingId);
};

exports.unfollowUser = async (followerId, followingId) => {
  const follow = await FollowRepository.findFollow(followerId, followingId);
  if (!follow) {
    throw new Error("Not following this user");
  }

  const deleted = await FollowRepository.deleteFollow(followerId, followingId);
  if (!deleted) {
    throw new Error("Unfollow failed");
  }
  return { message: "Unfollowed successfully" };
};

exports.getFollowers = async (userId) => {
  return await FollowRepository.getFollowers(userId);
};

exports.getFollowing = async (userId) => {
  return await FollowRepository.getFollowing(userId);
};

exports.getFollowStats = async (userId) => {
  const followersCount = await FollowRepository.getFollowersCount(userId);
  const followingCount = await FollowRepository.getFollowingCount(userId);
  return { followersCount, followingCount };
};

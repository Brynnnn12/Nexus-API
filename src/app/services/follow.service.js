const FollowRepository = require("../repositories/follow.repository");

// Function to validate UUID
const isValidUUID = (str) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

exports.followUser = async (followerId, followingId) => {
  if (!isValidUUID(followerId)) {
    throw new Error("ID follower tidak valid");
  }
  if (!isValidUUID(followingId)) {
    throw new Error("ID following tidak valid");
  }
  if (followerId === followingId) {
    throw new Error("Tidak dapat mengikuti diri sendiri");
  }

  const existingFollow = await FollowRepository.findFollow(
    followerId,
    followingId
  );
  if (existingFollow) {
    throw new Error("Kamu sudah mengikuti pengguna ini");
  }

  return await FollowRepository.createFollow(followerId, followingId);
};

exports.unfollowUser = async (followerId, followingId) => {
  if (!isValidUUID(followerId)) {
    throw new Error("ID follower tidak valid");
  }
  if (!isValidUUID(followingId)) {
    throw new Error("ID following tidak valid");
  }
  const follow = await FollowRepository.findFollow(followerId, followingId);
  if (!follow) {
    throw new Error("Kamu tidak mengikuti pengguna ini");
  }

  const deleted = await FollowRepository.deleteFollow(followerId, followingId);
  if (!deleted) {
    throw new Error("Unfollow gagal");
  }
  return { message: "Berhenti mengikuti berhasil" };
};

exports.getFollowers = async (userId) => {
  if (!isValidUUID(userId)) {
    throw new Error("ID user tidak valid");
  }
  return await FollowRepository.getFollowers(userId);
};

exports.getFollowing = async (userId) => {
  if (!isValidUUID(userId)) {
    throw new Error("ID user tidak valid");
  }
  return await FollowRepository.getFollowing(userId);
};

exports.getFollowStats = async (userId) => {
  if (!isValidUUID(userId)) {
    throw new Error("ID user tidak valid");
  }
  const followersCount = await FollowRepository.getFollowersCount(userId);
  const followingCount = await FollowRepository.getFollowingCount(userId);
  return { followersCount, followingCount };
};

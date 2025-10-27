const ProfileRepository = require("../repositories/profile.repository");
const FollowRepository = require("../repositories/follow.repository");
const PostRepository = require("../repositories/post.repository");
const AuthRepository = require("../repositories/auth.repository");

exports.getProfile = async (userId) => {
  let profile = await ProfileRepository.findByUserId(userId);
  if (!profile) {
    // Jika profile tidak ada, buat otomatis
    const user = await AuthRepository.findById(userId);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }
    profile = await ProfileRepository.create({
      userId: userId,
      displayName: user.name,
    });
  }
  return profile;
};

exports.getUserProfile = async (userId) => {
  const profile = await ProfileRepository.findByUserId(userId);
  if (!profile) {
    throw new Error("Profile tidak ditemukan");
  }

  const followersCount = await FollowRepository.getFollowersCount(userId);
  const followingCount = await FollowRepository.getFollowingCount(userId);
  const postsCount = await PostRepository.countByUserId(userId);

  return {
    name: profile.user.name,
    displayName: profile.displayName,
    bio: profile.bio,
    stats: {
      followers: followersCount,
      following: followingCount,
      posts: postsCount,
    },
  };
};

exports.updateProfile = async (userId, updateData) => {
  const updated = await ProfileRepository.updateByUserId(userId, updateData);
  if (!updated) {
    throw new Error("Profile not found or no changes");
  }
  return await ProfileRepository.findByUserId(userId);
};

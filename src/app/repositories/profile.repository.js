const { Profile, User } = require("../../database/models");

exports.findByUserId = async (userId) => {
  return await Profile.findOne({
    where: { userId },
    attributes: ["displayName", "bio"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
  });
};

exports.create = async (profileData, options = {}) => {
  return await Profile.create(profileData, options);
};

exports.updateByUserId = async (userId, updateData) => {
  const [affectedRows] = await Profile.update(updateData, {
    where: { userId },
  });
  return affectedRows > 0;
};

exports.deleteByUserId = async (userId) => {
  return await Profile.destroy({ where: { userId } });
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // 1-to-1 dengan User
      Profile.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // Jika perlu, tambah User.hasOne(Profile) di User model
    }
  }

  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
    }
  );

  return Profile;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 1-to-1 dengan Profile
      User.hasOne(models.Profile, {
        foreignKey: "userId",
        as: "profile",
      });
      // 1-to-many dengan Post
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "posts",
      });
      // Many-to-many self-referencing untuk follows
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: "followers", // Users yang follow saya
        foreignKey: "followingId",
        otherKey: "followerId",
      });
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: "following", // Users yang saya follow
        foreignKey: "followerId",
        otherKey: "followingId",
      });
      // 1-to-many dengan Like
      User.hasMany(models.Like, {
        foreignKey: "userId",
        as: "likes",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};

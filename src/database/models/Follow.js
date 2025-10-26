"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      // Follow belongs to follower (User)
      Follow.belongsTo(models.User, {
        foreignKey: "followerId",
        as: "follower",
      });
      // Follow belongs to following (User)
      Follow.belongsTo(models.User, {
        foreignKey: "followingId",
        as: "following",
      });
    }
  }

  Follow.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      followerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      followingId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Follow",
      tableName: "follows",
    }
  );

  return Follow;
};

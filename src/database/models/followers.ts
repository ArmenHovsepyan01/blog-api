'use strict';

import Sequelize, { Model, Optional } from 'sequelize';
import db from './index';

interface FollowersAttributes {
  id?: number;
  followerId: number;
  followingId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FollowersInput extends Optional<FollowersAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default (sequelize, DataTypes: typeof Sequelize.DataTypes) => {
  class Followers
    extends Model<FollowersAttributes, FollowersInput>
    implements FollowersAttributes
  {
    id?: number;
    followerId: number;
    followingId: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    static associate(models: typeof db) {
      this.belongsTo(models.User, { foreignKey: 'followerId', as: 'followerUser' });
      this.belongsTo(models.User, { foreignKey: 'followingId', as: 'followingUser' });
    }
  }

  Followers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Followers'
    }
  );
  return Followers;
};

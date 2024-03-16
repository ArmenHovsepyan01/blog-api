'use strict';
import Sequelize, { Model, Optional, DataTypes } from 'sequelize';
import db from './index';

interface LikedBlogsAttributes {
  id?: number;
  userId: number;
  blogId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LikedBlogsInput
  extends Optional<LikedBlogsAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class LikedBlogs
    extends Model<LikedBlogsAttributes, LikedBlogsInput>
    implements LikedBlogsAttributes
  {
    id?: number;
    userId: number;
    blogId: number;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    static associate(models: typeof db) {
      this.belongsTo(models.Blog, {
        foreignKey: 'blogId',
        as: 'blog'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  LikedBlogs.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Blogs',
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
      modelName: 'LikedBlogs'
    }
  );
  return LikedBlogs;
};

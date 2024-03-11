'use strict';
import Sequelize, { InstanceDestroyOptions, Model, Optional } from 'sequelize';
import db from './index';
import deleteImage from '../../utilis/deleteImage';

export interface BlogAttributes {
  id?: number;
  title: string;
  content: string;
  imageUrl: string;
  isPublished?: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BlogInput extends Optional<BlogAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class Blog extends Model<BlogAttributes, BlogInput> implements BlogAttributes {
    id?: number;
    title: string;
    content: string;
    imageUrl: string;
    isPublished?: boolean;
    userId: number;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    static associate(models: typeof db) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      this.hasMany(models.LikedBlogs, {
        foreignKey: 'blogId'
      });
    }
  }
  Blog.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
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
      modelName: 'Blog',
      hooks: {
        async beforeDestroy(instance, options: InstanceDestroyOptions) {
          if (instance.imageUrl) {
            await deleteImage(instance.imageUrl);
            console.log('Image deleted successfully.');
          }
        }
      }
    }
  );
  return Blog;
};

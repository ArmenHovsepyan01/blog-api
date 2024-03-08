import Sequelize, { Model, Optional } from 'sequelize';
import db from './index';
interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    id!: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: typeof db) {
      this.hasMany(models.Blog, {
        as: 'blogs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.LikedBlogs, {
        foreignKey: 'userId'
      });
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
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
      modelName: 'User'
    }
  );
  return User;
};

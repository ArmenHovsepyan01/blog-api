'use strict';

import Sequelize, { Model, Optional } from 'sequelize';

interface VerificationCodesAttributes {
  id?: number;
  user_id: number;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VerificationCodesInput
  extends Optional<VerificationCodesAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default (sequelize: any, DataTypes: typeof Sequelize.DataTypes) => {
  class VerificationCodes
    extends Model<VerificationCodesAttributes, VerificationCodesInput>
    implements VerificationCodesAttributes
  {
    id?: number;
    user_id: number;
    code: string;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    static associate(models: any) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }

  VerificationCodes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      code: {
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
      modelName: 'VerificationCodes'
    }
  );

  return VerificationCodes;
};

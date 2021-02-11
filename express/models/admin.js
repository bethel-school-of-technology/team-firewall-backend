'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    
    static associate(models) {
    }
  };
  admin.init({
    AdminId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Password: {
      unique: true,
      type: DataTypes.STRING
    },
    Email: {
      unique: true,
      type: DataTypes.STRING
    },
    AdminStatus: {
      DefaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};
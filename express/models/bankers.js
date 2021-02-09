'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankers extends Model {
    
    static associate(models) {
      
    }
  };
  bankers.init({
    BankerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: {
      unique: true,
      type: DataTypes.STRING
    },
    Password: DataTypes.STRING,
    BankId: {
      foreignKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'bankers',
  });
  return bankers;
};
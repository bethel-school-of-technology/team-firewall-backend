'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var bankers = sequelize.define(
    'bankers',
    {
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
        type: DataTypes.INTEGER,
        foreignKey: true
    },
  }, 
  {});
  
  return bankers;
};
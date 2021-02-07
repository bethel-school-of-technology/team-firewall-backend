'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var admin= sequelize.define(
    'admin',
    {
    AdminId:{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type: DataTypes.INTEGER
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Password: DataTypes.STRING,
    AdminStatus: DataTypes.BOOLEAN
  }, 
  {}
  );
  return admin;
};
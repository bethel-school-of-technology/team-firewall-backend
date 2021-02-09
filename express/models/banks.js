'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banks extends Model {
    
    static associate(models) {
      
    }
  };
  banks.init({
    BankId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'banks',
  });
  return banks;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loans extends Model {
    
    static associate(models) {
      
    }
  };
  loans.init({
    LoanId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    LoanAmmount: DataTypes.INTEGER,
    Address: DataTypes.STRING,
    AccountNumber: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    BankId: {
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    ForSale: {
      DefaultValue: false,
      type: DataTypes.BOOLEAN
    }, 
    Deleted: {
      DefaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'loans',
  });
  return loans;
};
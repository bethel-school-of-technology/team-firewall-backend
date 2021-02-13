module.exports = function(models){
    models.banks.hasMany(models.bankers, {
        foreignKey: 'BankId'
    });
    models.banks.hasMany(models.loans, {
        foreignKey: 'BankId'
    });
    models.bankers.belongsTo(models.banks, {
        foreignKey: 'BankId'
    });
    models.loans.belongsTo(models.banks, {
        foreignKey: 'BankId'
    });
}
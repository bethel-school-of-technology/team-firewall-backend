const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcryptjs');

var authService = {
    assignToken: function(banker){
        const token1 = jwt.sign({
            email: banker.Email,
            BankerId: banker.BankerId
        }, 'secretKey',
        {
            expiresIn: '1h'
        });
        return token1;
    },
    assignToken2: function(admin){
        const token2 = jwt.sign({
            Email: admin.Email,
            AdminId: admin.AdminId
        }, 'NewUniqueKey',
        {
            expiresIn: '1h'
        });
        return token2;
    },
    verifyUser: function(token1){
        try {
            let decoded = jwt.verify(token1, 'secretKey');
            return models.bankers.findByPk(decoded.BankerId);
        } catch(err) {
            console.log(err);
            return null;
        }
    },
    verifyUser2: function(token2){
        try {
            let decoded = jwt.verify(token2, 'NewUniqueKey');
            return models.admin.findByPk(decoded.AdminId);
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}




module.exports = authService;

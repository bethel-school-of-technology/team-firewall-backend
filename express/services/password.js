const models = require('../models');
const bcrypt = require('bcryptjs');

var passwordService1 = {
    hashPassword: function(plainTextPassword){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function(plainTextPassword, hashPassword){
        return bcrypt.compareSync(plainTextPassword, hashPassword);
    }
}

var passwordService2 = {
    hashPassword: function(plainTextPassword){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function(plainTextPassword, hashPassword){
        return bcrypt.compareSync(plainTextPassword, hashPassword);
    }
}

module.exports = passwordService1;
module.exports = passwordService2;
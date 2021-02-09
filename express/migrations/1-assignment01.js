'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "admins", deps: []
 * createTable "bankers", deps: []
 * createTable "banks", deps: []
 * createTable "loans", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "assignment01",
    "created": "2021-02-09T17:44:58.235Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "admins",
            {
                "AdminId": {
                    "type": Sequelize.INTEGER,
                    "field": "AdminId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password",
                    "unique": true
                },
                "AdminStatus": {
                    "type": Sequelize.BOOLEAN,
                    "field": "AdminStatus",
                    "DefaultValue": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "bankers",
            {
                "BankerId": {
                    "type": Sequelize.INTEGER,
                    "field": "BankerId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
                },
                "BankId": {
                    "type": Sequelize.INTEGER,
                    "field": "BankId",
                    "foreignKey": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "banks",
            {
                "BankId": {
                    "type": Sequelize.INTEGER,
                    "field": "BankId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "loans",
            {
                "LoanId": {
                    "type": Sequelize.INTEGER,
                    "field": "LoanId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "LoanAmmount": {
                    "type": Sequelize.INTEGER,
                    "field": "LoanAmmount"
                },
                "Address": {
                    "type": Sequelize.STRING,
                    "field": "Address"
                },
                "AccountNumber": {
                    "type": Sequelize.INTEGER,
                    "field": "AccountNumber",
                    "unique": true,
                    "allowNull": false
                },
                "BankId": {
                    "type": Sequelize.INTEGER,
                    "field": "BankId",
                    "foreignKey": true
                },
                "ForSale": {
                    "type": Sequelize.BOOLEAN,
                    "field": "ForSale",
                    "DefaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

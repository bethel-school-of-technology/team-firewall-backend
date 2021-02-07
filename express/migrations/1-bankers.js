'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "bankers", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "bankers",
    "created": "2021-02-07T01:03:55.634Z",
    "comment": ""
};

var migrationCommands = [{
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
}];

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

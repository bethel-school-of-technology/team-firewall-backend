'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "admins", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "Admin",
    "created": "2021-02-07T01:31:54.915Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "admins",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "AdminId": {
                "type": Sequelize.INTEGER,
                "field": "AdminId"
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
                "field": "Password"
            },
            "AdminStatus": {
                "type": Sequelize.BOOLEAN,
                "field": "AdminStatus"
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

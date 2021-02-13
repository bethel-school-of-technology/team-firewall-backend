'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "updatedAt" to table "banks"
 * addColumn "createdAt" to table "banks"
 * changeColumn "BankId" on table "bankers"
 * changeColumn "BankId" on table "bankers"
 * changeColumn "BankId" on table "bankers"
 * changeColumn "BankId" on table "bankers"
 * changeColumn "BankId" on table "loans"
 * changeColumn "BankId" on table "loans"
 * changeColumn "BankId" on table "loans"
 * changeColumn "BankId" on table "loans"
 *
 **/

var info = {
    "revision": 5,
    "name": "update3",
    "created": "2021-02-13T19:40:14.964Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "banks",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "banks",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "bankers",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "bankers",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "bankers",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "bankers",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "loans",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "loans",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "loans",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "loans",
            "BankId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "banks",
                    "key": "BankId"
                },
                "allowNull": true,
                "field": "BankId",
                "foreignKey": true
            }
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

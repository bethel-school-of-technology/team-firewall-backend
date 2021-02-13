'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
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
    "name": "update4",
    "created": "2021-02-13T20:11:47.570Z",
    "comment": ""
};

var migrationCommands = [{
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

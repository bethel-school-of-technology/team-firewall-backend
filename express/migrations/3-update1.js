'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Email" to table "admins"
 *
 **/

var info = {
    "revision": 3,
    "name": "update1",
    "created": "2021-02-11T18:39:29.272Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "admins",
        "Email",
        {
            "type": Sequelize.STRING,
            "field": "Email",
            "unique": true
        }
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

'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "AdminStatus" to table "bankers"
 *
 **/

var info = {
    "revision": 2,
    "name": "update",
    "created": "2021-02-11T18:23:33.613Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "bankers",
        "AdminStatus",
        {
            "type": Sequelize.BOOLEAN,
            "field": "AdminStatus",
            "DefaultValue": false
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

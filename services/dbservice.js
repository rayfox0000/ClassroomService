const config = require("./../configurations/config");
const dbConfig = config.db;
const uuid = require("uuid");

const Sequelize = require('sequelize');
var sequelize = null;
var models = {}

function initSequelize() {
    sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        dialect: 'mysql',
        pool: {
            max: dbConfig.pool_size,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    return sequelize;
}


function getSequelize() {
    if (sequelize) {

        return sequelize;
    } else {
        return initSequelize();
    }

}

module.exports = {
    getSequelize
}
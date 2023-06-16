import { DataTypes, Sequelize } from 'sequelize';
import config from '../config/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dbConfig = config.database.mysql;
const db = {};

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    timezone: dbConfig.timezone,
    dialect: 'mysql'
})


fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {

        // eslint-disable-next-line import/no-dynamic-require, global-require
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );

        db[model.name] = model;
    });



db.sequelize = sequelize;

module.exports = db;
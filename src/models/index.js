import config from "../config/index.js";
import Sequelize  from "sequelize";

const dbConfig = config.database.mysql;

const sequelize = new Sequelize(dbConfig.db , dbConfig.user,dbConfig.password, {
    host : dbConfig.host,
    port : dbConfig.port,
    dialect : "mysql" 
});

export default sequelize;
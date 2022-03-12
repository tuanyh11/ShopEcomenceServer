import {config} from 'dotenv';
import assert from 'assert';
import Sequelize from 'sequelize'

config()
const { DB_USER, DB_PWD, DB_NAME, DB_HOST } = process.env; 

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
    host: DB_HOST,
    dialect: 'mysql'  
})  
 

export default sequelize;
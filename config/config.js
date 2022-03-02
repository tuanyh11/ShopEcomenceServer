import {config} from 'dotenv';
import assert from 'assert';
config()
const { DB_USER, DB_PWD, DB_NAME, DB_HOST } = process.env;

// assert(HOST, 'HOST is required');
// assert(PORT, 'PORT is required');

export default {
    MYSQLconfig: {
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME,
        host: DB_HOST
    }
}   
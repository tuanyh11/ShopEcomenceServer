import {config} from 'dotenv';
import assert from 'assert';
config()
const { PORT, HOST, DB_USER, DB_PWD, DB_NAME, DB_SERVER, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

assert(HOST, 'HOST is required');
assert(PORT, 'POST is required');

export default {
    HOST,
    PORT,
    SQLconfig: {
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME,
        server: DB_SERVER,
        options: {
            encrypt: true,
            trustServerCertificate: true
        },
    },
    GoogleConfig: {
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        REFRESH_TOKEN
    }
}   
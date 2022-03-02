import config from '../config/config.js';
import mysql from 'mysql';

const connection = () => mysql.createPool(process.env.DB_URL);

let pool = connection();

pool.on('error',  (err) => {
    if(err) return pool = connection();
})


export default pool;    
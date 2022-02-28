import config from '../config/config.js';
import mssql from 'mssql'; 


const connection = async() => {
    try {
        await mssql.connect(config.SQLconfig);
        console.log('connect server is successfuly!');
    } catch (error) {
        console.log(error)
    }
}

export default connection;   
import Express  from "express";
import routes from "./Routes/index.js";
import cors from 'cors';
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
import db from './config/config.js';
const app = Express();

//test databasconnect

(async() => {
    try {
        db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error); 
    }
})()
 
app.use(Express.json({limit: '50mb'}));
app.use(Express.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());

routes(app);   
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/images', Express.static(path.join(__dirname, "images")));
  
app.listen(5000, () => {
    console.log(`server is run on: http://localhost:${5000}`);
})   
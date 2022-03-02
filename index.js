import Express  from "express";
import routes from "./Routes/index.js";
import connection from "./connection/index.js" ;
import config from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
const app = Express();
 
// app.use(fileUpload()); 
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
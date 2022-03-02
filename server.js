import Express  from "express";
import routes from "./Routes/index.js";
import cors from 'cors';
import connection from './connection/index.js';
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
const app = Express();
 
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
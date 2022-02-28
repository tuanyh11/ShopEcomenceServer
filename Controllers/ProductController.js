import mssql from 'mssql';
import config from '../config/config.js';
import fs from 'fs';
import path, {dirname} from 'path';
import { upload } from '../config/multerConfig.js';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createProduct  = async(req, res) => {
    const error = upload.single('image');
        error(req, res, async(err) => {
            if(err) return res.status(403).json(err);
            try {
                await mssql.connect(config.SQLconfig);
                const result = await mssql.query(`
                INSERT INTO PRODUCT(nameProduct, image, discription) 
                OUTPUT Inserted.id, Inserted.nameProduct, Inserted.image,
                Inserted.discription, Inserted.createdAt,  Inserted.updatedAt 
                VALUES(N'${req.body.nameproduct}', '${req.file.filename}', '${req.body.discriton}')`)
                if(result.recordset.length === 0) {
                    const pathImages = path.join(path.dirname(__dirname), 'images');
                    fs.unlinkSync(`${pathImages}/${req.file.filename}`);
                    return res.status(403).json({message: 'something was wrong on server'});
                }
                res.status(200).json(result.recordset);
            } catch (error) {
                console.log(error);
            }
        })
}
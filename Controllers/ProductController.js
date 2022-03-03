import config from '../config/config.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { upload } from '../config/multerConfig.js';
import { fileURLToPath } from "url";
import pool from '../connection/index.js'
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);


export const createProduct = async(req, res) => {
    if (Object.keys(req.body) === 0) return res.status(404).json('somthing was wrong with your value');
    pool.query(`INSERT INTO Products(name, categoryId, image, material, weight)
        VALUES('${req.body.name}', ${Number(req.body.categoryId)}, '${req.file.filename}',
        '${req.body.material}', '${req.body.weight}'
        )`,
        (err, result) => {
            if (err) return res.status(403).json(err);
            pool.query(`SELECT * FROM Products WHERE id = ${result.insertId}`, (err, result) => {
                if (err) return res.status(403).json(err);
                res.status(200).json({...result[0] });
            })
        }
    )
}
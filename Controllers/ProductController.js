import config from '../config/config.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { upload } from '../config/multerConfig.js';
import { fileURLToPath } from "url";
import Products from '../models/Products.js';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);


export const createProduct = async(req, res) => {
    try {


        // const newProduct = await Products.create({name: req.body.nameproduct, image: req.file.filename, discription: req.body.discriton, categoryId: req.body.categoryId});
        // res.status(200).json({message: 'successed', result: newProduct});
    } catch (error) {
        // res.status(401).json({message: 'error', result: error});
        console.log(error)
    }
}

export const getProduct = async(req, res) => {
   
}
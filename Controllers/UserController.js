import config from '../config/config.js';
import { upload } from '../config/multerConfig.js';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// CREATE USER

export const createUser = async (req, res) => {
    
}

// GET USERS

export const getUsers = async(req, res) => {
   
}
  
// GET ONE USER

export const getUser = async (req, res) => {
    
}

// EDIT ONE USER

export const updateUser =  async(req, res) => {
        
}


export const deleteUser = (req, res) => {
   
}
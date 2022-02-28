import msql from 'mssql';
import config from '../config/config.js';
import { upload } from '../config/multerConfig.js';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import path, {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const pool = await msql.connect(config.SQLconfig);
// CREATE USER

export const createUser = async (req, res) => {
    let { firstname, lastname, email, password, comfirmpassword, gender, cmt, namepermission, phonenumber} = req.body;
    try {
        let fullNameIp = firstname.concat(" ", lastname);
        const {recordset, output: {Errors}} = await pool.request()
                                     .input('cmt', msql.NVarChar(50), cmt)
                                     .input('fullNameIp', msql.NVarChar(50), fullNameIp)
                                     .input('phoneNumberIp', msql.VarChar(15), phonenumber)
                                     .input('nameGender', msql.VarChar(30), gender)
                                     .input('emailIp', msql.VarChar(30), email)
                                     .input('passwordIp', msql.VarChar(30), password)
                                     .input('namePermission', msql.VarChar(30), namepermission)
                                     .output('Errors', msql.VarChar(100))
                                     .execute('VALIDATE_RIGISTER') 
        if(Errors) return res.status(402).json({message: Errors});
        res.status(200).json(recordset[0]);
    } catch (error) {
        res.status(404).json(error);
        console.log(error)
    }
}

// GET USERS

export const getUsers = async(req, res) => {
    try {
        console.log(1)
        const {recordset} = await pool.query('SELECT * FROM USERS WHERE USERS.isDisabled != 1 ');
        res.status(200).json(recordset);
    } catch (error) {
        res.status(404).json({message: error}); 
    }
}
  
// GET ONE USER

export const getUser = async (req, res) => {
    try {
        let {recordset: [user]} = await pool.query(
        `SELECT USERS.id, USERS.email, USERS.fullName, USERS.avatar, GENDERS.nameGender gender, USERS.cmt , USERS.[password], 
        PERMISSION.namePer permission, USERS.phoneNumber, USERS.[status], USERS.createdAt, USERS.updatedAt
        FROM USERS, GENDERS, PERMISSION WHERE USERS.isDisabled = 0 AND USERS.genderId = GENDERS.id AND USERS.id = ${req.params.id}
         AND USERS.permissionId = PERMISSION.id `
        );
        if(user && !user.avatar) {
            if(user.gender === 'male') {
                user.avatar = 'male.jpg'
                return res.status(200).json(user)
            }
            if(user.gender === 'female') {
                user.avatar = 'female.jpg'
                return res.status(200).json(user)
            }
            if(user.gender === 'others') {
                user.avatar = 'others.jpg'
                return res.status(200).json(user)
            }
        }
        res.status(200).json(user); 
    } catch (error) {  
        res.status(404).json(error);
    }
}

// EDIT ONE USER

export const updateUser =  async(req, res) => {
        const error = upload.single('fileImg');
        error(req, res, async(err) => {
            if(err) return res.status(403).json(err);
            let {id, fullName, email, phoneNumber, avatar, permission, password, gender, cmt} = req.body;
            console.log(err)
            try {
                const {recordset: userExits} = await pool.query(`SELECT * FROM USERS WHERE id ='${id}'AND isDisabled = 0`);
                if(userExits.length != 0) {
                email =  email || userExits[0].email; 
                fullName =  fullName || userExits[0].fullName;
                phoneNumber =  phoneNumber || userExits[0].phoneNumber;
                avatar =  req.file?.filename || userExits[0].avatar;
                cmt = cmt || userExits[0].cmt;
                gender =  gender || userExits[0].gender;
                permission =  permission || userExits[0].permission;
                password =  password || userExits[0].password;
                } 
                const {recordset: userUpdated, output} = await pool.request()  
                                                .input('idIp', msql.Int, id)
                                                .input('phoneNumberIp', msql.VarChar(15), phoneNumber)
                                                .input('fullNameIp', msql.NVarChar(50), fullName) 
                                                .input('emailIp', msql.VarChar(30), email) 
                                                .input('passwordIp', msql.VarChar(30), password) 
                                                .input('permissionIp', msql.VarChar(30), permission)
                                                .input('avatar', msql.VarChar(150), avatar)
                                                .input('gender', msql.VarChar(30), gender)
                                                .input('cmtIp', msql.VarChar(20), cmt)
                                                .output('Errors', msql.VarChar(100))
                                                .execute('UPDATE_CHECKING');  
                const pathImages = path.join(path.dirname(__dirname), 'images')
                if(output.Errors) {
                    fs.unlinkSync(`${pathImages}/${req.file.filename}`);
                    return res.status(403).json(output.Errors);
                }
                fs.unlinkSync(`${pathImages}/${userExits[0]?.avatar}`);
                res.status(200).json(userUpdated); 
            } catch (error) {
                console.log(error)
            }
        })
}


export const deleteUser = (req, res) => {
    try{
        
    } catch(error) {
        console.log(error);
    }
}
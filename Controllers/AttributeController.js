import config from '../config/config.js';
import connection from '../connection/index.js';
import pool from '../connection/index.js'
export const getAttributes = async(req, res) => {
    
}
 
export const createAttributes = async(req, res) => {
    
}

export const updateAttributes = async(req, res) => {

}
 
export const createCombineVariant = async(req, res) => {
    if(req.body.length === 0) return res.status(403).json('No variant');
    req.body.map((item) => {
        
    })
}
import mssql from 'mssql'; 
import config from '../config/config.js';

export const getCategory = async(req, res) => {
    try {
        await mssql.connect(config.SQLconfig);
        const result = await mssql.query(`SELECT * FROM CATEGORY`);
        if(result.recordset.length > 0) return res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error)
    }
}  

export const createCategory = async(req, res) => {
    try {
        await mssql.connect(config.SQLconfig);
        const result = await mssql.query(`INSERT INTO CATEGORY(nameCategory) 
                                        OUTPUT Inserted.id, Inserted.nameCategory,
                                        Inserted.createdAt, Inserted.updatedAt 
                                        VALUES(N'${req.body.category.toLowerCase()}')`);
        if(result.recordset.length > 0) return res.status(200).json(...result.recordset);
    } catch (error) {
        console.log(error);
    }
}


export const editCategory = async(req, res) => {
    try {
        await mssql.connect(config.SQLconfig);
        const result = await mssql.query(`UPDATE CATEGORY SET nameCategory = N'${req.body.category}', updatedAt = GETDATE() OUTPUT inserted.*  WHERE id = ${req.params.id}`)
        console.log(result)
        if(result.recordset?.length > 0) return res.status(200).json(...result.recordset);
    } catch (error) {
        console.log(error);
    } 
}


export const deleteCategory = async(req, res) => {
    try {
        await mssql.connect(config.SQLconfig);
        const result = await mssql.query(`DELETE CATEGORY OUTPUT deleted.* WHERE id = ${req.params.id}`);
        if(result.recordset?.length > 0) return res.status(200).json(...result.recordset);  
    } catch (error){
        console.log(error)  
    }
}
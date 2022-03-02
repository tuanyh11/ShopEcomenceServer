import config from '../config/config.js';
import connection from '../connection/index.js'

export const getCategory = async(req, res) => {
    connection.query('SELECT * FROM Categories', (err, result, fields) => {
        if(err) return res.status(404).json(err);
        res.status(200).json(result)
    })
}  

export const createCategory = async(req, res) => {
    if(!req.body.name) return res.status(403).json('something was wrong with your value');
    connection.query(`INSERT INTO Categories(name)  VALUES('${req.body.name}')`, (err, result, fields) => {
        if(err) return res.status(404).json(err);
        connection.query(`SELECT * FROM Categories WHERE id = ${result.insertId}`, (err, result, fields) => {
            if(err) return res.status(404).json(err)
            return res.status(200).json({...result[0]});
        })
    }) 
}


export const editCategory = async(req, res) => {
    if(!req.body.name) return res.status(403).json('something was wrong with your value');
    connection.query(`UPDATE Categories  SET name ='${req.body.name}' WHERE id = ${req.params.id}`, (err, result, fields) => {
        if(err) return res.status(404).json(err);
        connection.query(`SELECT * FROM Categories WHERE id = ${req.params.id}`, (err, result, fields) => {
            if(err) return res.status(404).json(err)
            return res.status(200).json({...result[0]});
        })
    }) 
}

 
export const deleteCategory = async(req, res) => {
   
}
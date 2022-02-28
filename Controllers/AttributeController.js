import mssql from 'mssql';
import config from '../config/config.js';

const pool = mssql.connect(config.SQLconfig);

export const getAttributes = async(req, res) => {
    try {
        let attribute = await mssql.query(`select * from Attribute where productId = ${req.params.id}`);
        
        for (let i = 0; i < attribute.recordset.length; i++) {
            attribute.recordset[i]['values'] = []
            const attrValue = await mssql.query(
            `select name from AttributeValue where attributeId = ${attribute.recordset[i].id}`
            );
            attrValue.recordset.forEach((item, index) => {
                attribute.recordset[i].values.push(item.name);
            })
        }
        if(attribute.recordset.length > 0) return res.status(200).json( attribute.recordset );
        res.status(403).json({messages: 'No item in database'});
    } catch (error) {
        console.log(error);
    }
}

export const createAttributes = async(req, res) => {
    try {
        let attributeValue = [];
        const attribute = await mssql.query(`
                insert into Attribute(name, productId) OUTPUT Inserted.id, Inserted.name, 
                Inserted.productId, Inserted.createdAt,  Inserted.updatedAt  
                VALUES('${req.body.name}', '${req.body.productId}') `);
        if(req.body.values.length > 0 && attribute.recordset.length > 0) {
            for (let i = 0; i < req.body.values.length; i++) {
                const {recordset} = await mssql.query(`
                insert into AttributeValue(name, attributeId) OUTPUT Inserted.id, Inserted.name, 
                Inserted.attributeId, Inserted.createdAt,  Inserted.updatedAt  
                VALUES('${req.body.values[i]}', '${attribute.recordset[0].id}') `);
                attributeValue.push(...recordset);
            }
            let attributeProduct = await mssql.query(`select * from Attribute where productId = ${req.body.productId}`);
        
            for (let i = 0; i < attribute.recordset.length; i++) {
                attributeProduct.recordset[i]['values'] = []
                const attrValue = await mssql.query(
                `select name from AttributeValue where attributeId = ${attributeProduct.recordset[i].id}`
                );
                attrValue.recordset.forEach((item, index) => {
                    attributeProduct.recordset[i].values.push(item.name);
                })
            }
            if(attributeProduct.recordset.length > 0) return res.status(200).json( attributeProduct.recordset);
        }
    
       
        res.status(404).json({messages: 'Something was wrong on server'});
    } catch (error) {
        console.log(error);
    } 
}

export const updateAttributes = async(req, res) => {

}

export const createCombineVariant = async(req, res) => {
    
}
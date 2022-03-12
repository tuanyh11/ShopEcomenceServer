import Attribute from '../models/Attribute.js';
import AttributeValue from '../models/AttributeValue.js';

export const getAttributes = async(req, res) => {
    console.log(req.body)
}
 
export const createAttributes = async(req, res) => {
    try {
        if(req.body.length === 0) return res.status(403).json({message: 'error'});
        const data = req.body.map(item => ({productId: item.productId, name: item.name}))
        const attributies = await Attribute.bulkCreate(data);
        const newResult = attributies.map((item, index) => ({attributeId: item.id, values: req.body[index].values}));
        const attValue = newResult.reduce((temp ,item) => temp.concat(...item.values.map((item2) => ({attributeId: item.attributeId, name: item2}))), []);
        console.log(attValue)
    } catch (error) {
        res.status(401).json({message: 'error', result: error});
        console.log(error)
    }
}

export const updateAttributes = async(req, res) => {

}
 
export const createCombineVariant = async(req, res) => {
   
}
import config from '../config/config.js';
import Categories from '../models/Categories.js';

export const getCategory = async(req, res) => {
   try {
       const categories = await Categories.findAll();
       res.status(200).json({message: 'successed', result: categories});
   } catch (error) {
        res.status(401).json({message: 'error', result: error});
   }
}  

export const createCategory = async(req, res) => {
   try {
       const newCategory = await Categories.create(req.body);
       res.status(200).json({message: 'successed', result: newCategory});
   } catch (error) { 
        res.status(401).json({message: 'error', result: error});
   }
}


export const editCategory = async(req, res) => {
    try {
        const editUser = await Categories.update({name: req.body.name}, {where: {id: req.body.id}});
        res.status(200).json(({message: 'successed'}));
    } catch (error) {
        res.status(401).json({message: 'error', result: error});
    }
}

 
export const deleteCategory = async(req, res) => {
    try {
        await Categories.destroy({where: {id: req.params.id}});
        res.status(200).json(({message: 'successed'}));
    } catch (error) {
        res.status(401).json({message: 'error', result: error});
    }
}
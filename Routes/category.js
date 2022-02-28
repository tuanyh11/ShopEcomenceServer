import { Router } from "express";
import {getCategory, createCategory, editCategory, deleteCategory} from '../Controllers/CategoryController.js';
const router = Router();
 
router.get('/', getCategory);
router.post('/', createCategory);
router.patch('/:id', editCategory);
router.delete('/:id', deleteCategory);
 
export default router;
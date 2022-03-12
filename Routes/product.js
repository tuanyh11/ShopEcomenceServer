import { Router } from 'express';
import { createProduct, getProduct } from '../Controllers/ProductController.js';
import { checkOneFile } from '../middleware/checkFile.js';

const router = Router();

router.post('/', checkOneFile('image'), createProduct);
router.get('/:id', getProduct);

export default router;
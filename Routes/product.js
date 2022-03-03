import { Router } from 'express';
import { createProduct } from '../Controllers/ProductController.js';
import { checkOneFile } from '../middleware/checkFile.js';

const router = Router();

router.post('/', checkOneFile('image'), createProduct);

export default router;
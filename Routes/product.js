import {Router} from 'express';
import { createProduct } from '../Controllers/ProductController.js';

const router = Router();

router.post('/', createProduct);

export default router;
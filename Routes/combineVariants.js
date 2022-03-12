import { Router } from "express";
import { createCombineVariant } from "../Controllers/CombineVariantController.js";
const router = Router();


router.post('/:id', createCombineVariant);


export default router;
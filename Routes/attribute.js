import {Router } from "express";
import { getAttributes, createAttributes, updateAttributes } from "../Controllers/AttributeController.js";

const router = Router();

router.get("/:id", getAttributes);
router.post("/", createAttributes)
router.patch("/", updateAttributes);

export default router; 
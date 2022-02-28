import { Router } from "express";
import { createUser, getUsers, getUser, updateUser } from "../Controllers/UserController.js";

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id',  updateUser);

export default router;
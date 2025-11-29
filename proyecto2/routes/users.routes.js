import { Router } from "express";
import { auth } from "../utils/auth.js";
import {
  createUser,
  login,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/users.controlador.js";

const router = Router();

router.post("/", createUser);
router.post("/login", login);

router.get("/", auth, getUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;

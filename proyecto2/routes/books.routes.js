import { Router } from "express";
import { auth } from "../utils/auth.js";
import {
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook
} from "../controllers/books.controlador.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);

router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

export default router;

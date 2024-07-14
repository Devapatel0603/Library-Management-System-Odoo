import express from 'express';
import {createBook, updateBook, deleteBook, getAllBooks, searchbooks} from '../controllers/book.controller.js'
import {authorizeRole } from '../middlewares/auth';

const router = express.Router();

router.route("/books").get(getAllBooks);
router.route("/librarian/book/new").post(authorizeRole("user"), authorizeRole("admin"), createBook);
router.route("/librarian/book/:id").put(authorizeRole("user"), authorizeRole("admin"), updateBook).delete(authorizeRole("user"), authorizeRole("admin"), deleteBook);
router.route("/searchBooks").get(searchbooks);

module.exports = router;   
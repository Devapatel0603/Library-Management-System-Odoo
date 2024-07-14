import express from 'express';
import {createBook, updateBook, deleteBook, getAllBooks, searchbooks} from '../controllers/book.controller.js'
import { isLoggedin, authorizeRole } from '../middlewares/auth';

const router = express.Router();

router.route("/books").get(getAllBooks);
router.route("/librarian/book/new").post(isLoggedin, authorizeRole("admin"), createBook);
router.route("/librarian/book/:id").put(isLoggedin, authorizeRole("admin"), updateBook).delete(isLoggedin, authorizeRole("admin"), deleteBook);
router.route("/searchBooks").get(searchbooks);

module.exports = router;   
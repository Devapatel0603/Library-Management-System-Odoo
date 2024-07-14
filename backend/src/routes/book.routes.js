import { Router } from "express";
import {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    searchbooks,
} from "../controllers/book.controller.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = Router();

//Get All Books
router.route("/books").get(getAllBooks);

//Add New Books
router
    .route("/librarian/book/new")
    .post(authorizeRole("librarian"), createBook);

//Update And Delete Book
router
    .route("/librarian/book/:_id")
    .put(authorizeRole("librarian"), updateBook)
    .delete(authorizeRole("librarian"), deleteBook);

//Search Book
router.route("/searchBooks").get(searchbooks);

export default router;

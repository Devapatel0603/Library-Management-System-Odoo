import { Router } from "express";
import {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    searchbooks,
    sendBookRequest,
    getRequests,
    acceptBookRequest,
    rejectBookRequest,
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

//Send Book Request
router
    .route("/send/request/:_id")
    .post(authorizeRole("user", "librarian", "admin"), sendBookRequest);

//Accept Book Request
router
    .route("/accept/request")
    .get(authorizeRole("librarian"), acceptBookRequest);

//Reject Book Request
router
    .route("/reject/request")
    .post(authorizeRole("librarian"), rejectBookRequest);

//Get All Book Requests
router.route("/get/requests").post(authorizeRole("librarian"), getRequests);

export default router;

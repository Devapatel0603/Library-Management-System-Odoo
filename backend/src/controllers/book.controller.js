import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Book from "../models/book.model.js";
import { fetchBook } from "../utils/fetchBook.js";
import mongoose from "mongoose";
import Request from "../models/request.model.js";
import UserBook from "../models/userBooks.model.js";

const errorOptions = [
    {
        type: mongoose.Error.CastError,
        statusCode: 400,
        message: "Provide enter valid id",
    },
];

// Get All Books
export const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        data: books,
    });
});

// Create a new Product -- Librarian
export const createBook = asyncHandler(async (req, res) => {
    const { isbn: ISBN, quantity, genre } = req.body;

    if (!ISBN || !quantity || !genre) {
        throw new ErrorHandler("Please, provide all details", 400);
    }

    if (ISBN.toString().length < 13) {
        throw new ErrorHandler("Please, enter valid ISBN number", 400);
    }

    const existedBook = await Book.findOne({ ISBN: ISBN });

    if (existedBook) {
        throw new ErrorHandler("Book already exist", 400);
    }

    const newBook = await fetchBook(ISBN);

    const book = await Book.create({
        ISBN,
        quantity,
        genre,
        librarianId: req.user._id,
        title: newBook.items[0].volumeInfo.title,
        publishedDate: newBook.items[0].volumeInfo.publishedDate,
        authors: newBook.items[0].volumeInfo.authors,
        description: newBook.items[0].volumeInfo.description,
        textSnippet: newBook.items[0].searchInfo.textSnippet,
        smallThumbnail: newBook.items[0].volumeInfo.imageLinks.smallThumbnail,
        thumbnail: newBook.items[0].volumeInfo.imageLinks.thumbnail,
    });

    res.status(201).json({
        success: true,
        book,
    });
});

// Update a Book -- Librarian
export const updateBook = asyncHandler(async (req, res) => {
    let book = await Book.findById(req.params.id);
    if (!book) {
        throw new ErrorHandler("Product Not Found", 404);
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        book,
    });
});

// Delete Product -- Librarian
export const deleteBook = asyncHandler(async (req, res) => {
    let book = await Book.findById(req.params._id);

    if (!book) {
        throw new ErrorHandler("Product Not Found", 404);
    }

    await Book.deleteOne(req.params.id);

    // await product.remove();

    res.status(200).json({
        success: true,
        message: "Book deleted",
    });
}, errorOptions);

//Search Book
export const searchbooks = asyncHandler(async (req, res) => {
    const search = req.query.search;

    // Check if search query is provided
    if (!search) {
        return res.status(400).json({
            success: false,
            message: "Search query is required",
        });
    }

    // Search for books
    const books = await Book.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { genre: { $regex: search, $options: "i" } },
        ],
    });

    res.status(200).json({
        success: true,
        books: books,
    });
});

//Send Request
export const sendBookRequest = asyncHandler(async (req, res) => {
    const _id = req.param._id;

    const request = await Request.create({
        user: req.user._id,
        book: _id,
    });

    res.status(200).json({
        success: true,
        message: "Request sent Successfully",
    });
});

//Get All Request
export const getRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find();
    res.status(200).json({
        success: true,
        requests,
    });
});

//Accept Request
export const acceptBookRequest = asyncHandler(async (req, res) => {
    const _id = req.params._id;

    const request = await Request.findById(_id);

    if (!request) {
        throw new ErrorHandler("Request not exist", 400);
    }

    const userBook = await UserBook.create({
        user: req.user._id,
        book: _id,
        expires,
    });

    const deleteRequest = await Request.deleteOne(_id);

    res.status(200).json({
        success: true,
        message: "Request accept",
    });
});

export const rejectBookRequest = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
    });
});

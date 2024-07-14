import { ErrorHandler } from "../utils/errorHandler.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import Book from "../models/book.model.js"

// Get All Books
export const getAllBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        data: books
    });
});

// Create a new Product -- Librarian
export const createBook = asyncHandler(async (req, res, next) => {

    req.body.user = req.user.id;

    const book = await Book.create(req.body);

    res.status(201).json({
        success: true,
        book
    });
});

// Update a Book -- Librarian
export const updateBook = asyncHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id);
    if (!book) {
        throw new ErrorHandler("Product Not Found", 404);
    };

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        book
    });
});

// Delete Product -- Librarian
export const deleteProduct = asyncHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id);
    if (!book) {
        throw new ErrorHandler("Product Not Found", 404);
    };

    await Book.findByIdAndDelete(req.params.id);

    // await product.remove();

    res.status(200).json({
        success: true,
        message: "Book deleted"
    });
});


export const searchbooks = asyncHandler(async (req, res, next) => {
    const query = req.query.search;

    const books = await Book.find({$or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i"}},
        { genre: { $regex: search, $options: "i"}},
    ]});

    res.status(200).json({
        success: true,
        data: books
    });
});
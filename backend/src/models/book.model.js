import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        ISBN: {
            type: Number,
            unique: true,
            required: [true, "Plz enter Book Id"],
        },
        title: {
            type: String,
            required: [true, "Plz enter book Title"],
        },
        publisher: {
            type: String,
            default: "Odoo",
            required: [true, "Plz enter publisher name"],
        },
        authors: [
            {
                type: String,
                required: [true, "Plz enter publisher name"],
            },
        ],
        pubishedDate: {
            type: Number,
            default: 2024,
        },
        quantity: {
            type: Number,
            required: [true, "Plz enter quantity of book"],
            default: 1,
        },
        librarianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        genre: {
            type: String,
            required: [true, "Plz enter book genre"],
        },
        description: {
            type: String,
            required: true,
        },
        textSnippet: {
            type: String,
            required: true,
        },
        smallThumbnail: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;

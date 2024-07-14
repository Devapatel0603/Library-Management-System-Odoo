import mongoose from "mongoose";

const userBooksSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        expire: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const UserBook = mongoose.model("UserBook", userBooksSchema);

export default UserBook;

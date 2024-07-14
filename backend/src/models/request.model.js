import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
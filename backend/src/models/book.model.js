// ISBN, title, author, publisher, year, genre, quantity.

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {
        type: number,
        required: [true, "Plz enter Book Id"],
    },
    title: {
        type: String,
        required: [true, "Plz enter book Title"],
    },
    publisher: {
        type: String,
        required: [true, "Plz enter publisher name"]
    },
    year: {
        type: Number,
        default: 2024
    },
    quantity: {
        type: Number,
        required: [true, "Plz enter quantity of book"],
        default : 1
    },
    
    librarianId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    genre : {
        type: String,
        required: [true, "Plz enter book genre"]
    },

    createdAt :{
        type: Date,
        default: Date.now
    }
}) 

module.exports = mongoose.model('Book', bookSchema);
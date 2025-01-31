const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   book: {
        type: String,
        require: true,
        trim: true
    },

    description: {
        type: String,
        require: true
    },
   author: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    delivery: {
        type: String,
        require: true
    },
  genre: {
        type: String,
        require: true
    },
    rating: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: false
    },
})
const book = mongoose.model('bookdetails', bookSchema)

module.exports = book
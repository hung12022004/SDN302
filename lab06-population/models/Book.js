const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Book', bookSchema);
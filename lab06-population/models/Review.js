const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
});

module.exports = mongoose.model('Review', reviewSchema);
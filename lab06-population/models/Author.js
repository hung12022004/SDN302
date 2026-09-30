const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Yêu cầu 3: Virtual populate lấy danh sách sách của tác giả
authorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
});

module.exports = mongoose.model('Author', authorSchema);
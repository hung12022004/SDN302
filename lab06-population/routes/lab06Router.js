const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Category = require('../models/Category');
const Book = require('../models/Book');
const Review = require('../models/Review');

// 1. API Tạo dữ liệu mẫu tự động (Seed Data)
router.post('/seed', async (req, res) => {
    try {
        await Promise.all([Author.deleteMany(), Category.deleteMany(), Book.deleteMany(), Review.deleteMany()]);

        const author1 = await Author.create({ name: 'Robert C. Martin', country: 'USA' });
        const author2 = await Author.create({ name: 'Haruki Murakami', country: 'Japan' });

        const catIT = await Category.create({ name: 'Information Technology' });
        const catLit = await Category.create({ name: 'Literature' });

        const book1 = await Book.create({ title: 'Clean Code', price: 45, author: author1._id, category: catIT._id });
        const book2 = await Book.create({ title: 'Norwegian Wood', price: 25, author: author2._id, category: catLit._id });

        const rev1 = await Review.create({ reviewerName: 'Alice', rating: 5, comment: 'Must read!', book: book1._id });
        const rev2 = await Review.create({ reviewerName: 'Bob', rating: 3, comment: 'A bit long', book: book1._id });
        const rev3 = await Review.create({ reviewerName: 'Charlie', rating: 4, comment: 'Very helpful', book: book1._id });

        book1.reviews.push(rev1._id, rev2._id, rev3._id);
        await book1.save();

        res.status(201).json({ message: 'Tạo dữ liệu mẫu Lab 06 thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Yêu cầu 2: Lấy danh sách sách CHƯA Populate (Trả về ObjectId thô)
router.get('/books/raw', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// 3. Yêu cầu 2: Populate 2 đường dẫn (author, category) và dùng select giới hạn trường
router.get('/books/populated', async (req, res) => {
    const books = await Book.find()
        .populate('author', 'name -_id')
        .populate('category', 'name -_id');
    res.json(books);
});

// 4. Yêu cầu 3: Populate nâng cao (match, options sort + limit, nested populate)
router.get('/books/advanced', async (req, res) => {
    const books = await Book.find()
        .populate({
            path: 'author',
            match: { country: 'USA' }, // Chỉ lấy tác giả ở USA (Tác giả ở Japan sẽ bị null)
            select: 'name country'
        })
        .populate({
            path: 'reviews',
            options: { sort: { rating: -1 }, limit: 2 }, // Sắp xếp điểm giảm dần, chỉ lấy 2 review
            populate: { path: 'book', select: 'title' }  // Nested populate: Từ review lấy ngược lại tên sách
        });
    res.json(books);
});

// 5. Yêu cầu 3: Virtual Populate (Lấy danh sách tác giả kèm các cuốn sách họ đã viết)
router.get('/authors/virtual-books', async (req, res) => {
    const authors = await Author.find().populate('books', 'title price');
    res.json(authors);
});

module.exports = router;
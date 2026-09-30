const express = require('express');
const router = express.Router();

// Dữ liệu mẫu (In-memory array)
let books = [
    { id: 1, title: "BookNest Basics", price: 20, category: "IT" }
];
let nextId = 2;
const validCategories = ["IT", "Science", "History"];

// Middleware xác thực dữ liệu đầu vào (Validation)
const validateBook = (req, res, next) => {
    const { title, price, category } = req.body;
    if (!title) return res.status(400).json({ error: "Title là bắt buộc" });
    if (typeof price !== 'number' || price <= 0) return res.status(400).json({ error: "Price phải là số dương" });
    if (!validCategories.includes(category)) return res.status(400).json({ error: `Category phải thuộc: ${validCategories.join(', ')}` });
    next();
};

// 1. GET - Lấy danh sách
router.get('/', (req, res) => res.status(200).json(books));

// 2. GET by ID - Lấy chi tiết
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Không tìm thấy sách" });
    res.status(200).json(book);
});

// 3. POST - Tạo mới
router.post('/', validateBook, (req, res) => {
    const newBook = { id: nextId++, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. PUT - Cập nhật
router.put('/:id', validateBook, (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Không tìm thấy sách" });
    books[index] = { id: books[index].id, ...req.body };
    res.status(200).json(books[index]);
});

// 5. DELETE - Xóa
router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Không tìm thấy sách" });
    books.splice(index, 1);
    res.status(200).json({ message: "Xóa thành công" });
});

module.exports = router;
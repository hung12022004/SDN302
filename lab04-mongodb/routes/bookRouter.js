const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB } = require('../db');
const router = express.Router();

// Lấy danh sách Books (Có Filter, Search, Pagination)
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('books');

        // Xây dựng câu truy vấn nâng cao
        let query = {};
        if (req.query.category) query.category = req.query.category;
        if (req.query.keyword) query.title = { $regex: req.query.keyword, $options: 'i' };
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        // Phân trang
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await collection.countDocuments(query);
        const books = await collection.find(query).skip(skip).limit(limit).toArray();

        res.status(200).json({ total, page, data: books });
    } catch (error) {
        res.status(500).json({ error: "Lỗi máy chủ nội bộ", details: error.message });
    }
});

// Lấy sách theo ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });
        if (!book) return res.status(404).json({ error: "Không tìm thấy sách" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: "Lỗi định dạng ID hoặc lỗi server", details: error.message });
    }
});

// Tạo mới sách
router.post('/', async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection('books').insertOne(req.body);
        res.status(201).json({ _id: result.insertedId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lưu sách", details: error.message });
    }
});

// Cập nhật sách
router.put('/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection('books').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: "Không tìm thấy sách" });
        res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi cập nhật", details: error.message });
    }
});

// Xóa sách
router.delete('/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "Không tìm thấy sách" });
        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi xóa", details: error.message });
    }
});

module.exports = router;
const Book = require('../models/Book');

// 1. Create
exports.create = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) { next(err); }
};

// 2. GetAll (Dùng find, select, sort, limit)
exports.getAll = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;

        const books = await Book.find(filter)
            .select('title slug price category quantity inStock isbn publishedYear')
            .sort({ price: -1 })
            .limit(Number(req.query.limit) || 10);

        res.status(200).json(books);
    } catch (err) { next(err); }
};

// 3. GetById (Kèm gọi thử Instance Method)
exports.getById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Không tìm thấy sách (404)' });
        res.status(200).json({
            ...book.toJSON(),
            availabilityStatus: book.checkAvailability()
        });
    } catch (err) { next(err); }
};

// 4. Update (Dùng new: true và runValidators: true)
exports.update = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) return res.status(404).json({ error: 'Không tìm thấy sách (404)' });
        res.status(200).json(book);
    } catch (err) { next(err); }
};

// 5. Remove
exports.remove = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Không tìm thấy sách (404)' });
        res.status(200).json({ message: 'Xóa sách thành công' });
    } catch (err) { next(err); }
};

// Endpoint phụ: Gọi Static Method findByCategory
exports.getByCategoryStatic = async (req, res, next) => {
    try {
        const books = await Book.findByCategory(req.params.cat);
        res.status(200).json(books);
    } catch (err) { next(err); }
};
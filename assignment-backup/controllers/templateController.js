const Sample = require('../models/TemplateModel');

// 1. CREATE
exports.create = async (req, res, next) => {
    try {
        const doc = await Sample.create(req.body);
        res.status(201).json(doc);
    } catch (err) { next(err); }
};

// 2. GET ALL (Tích hợp sẵn Tìm kiếm, Lọc khoảng giá, Phân trang & Populate)
exports.getAll = async (req, res, next) => {
    try {
        let query = {};
        // Lọc theo trường chính xác
        if (req.query.status) query.status = req.query.status;
        // Tìm kiếm theo từ khóa không phân biệt hoa thường ($regex)
        if (req.query.keyword) query.title = { $regex: req.query.keyword, $options: 'i' };
        // Lọc theo khoảng số (minPrice, maxPrice)
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        // Phân trang
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Sample.countDocuments(query);
        const data = await Sample.find(query)
            // .populate('author', 'name -_id') // Bỏ comment dòng này nếu cần Populate (Lab 6)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ total, page, data });
    } catch (err) { next(err); }
};

// 3. GET BY ID
exports.getById = async (req, res, next) => {
    try {
        const doc = await Sample.findById(req.params.id);
        // .populate('author'); // Bỏ comment nếu cần Populate
        if (!doc) return res.status(404).json({ error: 'Không tìm thấy dữ liệu (404)' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

// 4. UPDATE (Có new: true và runValidators: true)
exports.update = async (req, res, next) => {
    try {
        const doc = await Sample.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!doc) return res.status(404).json({ error: 'Không tìm thấy dữ liệu (404)' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

// 5. DELETE
exports.remove = async (req, res, next) => {
    try {
        const doc = await Sample.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ error: 'Không tìm thấy dữ liệu (404)' });
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (err) { next(err); }
};
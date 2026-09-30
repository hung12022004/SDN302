module.exports = (err, req, res, next) => {
    // 1. Lỗi Validation của Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));
        return res.status(400).json({ error: 'Validation Error', details: errors });
    }

    // 2. Lỗi sai định dạng ObjectId (CastError)
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `ID không hợp lệ: ${err.value}` });
    }

    // 3. Lỗi trùng lặp giá trị unique (Duplicate key 11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ error: `Giá trị của trường '${field}' đã tồn tại!` });
    }

    res.status(500).json({ error: 'Lỗi máy chủ nội bộ', message: err.message });
};
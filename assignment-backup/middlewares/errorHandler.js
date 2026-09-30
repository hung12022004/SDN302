module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }));
        return res.status(400).json({ error: 'Validation Error', details: errors });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `Invalid ID format: ${err.value}` });
    }
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ error: `Duplicate value for field: '${field}'` });
    }
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
};
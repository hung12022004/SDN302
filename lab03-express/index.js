require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/bookRouter');

const app = express();
// Đọc port từ biến môi trường, mặc định 3000
const PORT = process.env.PORT || 3000;

// Built-in & Third-party Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Log request bằng Morgan

// Custom Logger Middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        console.log(`[Custom Log] ${req.method} ${req.originalUrl} - ${Date.now() - start}ms`);
    });
    next();
});

// Các Route cơ bản
app.get('/', (req, res) => res.send('Welcome to BookNest Express Application!'));
app.get('/health', (req, res) => res.json({ status: 'OK', uptime: process.uptime() }));

// Route tạo lỗi cố ý để test Error Handler
app.get('/error', (req, res, next) => {
    next(new Error("Đây là lỗi server cố ý được ném ra!"));
});

// Application-level Middleware (Chỉ áp dụng cho /api/books)
const requireApiKey = (req, res, next) => {
    if (!req.headers['x-api-key']) {
        return res.status(401).json({ error: "Unauthorized: Missing x-api-key header" });
    }
    next();
};

// Gắn Router vào đường dẫn
app.use('/api/books', requireApiKey, bookRouter);

// 404 Middleware (Xử lý route không tồn tại)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route không tồn tại (404 Not Found)" });
});

// Central Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || "Lỗi máy chủ nội bộ (500)" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
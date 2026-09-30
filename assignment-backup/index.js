require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
connectDB();

app.use(express.json());
app.use(morgan('dev'));

// --- NƠI KHAI BÁO ROUTES KHI ĐI THI ---
// const bookRouter = require('./routes/bookRouter');
// app.use('/api/books', bookRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bookRouter = require('./routes/bookRouter');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/books', bookRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Lab 05 Server running on port ${PORT}`));
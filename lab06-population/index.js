require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const lab06Router = require('./routes/lab06Router');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', lab06Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Lab 06 Server running on port ${PORT}`));
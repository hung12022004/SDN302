const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB with Mongoose successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Thoát ứng dụng an toàn khi không kết nối được DB
    }
};

module.exports = connectDB;
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db('booknest');
        console.log('Connected to MongoDB');
    }
    return db;
}

module.exports = { connectDB };
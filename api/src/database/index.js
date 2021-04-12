const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) throw new Error('Missing environment variable MONGODB_URI!');

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (...args) => console.error('Error connecting to MongoDB!', ...args));
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

module.exports = db;

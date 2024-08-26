const mongoose = require('mongoose');
require('dotenv').config();

// For local 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

//mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;

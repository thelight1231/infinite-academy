const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Config loaded:', {
            MONGODB_URI: config.MONGODB_URI,
            NODE_ENV: config.NODE_ENV
        });
        
        if (!config.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in config');
        }

        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error Details:');
        console.error('Error Message:', err.message);
        console.error('Stack Trace:', err.stack);
        process.exit(1);
    }
};

module.exports = connectDB;
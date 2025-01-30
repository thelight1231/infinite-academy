const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const config = require('./config/config');

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5000', 'https://infinite-academy.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};
app.use(cors(corsOptions));

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'", 'http://localhost:3000', 'https://infinite-academy.onrender.com']
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
}));
app.use(compression());

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Serve static files in production
if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Routes
app.use('/api/auth', authRoutes);
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Handle SPA routing - This should be after all API routes
if (config.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
    });
}

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${config.NODE_ENV}`);
});

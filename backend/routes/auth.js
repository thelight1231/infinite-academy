const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRE }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRE }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
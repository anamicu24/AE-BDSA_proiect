const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');
const { isValidToken } = require('../utils');  

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
        where: {
            email
        }
    });

    if (!existingUser) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = bcrypt.compareSync(password, existingUser.password);

    if (!isValidPassword) {
        return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign(
        { id: existingUser.id, role: existingUser.role },
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, message: 'Authentication successful', data: { token } });
});


router.post('/check', async (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token not found' });
    }

    const validToken = isValidToken(token);

    if (!validToken) {
        return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    res.status(200).json({ success: true, message: 'Token is valid' });
});

module.exports = router;

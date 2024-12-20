const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    const token = bearerToken ? bearerToken.split(' ')[1] : null;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token not provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isValidToken = (token) => {
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { verifyToken, isValidToken };

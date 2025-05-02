// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Includes email, userId, role
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

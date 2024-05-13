// middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'Token is not provided' });
    }

    jwt.verify(token,'limac', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token'});
        }
        req.user = decoded;
        next();
    });
}

module.exports = { verifyToken };

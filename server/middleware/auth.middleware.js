const jwt = require('jsonwebtoken');

module.exports.Auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token && token.split(' ')[0] === 'Bearer') {
            jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
                if (err) {
                    res.status(403).json({ error: 'Token is not valid!!' });
                } else {
                    next();
                }
            });
        }
    } catch (err) {
        res.status(500).json({ error: 'Permission Denied' });
    }
};

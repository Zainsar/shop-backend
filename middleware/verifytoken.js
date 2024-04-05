const jwt = require('jsonwebtoken')

const verifytoken = (req, res, next) => {
    const authheader = req.headers.token;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token is not valid!'
                });
            }
            req.User = user;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'You are not authenticated'
        });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifytoken(req, res, () => {
        if (req.User.id === req.params.id || req.User.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: 'You are not allowed to do that!'
            });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifytoken(req, res, () => {
        if (req.User.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: 'You are not allowed to do that!'
            });
        }
    });
};

module.exports = { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin };

const config = require("../../config/index.js");
const { verifyToken } = require("../utils/jwt.js");

exports.isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            req.user = verifyToken(token, config.secretKey);
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        next(error);
    }
};
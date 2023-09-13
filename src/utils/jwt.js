const jwt = require("jsonwebtoken");
const { verify, sign } = jwt;
const config = require("../../config");

exports.generateToken = (data) => {
    return sign(data, config.secretKey, {
        expiresIn: "24h",
    });
};

exports.verifyToken = (token, callback) => {
    return verify(token, config.secretKey, callback);
};
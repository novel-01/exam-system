const { customError } = require('../utils/custom.error');

exports.errorHandler = (err, req, res) => {
    if (err instanceof customError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
    }
    return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
    });
};
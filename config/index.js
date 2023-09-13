require('dotenv').config();

const config = {
    port: process.env.PORT,
    secretKey: process.env.JWT_SECRET,
    dbUrl: process.env.DB_URl
}

module.exports = config;
const errorHandler = require('./errHandler.middleware');
const isAuth = require('./isAuth.middleware');
const isAdmin = require('./isAdmin.middleware');

module.exports = {errorHandler, isAdmin, isAuth};
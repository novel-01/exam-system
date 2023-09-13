const userRouter = require('./user.route');
const examRouter = require('./exam.route');
const groupRouter = require('./group.route');
const examResRouter = require('./result.route');

module.exports = [userRouter, groupRouter, examRouter, examResRouter];
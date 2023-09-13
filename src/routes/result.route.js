const express = require("express");
const examResRouter = express.Router();

const {
    sendResult,
    getExamResults,
} = require("../controllers/result.controller");
const {isAuth} = require("../middlewares");

examResRouter.post("/exam/result", isAuth,  sendResult);
examResRouter.get("/exam/results/:id", isAuth, getExamResults);

module.exports = examResRouter;
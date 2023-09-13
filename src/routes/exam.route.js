const examRouter = require('express').Router();

const {
    create,
    getAllExam,
    getOneExam
} = require("../controllers/exam.controller.js");

const { isAuth } = require("../middlewares/isAuth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

examRouter.post("/exam", isAuth, isAdmin, create);
examRouter.put("/exam/:id", isAuth, isAdmin);
examRouter.get("/exam/:id", isAuth, isAdmin, getOneExam);
examRouter.get("/exams", isAuth, isAdmin, getAllExam);
examRouter.delete("/exam/:id", isAuth, isAdmin);

module.exports = examRouter;
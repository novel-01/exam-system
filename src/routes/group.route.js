const groupRouter = require('express').Router();

const {
    create,
    getAllGroup,
    getOneGroup,
    removeGroup,
    joinGroup
} = require("../controllers/group.controller.js");

const { isAuth } = require("../middlewares/isAuth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

groupRouter.post("/group", isAuth, isAdmin, create);
groupRouter.get("/groups/:id", isAuth, isAdmin, getOneGroup);
groupRouter.get("/groups", isAuth, isAdmin, getAllGroup);
groupRouter.put("/groups/:id", isAuth, isAdmin);
groupRouter.delete("/groups/:id", isAuth, isAdmin, removeGroup);
groupRouter.post("/group/join", isAuth, isAdmin, joinGroup);

module.exports = groupRouter;
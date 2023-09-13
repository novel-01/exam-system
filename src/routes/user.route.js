const userRouter = require('express').Router();

const {
    createUser,
    getAllUsers,
    getOneUser,
    login,
    remove,
    update,
} = require("../controllers/user.controller.js");

userRouter.post("/user", createUser);
userRouter.put("/user/:id", update);
userRouter.get("/users", getAllUsers);
userRouter.get("/user/:id", getOneUser);
userRouter.delete("/user/:id", remove);
userRouter.post("/auth/login", login);

module.exports = userRouter;
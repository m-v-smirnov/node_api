const express = require("express");
const userController = require("../controllers/userController"); 
const userRouter = express.Router();

userRouter.get("/register", userController.showCreateUser);
userRouter.post("/register", userController.createUser);
userRouter.post("/edit", userController.editUser);
userRouter.post("/delete", userController.deleteUser);

module.exports = userRouter;
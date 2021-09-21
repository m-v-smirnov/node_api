const express = require("express");
const userController = require("../controllers/userController"); 
const userRouter = express.Router();


userRouter.put("/", userController.createUser);
userRouter.patch("/", userController.editUser);
userRouter.delete("/", userController.deleteUser);

module.exports = userRouter;
const express = require("express");
const userController = require("../controllers/userController"); 
const middlewares = require('../middlewares/index');
const userRouter = express.Router();

//jwt verify middleware
//userRouter.use(middlewares.checkUserToken); 
userRouter.post("/", userController.createUser);
userRouter.patch("/", userController.editUser);
userRouter.delete("/", userController.deleteUser);
userRouter.post("/user", userController.loginUser);

module.exports = userRouter;
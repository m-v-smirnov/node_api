const express = require("express");
const userController = require("../controllers/userController"); 
const userRouter = express.Router();

//jwt verify middleware
//userRouter.use(userController.checkUserToken); 
userRouter.put("/", userController.createUser);
userRouter.patch("/", userController.editUser);
userRouter.delete("/", userController.deleteUser);
userRouter.post("/user", userController.loginUser);

module.exports = userRouter;
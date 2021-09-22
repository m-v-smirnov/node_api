const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const {emailPassIsValid} = require('../middlewares/index');

userRouter.patch("/",emailPassIsValid, userController.editUser);
userRouter.delete("/", userController.deleteUser);

module.exports = userRouter;
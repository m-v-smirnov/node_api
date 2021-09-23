"use strict";
const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const {emailPassIsValid} = require('../middlewares/index');
const middlewares = require('../middlewares/index');

userRouter.patch("/",middlewares.checkUserToken, emailPassIsValid, userController.editUser);
userRouter.delete("/",middlewares.checkUserToken, userController.deleteUser);

module.exports = userRouter;
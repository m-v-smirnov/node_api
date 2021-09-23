"use strict";
const express = require("express");
const authController = require("../controllers/authController");
const middlewares = require('../middlewares/index');
const {emailPassIsValid} = require('../middlewares/index');
const authRouter = express.Router();


authRouter.post("/reg",emailPassIsValid, authController.createUser);
authRouter.post("/login", authController.loginUser);
authRouter.post("/login-token",  middlewares.checkUserToken, authController.loginUserByToken);


module.exports = authRouter;
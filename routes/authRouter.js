const express = require("express");
const authController = require("../controllers/authController");
const middlewares = require('../middlewares/index');
const {emailPassIsValid} = require('../middlewares/index');
const authRouter = express.Router();


authRouter.post("/reg",emailPassIsValid, authController.createUser);
authRouter.post("/login", authController.loginUser);
authRouter.use("/login-token", middlewares.checkUserToken);
authRouter.post("/login-token", authController.loginUserByToken);


module.exports = authRouter;
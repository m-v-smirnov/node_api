"use strict";
require('dotenv').config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const db = require('./models/index');


const app = express();

db.sequelize.sync().then(() => {
  app.listen(3000, function (err) {
    if (err) {
      console.log('Server is not started', err.message)
    } else {
      console.log("Server started...");
    }
  });
}).catch(err => {
  console.log(`Server starting error: ${err}`);
});

app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouter);
app.use("/auth", authRouter);
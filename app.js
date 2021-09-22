// const Sequelize = require("sequelize");
const express = require("express");
const userRouter = require("./routes/userRouter");
const db = require('./models/index');

const app = express();

// const sequelize = new Sequelize(
//   "nodeApi_userDb",
//   "postgres",
//   "fusion",
//   {
//     dialect: "postgres",
//     define: {
//       timestamps: false
//     }
//   });

db.sequelize.sync().then(()=>{
  app.listen(3000, function(err){
    if (err) {
      console.log('Server is not started', err.message)
    } else {
      console.log("Server started...");
    }
  });
}).catch(err=> {
  console.log(`Ошибка при запуске сервера: ${err}`);
});

app.use(express.urlencoded({ extended: false }));
app.use("/users",userRouter);
const Sequelize = require("sequelize");
const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.urlencoded({ extended: false }));

const sequelize = new Sequelize(
  "nodeApi_userDb",
  "postgres",
  "fusion",
  {
    dialect: "postgres",
    define: {
      timestamps: false
    }
  });

sequelize.sync().then(()=>{
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


app.use("/users",userRouter);
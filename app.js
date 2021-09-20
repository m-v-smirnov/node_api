const Sequelize = require("sequelize");
const userModel = require("./models/user");
const express = require("express");

const app = express();
const urlencodedParser = express.urlencoded({extended: false});

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
const User = sequelize.define("user",userModel);

sequelize.sync().then(()=>{
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));

app.get("/register", function(req, res) {
  res.send("register page soon...");
});
app.post("/register", urlencodedParser, function(req,res){
  if(!req.body) return res.sendStatus(400);

  const fullName = req.body.fullName;
  const email = req.body.email;
  const dob = req.body.dob;
  const password = req.body.password;

  User.findOne({where: {email: email}, raw: true})
  .then(user => {
    if(user) return res.send("Пользователь с таким e-mail уже существует");
    User.create ({
      fullName,
      email,
      dob,
      password
    }).then(res=>{
      console.log(res);
      res.send(`Добавлен новый пользователь: ${fullname}`);
    }).catch(err=>console.log(err));
  }).catch(err => console.log(err));

});
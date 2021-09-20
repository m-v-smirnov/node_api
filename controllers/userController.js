const Sequelize = require("sequelize");
const userModel = require("../models/user");

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

const User = sequelize.define("user", userModel);


exports.showCreateUser = function (req, res) {
  res.send("register page soon...");
};

exports.createUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { fullName, email, dob, password } = req.body;

  let userExist = false;

  User.findOne({ where: { email: email }, raw: true })
    .then(user => {
      if (user) {
        userExist = true;
        return res.status(200).json({
          message: "Пользователь с таким e-mail уже существует"
        });
      }
      return User.create({
        fullName,
        email,
        dob,
        password
      })
    })
    .then((result) => {
      //console.log(result);
      if (!userExist) {
        res.status(200).json({
          message: `Добавлен новый пользователь: ${fullName}`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: `Сервер вернул ошибку: ${err}` });
    });
};

exports.editUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { fullName, email, dob, password, id } = req.body;

  User.update({
    fullName,
    email,
    dob,
    password
  },
    { where: { id } })
    .then(() => {
      res.status(200).json({
        message: `Изменения внесены.`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: `Сервер вернул ошибку: ${err}` });
    });

};

exports.deleteUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const userid = req.body.id;
  let userExist = true;

  User.findOne({ where: { id: userid } })
    .then(user => {
      if (!user) {
        userExist = false;
        return res.status(200).json({
          message: "Такого пользователя не существует"
        });
      };
      return User.destroy({ where: { id: userid } })
    })
    .then(() => {
      if (userExist) {
        res.status(200).json({
          message: `Пользователь удален`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: `Сервер вернул ошибку: ${err}` });
    });
};

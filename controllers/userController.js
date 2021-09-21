const Sequelize = require("sequelize");
const userModel = require("../models/user");
const {createHash} = require("crypto");

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


exports.createUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { fullName, email, dob, password } = req.body;
  hashPassword = createHash('sha256').update(password).digest('hex');
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
        password: hashPassword
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
      res.status(400).json({
        message: `Сервер вернул ошибку: ${err}`
      });
    });
};

exports.editUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { fullName, email, dob, password, id } = req.body;
  hashPassword = createHash('sha256').update(password).digest('hex');

  User.update({
    fullName,
    dob,
    password: hashPassword
  },
    { where: { id } })
    .then(() => {
      res.status(200).json({
        message: `Изменения внесены.`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: `Сервер вернул ошибку: ${err}`
      });
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
      res.status(400).json({
        message: `Сервер вернул ошибку: ${err}`
      });
    });
};

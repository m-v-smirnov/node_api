const db = require('../models/index');
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");


exports.createUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { fullName, email, dob, password } = req.body;
  hashPassword = createHash('sha256').update(password).digest('hex');

  db.User.findOne({ where: { email: email }, raw: true })
    .then(user => {
      if (user) {
        throw new Error("User with that email already exists");
      }
      db.User.create({
        fullName,
        email,
        dob,
        password: hashPassword
      })
      res.status(200).json({
        message: `A new user has been added: ${fullName}`
      })
    })
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
}

exports.loginUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { email, password } = req.body;
  hashPassword = createHash('sha256').update(password).digest('hex');

  db.User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        throw new Error("This user does not exist");
      };

      if (hashPassword !== user.password) {
        throw new Error("Invalid password");
      }

      jwt.sign({
        id: user.id,
        email: user.email
      },
        "BlaBlaBla",
        { expiresIn: 1000 },
        function (err, token) {
          if (err) {
            throw new Error("Token creation error");
          }
          res.status(200).send({ token });
        }
      );
    })
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
};

exports.loginUserByToken = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  id = req.body.id;

  db.User.findOne({ where: { id } })
    .then(user => {
      if (!user) {
        throw new Error("This user does not exist");
      };

      jwt.sign({
        id: user.id,
        email: user.email
      },
        "BlaBlaBla",
        { expiresIn: 1000 },
        function (err, token) {
          if (err) {
            throw new Error("Token creation error");
          }
          res.status(200).send({ token });
        }
      );
    })
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
};
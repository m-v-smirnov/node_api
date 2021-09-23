"use strict";
const db = require('../models/index');
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function tokenSign(id, email) {
  jwt.sign({
    id,
    email
  },
    secretKey,
    { expiresIn: 1000 },
    function (err, token) {
      if (err) {
        throw new Error(`Token creation error: ${err}`);
      }
      //res.status(200).send({ token });
      console.log(token);
      return token;
    }
  );
}

exports.createUser = function (req, res) {
  if (!req.body) return res.status(400).json({ message: "Empty request body" });

  const { fullName, email, dob, password } = req.body;
  const hashPassword = createHash('sha256').update(password).digest('hex');

  db.User.findOne({ where: { email: email }, raw: true })
    .then(user => {
      if (user) {
        throw new Error("User with that email already exists");
      }
      return db.User.create({
        fullName,
        email,
        dob,
        password: hashPassword
      })
    })
    .then(() => {
      res.status(200).json({
        message: `A new user has been added: ${fullName}`
      })
    }
    )
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
}

exports.loginUser = function (req, res) {
  if (!req.body) return res.status(400).json({ message: "Empty request body" });

  const { email, password } = req.body;
  const hashPassword = createHash('sha256').update(password).digest('hex');

  db.User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        throw new Error("This user does not exist");
      };

      if (hashPassword !== user.password) {
        throw new Error("Invalid password");
      }

      return tokenSign(user.id, user.email);
    })
    .then((token) => {
      console.log(token);
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
};

exports.loginUserByToken = function (req, res) {

  const id = req.userId;

  db.User.findOne({ where: { id } })
    .then(user => {
      if (!user) {
        throw new Error("This user does not exist");
      };
      const token = tokenSign(user.id, user.email);
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
};
"use strict";
const db = require('../models/index');
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function tokenSign(id, email) {

  return new Promise((res, rej) => {
    jwt.sign({
      id,
      email
    },
      secretKey,
      { expiresIn: 1000 },
      function (err, token) {
        if (err) {
          rej('Error')
        }
        console.log('first', token);
        res(token);
      }
    );
  })
  // return jwt.sign({ id, email }, secretKey, { expiresIn: 1000 });
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
    .then(user => {
      return tokenSign(user.id, user.email);
    })
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(401).json({
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
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(403).json({
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
      return tokenSign(user.id, user.email)
    })
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(err => {
      res.status(403).json({
        message: `${err}`
      });
    });
};
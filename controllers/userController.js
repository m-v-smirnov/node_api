"use strict";
const db = require('../models/index');
const { createHash } = require("crypto");


exports.editUser = function (req, res) {
  if (!req.body) return res.status(400).json({ message: "Empty request body" });

  const { fullName, dob, password } = req.body;
  const id = req.userId;
  let hashPassword = createHash('sha256').update(password).digest('hex');

  db.User.update({
    fullName,
    dob,
    password: hashPassword
  },
    { where: { id } })
    .then(() => {
      res.status(200).json({
        message: `Changes applied`
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `Server send error: ${err.message}`
      });
    });

};

exports.deleteUser = function (req, res) {
  if (!req.body) return res.status(400).json({ message: "Empty request body" });
  const id = req.userId;

  db.User.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({
        message: `User deleted`
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `${err}`
      });
    });
};
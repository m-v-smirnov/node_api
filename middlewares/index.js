"use strict";
const db = require('../models/index');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const secretKey = process.env.SECRET_KEY;


exports.checkUserToken = function (req, res, next) {
  let token = '';
  try {
    token = req.headers.authorization.split(' ')[1];
  } catch (err) {
    return res.status(400).json({
      message: "Authorization token missing or incorrect"
    });
  }

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        message: `Server send error: ${err}`
      });
    }
    const { id, email } = decoded;
    
    db.User.findOne({ where: { id, email } })
      .then(user => {
        if (!user) {
          throw new Error("Authorisation error");
        };
        req.userId = id;
        next();
      })
      .catch(err => {
        res.status(401).json({
          message: `Server send error: ${err}`
        });
      });
  });
};

exports.emailPassIsValid = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

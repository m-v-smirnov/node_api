const db = require('../models/index');
const jwt = require("jsonwebtoken");

exports.checkUserToken = function (req, res, next) {
  let token = '';
  try {
    token = req.headers.authorization.split(' ')[1];
  } catch (err) {
    return res.status(400).json({
      message: "Authorization token missing or incorrect"
    });
  }


  jwt.verify(token, 'BlaBlaBla', function (err, decoded) {
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
        req.body.id = id;
        next();
      })
      .catch(err => {
        res.status(400).json({
          message: `Server send error: ${err}`
        });
      });
  });
};

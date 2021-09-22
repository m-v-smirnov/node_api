const db = require('../models/index');
const { createHash } = require("crypto");


exports.editUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { fullName, email, dob, password, id } = req.body;
  hashPassword = createHash('sha256').update(password).digest('hex');

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
        message: `Server send error: ${err}`
      });
    });

};

exports.deleteUser = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const userid = req.body.id;

  db.User.findOne({ where: { id: userid } })
    .then(user => {
      if (!user) {
        throw new Error("This user does not exist");
      };
      db.User.destroy({ where: { id: userid } })
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
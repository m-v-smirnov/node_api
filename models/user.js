const Sequelize = require("sequelize");
const userModel = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
};

module.exports = userModel;

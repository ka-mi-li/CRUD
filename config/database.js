const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CRUD', 'root', '11022008', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

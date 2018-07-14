const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'siwi2017', {
  host: 'localhost',
  port: 3307,
  dialect: 'pg',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
module.exports = sequelize

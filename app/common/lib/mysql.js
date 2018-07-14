const Sequelize = require('sequelize');
const sequelize = new Sequelize('xia', 'root', 'siwi@123456', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
module.exports = sequelize
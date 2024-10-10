const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PASS, {
  host: process.env.SQL_HOST, 
  dialect: 'mysql', 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
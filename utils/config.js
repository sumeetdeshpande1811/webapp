
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });

module.exports = sequelize;
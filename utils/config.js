
const { Sequelize } = require('sequelize');
require('dotenv').config();




const sequelizeOptions = {
  dialect: 'postgres',
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};
if (process.env.PGHOST !== 'localhost') {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(sequelizeOptions);
// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     username: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.PGDATABASE,
//     dialectOptions: {
//       ssl: {
//           require: true,
//           rejectUnauthorized: false
//       }
//    },
//   });

module.exports = sequelize;
// require("dotenv").config();
// module.exports = {
//   development: {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//     dialectOptions: { ssl: { require: true }, rejectUnauthorized: false },
//   },
//   test: {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//     dialectOptions: { ssl: { require: true }, rejectUnauthorized: false },
//   },
//   production: {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//     dialectOptions: { ssl: { require: true }, rejectUnauthorized: false },
//   }
// }

require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.APP_DB,
    "password": process.env.PASS_DB,
    "database": process.env.NAME_DB,
    "host": "127.0.0.1",
    "dialect": process.env.DIALECT_DB
  },
  "test": {
    "username": process.env.APP_DB,
    "password": process.env.PASS_DB,
    "database": process.env.NAME_DB,
    "host": "127.0.0.1",
    "dialect": process.env.DIALECT_DB
  },
  "production": {
    "username": process.env.APP_DB,
    "password": process.env.PASS_DB,
    "database": process.env.NAME_DB,
    "host": "127.0.0.1",
    "dialect": process.env.DIALECT_DB
  }
}
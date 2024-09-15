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
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
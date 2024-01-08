const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MYSQL_DB
      : process.env.MYSQL_DB,
  connectionLimit: 10,
});
module.exports = pool;

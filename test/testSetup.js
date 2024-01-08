process.env.NODE_ENV = "test";
require("dotenv").config();
const mysql = require("mysql2/promise");

const poolConfig = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.TEST_MYSQL_DB,
  connectionLimit: 10,
};

let pool;

async function createTestDb() {
  try {
    const setupConnection = await mysql.createConnection({
      host: poolConfig.host,
      port: poolConfig.port,
      user: poolConfig.user,
      password: poolConfig.password,
    });

    await setupConnection.query("CREATE DATABASE IF NOT EXISTS orizon_test");

    await setupConnection.end();

    pool = mysql.createPool(poolConfig);

    const connection = await pool.getConnection();
    await connection.query("USE orizon_test");
    await connection.query(
      "CREATE TABLE IF NOT EXISTS product (id_product INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(45) NOT NULL)"
    );
    await connection.query(
      "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(45) NOT NULL,surname VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL)"
    );
    await connection.query(
      "CREATE TABLE IF NOT EXISTS orders (id_order INT AUTO_INCREMENT PRIMARY KEY NOT NULL, products VARCHAR(45) NOT NULL,users VARCHAR(45) NOT NULL,date DATE NOT NULL)"
    );
    connection.release();
  } catch (error) {
    console.error("Error setting up test database:", error.message);
    throw error;
  }
}

async function deleteTestDb() {
  try {
    const connection = await pool.getConnection();
    await connection.query("USE orizon_test");
    await connection.query("DROP DATABASE IF EXISTS orizon_test");
    connection.release();

    await pool.end();
  } catch (error) {
    console.error("Error tearing down test database:", error.message);
    throw error;
  }
}

module.exports = {
  createTestDb,
  deleteTestDb,
};

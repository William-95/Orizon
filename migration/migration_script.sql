-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: orizon_d
-- Source Schemata: orizon_db
-- Created: Mon Jan  8 15:36:05 2024
-- Workbench Version: 8.0.31
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema orizon_db
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `orizon_db` ;
CREATE SCHEMA IF NOT EXISTS `orizon_db` ;

-- ----------------------------------------------------------------------------
-- Table orizon_d.orders
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orizon_db`.`orders` (
  `id_order` INT NOT NULL AUTO_INCREMENT,
  `products` VARCHAR(225) NOT NULL,
  `users` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id_order`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table orizon_db.product
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orizon_db`.`product` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_product`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table orizon_db.user
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orizon_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;

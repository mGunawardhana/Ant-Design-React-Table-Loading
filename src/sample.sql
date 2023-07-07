-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;
USE `mydb`;

-- -----------------------------------------------------
-- Table `mydb`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Customer`
(
    `customer_id`     INT         NOT NULL,
    `customer_code`   INT         NULL,
    `company_name`    VARCHAR(45) NULL,
    `reference_no`    VARCHAR(45) NULL,
    `customer_type`   VARCHAR(45) NULL,
    `customer_name`   VARCHAR(45) NULL,
    `passport`        VARCHAR(45) NULL,
    `billing_address` VARCHAR(45) NULL,
    `mobile_number`   VARCHAR(45) NULL,
    `email`           VARCHAR(45) NULL,
    `country`         VARCHAR(45) NULL,
    `gender`          VARCHAR(45) NULL,
    `city`            VARCHAR(45) NULL,
    `id`              VARCHAR(45) NULL,
    PRIMARY KEY (`customer_id`)
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`document`
(
    `document_id` INT         NOT NULL,
    `document`    VARCHAR(45) NULL,
    `Customer_id` INT         NOT NULL,
    PRIMARY KEY (`document_id`, `Customer_id`),
    INDEX `fk_document_Customer1_idx` (`Customer_id` ASC) VISIBLE,
    CONSTRAINT `fk_document_Customer1`
        FOREIGN KEY (`Customer_id`)
            REFERENCES `mydb`.`Customer` (`customer_id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`contact_person_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contact_person_detail`
(
    `contact_person_detail_id` INT         NOT NULL,
    `customer_name`            VARCHAR(45) NULL,
    `designation`              VARCHAR(45) NULL,
    `mobile_number`            VARCHAR(45) NULL,
    `email`                    VARCHAR(45) NULL,
    `Customer_customer_id`     INT         NOT NULL,
    PRIMARY KEY (`contact_person_detail_id`),
    INDEX `fk_contact_person_detail_Customer1_idx` (`Customer_customer_id` ASC) VISIBLE,
    CONSTRAINT `fk_contact_person_detail_Customer1`
        FOREIGN KEY (`Customer_customer_id`)
            REFERENCES `mydb`.`Customer` (`customer_id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer_type`
(
    `type_id`     INT         NOT NULL,
    `type`        VARCHAR(45) NULL,
    `Customer_id` INT         NOT NULL,
    PRIMARY KEY (`type_id`, `Customer_id`),
    INDEX `fk_customer_type_Customer1_idx` (`Customer_id` ASC) VISIBLE,
    CONSTRAINT `fk_customer_type_Customer1`
        FOREIGN KEY (`Customer_id`)
            REFERENCES `mydb`.`Customer` (`customer_id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;

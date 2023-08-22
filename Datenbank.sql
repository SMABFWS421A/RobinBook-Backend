-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for robin book
CREATE DATABASE IF NOT EXISTS `robin book` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `robin book`;

-- Dumping structure for table robin book.adress
CREATE TABLE IF NOT EXISTS `adress` (
  `Street_name` varchar(50) NOT NULL,
  `House_number` int(10) NOT NULL,
  `Zipcode` int(40) NOT NULL,
  `State` varchar(50) NOT NULL,
  `fk_user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`Street_name`,`House_number`,`Zipcode`),
  KEY `FK_user_adress` (`fk_user_id`),
  CONSTRAINT `FK_user_adress` FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Adress for the Users\r\n';

-- Dumping data for table robin book.adress: ~0 rows (approximately)

-- Dumping structure for table robin book.book
CREATE TABLE IF NOT EXISTS `book` (
  `Book_id` int(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `ISBN` varchar(13) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Author` varchar(50) NOT NULL,
  `Publisher` varchar(50) NOT NULL,
  `Publication_date` date NOT NULL,
  `Edition` varchar(50) NOT NULL,
  `Summary` varchar(1500) NOT NULL,
  `Genre` enum('Classic','Fantasy','Historical Fiction','Horror','Literary Fiction','Romance','Science Fiction (Sci-Fi)','Thriller','Women`s Fiction','Biographie/Autobiographie','Cookbook') NOT NULL DEFAULT 'Classic',
  `Price` double(5,2) unsigned NOT NULL,
  `State` enum('Pristine','slight signs of wear','clear signs of use','Heavily worn') NOT NULL DEFAULT 'Pristine',
  `FK_seller` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Book_id`),
  KEY `FK_seller` (`FK_seller`),
  CONSTRAINT `FK_seller` FOREIGN KEY (`FK_seller`) REFERENCES `users` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Book table\r\n';

-- Dumping data for table robin book.book: ~0 rows (approximately)

-- Dumping structure for table robin book.order
CREATE TABLE IF NOT EXISTS `order` (
  `Order_id` int(10) unsigned zerofill NOT NULL,
  `Order_date` date DEFAULT NULL,
  `Delivery_date` date DEFAULT NULL,
  `Deliverycost` double(5,2) DEFAULT NULL,
  `FK_book` int(20) unsigned zerofill NOT NULL,
  `FK_seller` int(10) unsigned zerofill NOT NULL,
  `FK_client` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`Order_id`),
  KEY `FK_Book_order` (`FK_book`),
  KEY `FK_Seller_order` (`FK_seller`),
  KEY `FK_client_order` (`FK_client`),
  CONSTRAINT `FK_Book_order` FOREIGN KEY (`FK_book`) REFERENCES `book` (`Book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Seller_order` FOREIGN KEY (`FK_seller`) REFERENCES `users` (`User_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_client_order` FOREIGN KEY (`FK_client`) REFERENCES `users` (`User_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Order Table\r\n';

-- Dumping data for table robin book.order: ~0 rows (approximately)

-- Dumping structure for table robin book.users
CREATE TABLE IF NOT EXISTS `users` (
  `User_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `Mail_address` varchar(150) NOT NULL,
  `Password` varchar(70) NOT NULL,
  PRIMARY KEY (`User_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Table for Users';

-- Dumping data for table robin book.users: ~0 rows (approximately)

-- Dumping structure for table robin book.watchlist
CREATE TABLE IF NOT EXISTS `watchlist` (
  `watchlist_id` int(10) unsigned NOT NULL,
  `FK_user` int(10) unsigned NOT NULL,
  PRIMARY KEY (`watchlist_id`),
  KEY `FK_user` (`FK_user`),
  CONSTRAINT `FK_user` FOREIGN KEY (`FK_user`) REFERENCES `users` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Watchlist for users\r\n';

-- Dumping data for table robin book.watchlist: ~0 rows (approximately)

-- Dumping structure for table robin book.watchposition
CREATE TABLE IF NOT EXISTS `watchposition` (
  `Position_id` int(50) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `fk_watchlist` int(50) unsigned NOT NULL,
  `fk_book_id` int(50) unsigned NOT NULL,
  PRIMARY KEY (`Position_id`),
  KEY `fk_watchlist` (`fk_watchlist`),
  KEY `fk_book_id` (`fk_book_id`),
  CONSTRAINT `fk_book_id` FOREIGN KEY (`fk_book_id`) REFERENCES `book` (`Book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_watchlist` FOREIGN KEY (`fk_watchlist`) REFERENCES `watchlist` (`watchlist_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Positions on the watchlits\r\n';

-- Dumping data for table robin book.watchposition: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

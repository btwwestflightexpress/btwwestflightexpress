CREATE DATABASE  IF NOT EXISTS `accounts_creation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `accounts_creation`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: accounts_creation
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `freight_details`
--

DROP TABLE IF EXISTS `freight_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freight_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `senders_name` varchar(255) NOT NULL,
  `recievers_name` varchar(255) NOT NULL,
  `recievers_phone_number` varchar(255) NOT NULL,
  `recievers_email` varchar(255) NOT NULL,
  `Origin` varchar(255) NOT NULL,
  `origin_state` varchar(255) NOT NULL,
  `origin_zip_code` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `destination_state` varchar(255) NOT NULL,
  `destination_zip_code` varchar(255) NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `package_demension` varchar(255) DEFAULT NULL,
  `package_weight` varchar(255) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `package_number` varchar(255) NOT NULL,
  `tracking_code` varchar(255) NOT NULL,
  `package_password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `freight_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freight_details`
--

LOCK TABLES `freight_details` WRITE;
/*!40000 ALTER TABLE `freight_details` DISABLE KEYS */;
INSERT INTO `freight_details` VALUES (41,NULL,'chuks','dfgdg','dfg','dfgdfg','sgf','dfgdfg','dfgdfg','dfgdfg','dfgdfg','dfgfdg','dfgf','dfgfdg','dfgdfg','dfg','dfgdfg','T0LoJ8PgiQ','adams'),(42,NULL,'chuks','dfgdg','dfg','dfgdfg','sgf','dfgdfg','dfgdfg','dfgdfg','dfgdfg','dfgfdg','dfgf','dfgfdg','dfgdfg','dfg','dfgdfg','oovayFvwU8','adams'),(43,NULL,'edem samuel','David McGray','+1190347865','davidmcgray@gmail.com','Mexico','Alani','25178','Florida','Afghan','27826','Crate','null','12kg','my package','2','Ru4gcXR3nz','samuel'),(44,NULL,'edem samuel','David McGray','+1190347865','davidmcgray@gmail.com','Mexico','Alani','25178','Florida','Afghan','27826','Crate','null','12kg','my package','2','DCEWA7hFSD','samuel');
/*!40000 ALTER TABLE `freight_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'adams','adams@gmail.com','adams'),(19,'edem samuel','samueledem551@gmail.com','samuel');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-04  6:18:33

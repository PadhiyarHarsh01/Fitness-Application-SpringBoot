-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: fittrack
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `age` int DEFAULT NULL,
  `daily_calorie_goal` int DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','SUPER_ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (NULL,NULL,_binary '\0',_binary '',NULL,NULL,'2026-02-25 06:36:18.000162',1,'h1@gmail.com',NULL,'Harsh','$2a$10$4xHLRw8sl4IK8lL52kDtRO3AUhmfWfkbFfpxsHEbykCradCZ6.u1K','SUPER_ADMIN'),(20,2000,_binary '',_binary '\0',150,55,'2026-02-25 07:24:34.508767',2,'d@gmail.com','Weight Loss','Dhruvi','$2a$10$ogF2gVAsYdJEQoPOHf/dQexSIAVKsUyTGfS2OzbdoLfPctTHsxvGW','USER'),(26,1800,_binary '',_binary '\0',160,65,'2026-02-25 07:26:17.366657',3,'s@gmail.com','Muscle Gain','Sage','$2a$10$AXD2/H9C/aS1P7Dynl5LA.rAdYGpuR5LWc8IDhWdqdEkmcujLxG1W','USER'),(30,1500,_binary '\0',_binary '',160,60,'2026-02-25 07:28:09.442502',4,'r@gmail.com','Flexibility','Reyna','$2a$10$k7oLNYyPtaWoHiw6iOJUzuH16o32lEnG0FTmj76rpiTSDdoHTnqcy','ADMIN'),(25,1500,_binary '',_binary '\0',150,70,'2026-02-27 04:34:36.336311',5,'a@gmail.com','Weight Loss','abc','$2a$10$O74KITj8NGG/1iKMPIpRauq3VB8QQneJHDRVUeoh8LcF.p9uBmzP2','USER'),(20,1520,_binary '\0',_binary '',152,65,'2026-02-27 06:12:50.423609',6,'c@gmail.com','Endurance','Chamber','$2a$10$bsHstOLm5WsogzGK5ub.ruFGqz21phDlGob6uSXDqtr6EQLpDyhTm','USER'),(NULL,NULL,_binary '\0',_binary '',NULL,NULL,'2026-03-09 05:39:49.137271',7,'cy@gmail.com',NULL,'Cypher','$2a$10$FXr.ZJhtRUoTLDhzm1FCwOJXKzab5VxdrCFcQCZzS5.HpNxyCq5bW','USER'),(15,1500,_binary '\0',_binary '',165,98,'2026-03-11 06:10:58.474239',8,'harsh@gmail.com','Weight Loss','Harsh','$2a$10$ScmzwQ9QFkS3MIAT0dZuduCwzJ8pD6ZUvwS6mOpR6m5HXDYpdJ9lW','USER'),(NULL,NULL,_binary '\0',_binary '',NULL,NULL,'2026-03-24 10:05:23.959010',9,'admin@fittrack.com',NULL,'SUPER_ADMIN','$2a$10$uhsnUBNrIs0P5z3MaD4GcOP3T2HMmmIGEH8TLoKoLvmJS/q9/fi9y','SUPER_ADMIN');
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

-- Dump completed on 2026-03-26 11:22:23

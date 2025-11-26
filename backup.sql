-- MySQL dump 10.13  Distrib 9.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: library_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `BookID` int NOT NULL AUTO_INCREMENT,
  `Category` varchar(100) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Available_Copies` int DEFAULT NULL,
  `Pub_Year` int DEFAULT NULL,
  `Pub_Name` varchar(255) DEFAULT NULL,
  `Cover` varchar(255) DEFAULT NULL,
  `Rating` float DEFAULT NULL,
  `Availability` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES (1,'Historical fiction','A Tale of Two Cities','Charles Dickens',124.00,294,69,1859,'London: Chapman & Hall','https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tales_serial.jpg/250px-Tales_serial.jpg',4.25,1),(2,'Fantasy','The Little Prince','Antoine de Saint-Exupéry',84.00,244,74,1943,'Reynal & Hitchcock (U.S.) Gallimard (France) [ 7 ]','https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Littleprince.JPG/250px-Littleprince.JPG',1.25,1),(3,'Fantasy','The Alchemist','Paulo Coelho',68.00,164,132,1988,'HarperTorch (English translation) Originally a novel written in Portuguese','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/TheAlchemist.jpg/250px-TheAlchemist.jpg',4.58,1),(4,'Fantasy','Harry Potter and the Philosopher\'s Stone','J. K. Rowling',156.00,267,66,1997,'Bloomsbury (UK) Scholastic (US)','https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/250px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg',1.15,1),(5,'Mystery','And Then There Were None','Agatha Christie',186.00,239,99,1939,'Collins Crime Club','https://upload.wikimedia.org/wikipedia/en/thumb/2/26/And_Then_There_Were_None_US_First_Edition_Cover_1940.jpg/250px-And_Then_There_Were_None_US_First_Edition_Cover_1940.jpg',4.91,1),(6,'Family saga','Dream of the Red Chamber','Cao Xueqin',70.00,235,9,1791,'Collins Crime Club','https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Hongloumeng2.jpg/250px-Hongloumeng2.jpg',1.94,1),(7,'Fantasy','The Hobbit','J. R. R. Tolkien',143.00,265,166,1937,'George Allen & Unwin (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/TheHobbit_FirstEdition.jpg/250px-TheHobbit_FirstEdition.jpg',4.43,1),(8,'Fantasy','Alice\'s Adventures in Wonderland','Lewis Carroll',109.00,153,140,1865,'Macmillan','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Alice%27s_Adventures_in_Wonderland_cover_%281865%29.jpg/250px-Alice%27s_Adventures_in_Wonderland_cover_%281865%29.jpg',3.84,1),(9,'Adventure','She: A History of Adventure','H. Rider Haggard',181.00,123,10,1887,'Longmans','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/SHE%2C_A_History_of_Adventure_%281st_Edition_Cover%29%2C_by_H._Rider_Haggard.jpg/250px-SHE%2C_A_History_of_Adventure_%281st_Edition_Cover%29%2C_by_H._Rider_Haggard.jpg',2.93,1),(10,'Mystery','The Da Vinci Code','Dan Brown',69.00,211,174,2003,'Doubleday (US)','https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg',3.92,1),(11,'Fantasy','Harry Potter and the Chamber of Secrets','J. K. Rowling',89.00,126,27,1998,'Bloomsbury (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg/250px-Harry_Potter_and_the_Chamber_of_Secrets.jpg',3.02,1),(12,'Coming-of-age','The Catcher in the Rye','J. D. Salinger',112.00,101,31,1951,'Little, Brown and Company','https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/250px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg',1.15,1),(13,'Fantasy','Harry Potter and the Prisoner of Azkaban','J. K. Rowling',161.00,142,23,1999,'Bloomsbury (UK)','https://upload.wikimedia.org/wikipedia/en/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg',4.39,1),(14,'Fantasy','Harry Potter and the Goblet of Fire','J. K. Rowling',145.00,250,123,2000,'Bloomsbury (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png/250px-Harry_Potter_and_the_Goblet_of_Fire_cover.png',2.05,1),(15,'Fantasy','Harry Potter and the Half-Blood Prince','J. K. Rowling',63.00,178,168,2005,'Bloomsbury (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Harry_Potter_and_the_Half-Blood_Prince_cover.png/250px-Harry_Potter_and_the_Half-Blood_Prince_cover.png',2.05,1),(16,'Fantasy','Harry Potter and the Deathly Hallows','J. K. Rowling',122.00,101,18,2007,'Bloomsbury (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/250px-Harry_Potter_and_the_Deathly_Hallows.jpg',4.21,1),(17,'Romance','The Bridges of Madison County','Robert James Waller',184.00,296,60,1992,'Warner Books , Inc.','https://upload.wikimedia.org/wikipedia/en/c/c8/BridgesOfMadisonCounty.jpg',1.65,1),(18,'Magic realism','One Hundred Years of Solitude','Gabriel García Márquez',97.00,262,182,1967,'Editorial Sudamericana, Harper & Row (US) Jonathan Cape (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg/250px-Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg',3.8,1),(19,'Novel','Lolita','Vladimir Nabokov',194.00,179,159,1955,'Olympia Press','https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Lolita_1955.JPG/250px-Lolita_1955.JPG',3.34,1),(20,'Children\'s fiction','Heidi','Johanna Spyri',126.00,283,90,1880,'Friedrich Andreas Perthes','https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Spyri_Heidi_Cover_1887.jpg/250px-Spyri_Heidi_Cover_1887.jpg',2.14,1),(21,'Manual\r\n','The Common Sense Book of Baby and Child Care','Benjamin Spock',170.00,298,93,1946,'Duell, Sloan and Pearce (New York City)','https://upload.wikimedia.org/wikipedia/en/c/cd/The_Common_Sense_Book_of_Baby_and_Child_Care_%28hardcover%29.jpg',3.59,1),(22,'Children\'s novel','Anne of Green Gables','Lucy Maud Montgomery',96.00,274,53,1908,'L.C. Page & Co. [ 4 ]','https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Montgomery_Anne_of_Green_Gables.jpg/250px-Montgomery_Anne_of_Green_Gables.jpg',3.57,1),(23,'Children\'s literature','Black Beauty','Anna Sewell',133.00,157,91,1877,'Jarrold & Sons','https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/BlackBeautyCoverFirstEd1877.jpeg/250px-BlackBeautyCoverFirstEd1877.jpeg',3.76,1),(24,'Historical novel','The Name of the Rose','Umberto Eco',91.00,212,59,1980,'Bompiani (Italy) Harcourt (U.S.)','https://upload.wikimedia.org/wikipedia/en/e/eb/The_Name_of_the_Rose.jpg',3.2,1),(25,'War','The Eagle Has Landed','Jack Higgins',104.00,197,128,1975,'Collins','https://upload.wikimedia.org/wikipedia/en/d/dc/TheEagleHasLanded.jpg',1.46,1),(26,'Children\'s fiction','Watership Down','Richard Adams',150.00,240,64,1972,'Rex Collings','https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Richard_Adams_WatershipDown.jpg/250px-Richard_Adams_WatershipDown.jpg',2.36,1),(27,'nonfiction\r\n','The Hite Report','Shere Hite',156.00,129,123,1976,'Rex Collings','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Shere_Hite.jpg/250px-Shere_Hite.jpg',2.53,1),(28,'Children\'s fiction','Charlotte\'s Web','E. B. White',129.00,175,25,1952,'Harper & Brothers','https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/CharlotteWeb.png/250px-CharlotteWeb.png',1.42,1),(29,'Novel','The Ginger Man','J. P. Donleavy',118.00,180,146,1955,'Neville Spearman , Olympia Press','https://upload.wikimedia.org/wikipedia/en/e/ef/GingerMan.JPG',0.52,1),(30,'Bible study','The Purpose Driven Life','Rick Warren',172.00,182,26,2002,'Zondervan','https://upload.wikimedia.org/wikipedia/en/2/25/Pupose.jpg',2.7,1),(31,'Children\'s literature','The Tale of Peter Rabbit','Beatrix Potter',195.00,188,8,1902,'Frederick Warne & Co.','https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Peter_Rabbit_first_edition_1902a.jpg/250px-Peter_Rabbit_first_edition_1902a.jpg',1.82,1),(32,'Novella','Jonathan Livingston Seagull','Richard Bach',135.00,261,41,1970,'Macmillan Publishers (United States)','https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Johnathan_Livingston_Seagull.jpg/250px-Johnathan_Livingston_Seagull.jpg',3.98,1),(33,'Children\'s literature','The Very Hungry Caterpillar','Eric Carle',82.00,205,58,1969,'World Publishing Company (US) Hamish Hamilton (UK)','https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/HungryCaterpillar.JPG/250px-HungryCaterpillar.JPG',2.81,1),(34,'Essay/literature\r\n','A Message to Garcia','Elbert Hubbard',150.00,138,110,1899,'The Roycrofters','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/An_early_reprint_of_%22A_Message_to_Garcia%22.jpg/250px-An_early_reprint_of_%22A_Message_to_Garcia%22.jpg',3.54,1),(35,'Southern Gothic','To Kill a Mockingbird','Harper Lee',64.00,276,24,1960,'J. B. Lippincott & Co.','https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/250px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg',2.16,1),(36,'Gothic horror','Flowers in the Attic','V. C. Andrews',54.00,130,43,1979,'Simon & Schuster','https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Dollanganger01_FlowersInTheAttic.jpg/200px-Dollanganger01_FlowersInTheAttic.jpg',3.67,1),(37,'Popular science','Cosmos','Carl Sagan',115.00,184,9,1980,'Random House Hachette UK (1995 Ed.)','https://upload.wikimedia.org/wikipedia/en/9/91/Cosmos_book.gif',4.02,1),(38,'Philosophical novel','Sophie\'s World','Jostein Gaarder',149.00,122,1,1991,'Aschehoug','https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Sofies_verden.jpg/250px-Sofies_verden.jpg',0.57,1),(39,'mystery','Angels & Demons','Dan Brown',56.00,244,5,2000,'Aschehoug','https://upload.wikimedia.org/wikipedia/en/5/5f/AngelsAndDemons.jpg',3.24,1),(40,'Self-help','Alcoholics Anonymous','William Griffith Wilson',64.00,278,137,1939,'Alcoholics Anonymous World Services','https://upload.wikimedia.org/wikipedia/en/1/17/Big_book_2nd_edition.jpg',3.65,1),(41,'Novel','Kane and Abel','Jeffrey Archer',186.00,296,64,1979,'Hodder & Stoughton','https://upload.wikimedia.org/wikipedia/en/f/f3/KaneAndAbel.jpg',4.57,1),(42,'Socialist realist','How the Steel Was Tempered','Nikolai Ostrovsky',62.00,206,59,1932,'Young Guard (serial)','https://upload.wikimedia.org/wikipedia/en/7/74/How_the_Steel_Was_Tempered_%28novel%29_cover.jpg',3.95,1),(43,'Historical novel','War and Peace','Leo Tolstoy',50.00,258,250,1869,'The Russian Messenger (serial)','https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg/250px-Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg',3.24,1),(44,'Fantasy','The Adventures of Pinocchio','Carlo Collodi',165.00,235,215,1881,'Libreria Editrice Felice Paggi','https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pinocchio.jpg/250px-Pinocchio.jpg',3.8,1),(45,'Historical non-fiction','The Diary of Anne Frank','Anne Frank',72.00,115,13,1947,'Contact Publishing [ nl ]','https://upload.wikimedia.org/wikipedia/en/4/47/Het_Achterhuis_%28Diary_of_Anne_Frank%29_-_front_cover%2C_first_edition.jpg',1.15,1),(46,'Self-help\r\n','Your Erroneous Zones','Wayne Dyer',178.00,291,93,1976,'Contact Publishing [ nl ]','https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Your_Erroneous_Zones.jpg/250px-Your_Erroneous_Zones.jpg',1.41,1),(47,'Romantic family saga\r\n','The Thorn Birds','Colleen McCullough',50.00,266,147,1977,'Harper & Row','https://upload.wikimedia.org/wikipedia/en/5/53/Thorn_Birds-Colleen_McCullough.jpg',1.7,1),(48,'Bildungsroman','The Kite Runner','Khaled Hosseini',97.00,203,180,2003,'Riverhead Books','https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Kite_runner.jpg/250px-Kite_runner.jpg',2.4,1),(49,'Novel\r\n','Valley of the Dolls','Jacqueline Susann',81.00,227,6,1966,'Bernard Geis Associates','https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Valley_of_the_dolls_novel_first_edition_1966.jpg/250px-Valley_of_the_dolls_novel_first_edition_1966.jpg',0.91,1),(50,'Self-help','How to Win Friends and Influence People','Dale Carnegie',116.00,108,72,1936,'Simon & Schuster','https://upload.wikimedia.org/wikipedia/en/thumb/3/33/How-to-win-friends-and-influence-people.jpg/250px-How-to-win-friends-and-influence-people.jpg',4.37,1);
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Borrowing`
--

DROP TABLE IF EXISTS `Borrowing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Borrowing` (
  `BorrowID` int NOT NULL AUTO_INCREMENT,
  `BookID` int NOT NULL,
  `CusID` int NOT NULL,
  `BorrowDate` date NOT NULL,
  `DueDate` date NOT NULL,
  `ReturnDate` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`BorrowID`),
  KEY `BookID` (`BookID`),
  KEY `CusID` (`CusID`),
  CONSTRAINT `Borrowing_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `Books` (`BookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Borrowing_ibfk_2` FOREIGN KEY (`CusID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Borrowing`
--

LOCK TABLES `Borrowing` WRITE;
/*!40000 ALTER TABLE `Borrowing` DISABLE KEYS */;
/*!40000 ALTER TABLE `Borrowing` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_before_borrow_insert` BEFORE INSERT ON `Borrowing` FOR EACH ROW BEGIN
    DECLARE v_available INT;
    SELECT Available_Copies INTO v_available
    FROM Books WHERE BookID = NEW.BookID;

    IF v_available <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No available copies to borrow';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_after_borrow_insert` AFTER INSERT ON `Borrowing` FOR EACH ROW BEGIN
    UPDATE Books
    SET Available_Copies = Available_Copies - 1
    WHERE BookID = NEW.BookID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_after_borrow_update` AFTER UPDATE ON `Borrowing` FOR EACH ROW BEGIN
    IF NEW.ReturnDate IS NOT NULL AND OLD.ReturnDate IS NULL THEN
        UPDATE Books
        SET Available_Copies = Available_Copies + 1
        WHERE BookID = NEW.BookID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Invoice`
--

DROP TABLE IF EXISTS `Invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Invoice` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `BorrowID` int NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Fine` decimal(10,2) DEFAULT '0.00',
  `PaymentDate` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`InvoiceID`),
  UNIQUE KEY `BorrowID` (`BorrowID`),
  CONSTRAINT `Invoice_ibfk_1` FOREIGN KEY (`BorrowID`) REFERENCES `Borrowing` (`BorrowID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoice`
--

LOCK TABLES `Invoice` WRITE;
/*!40000 ALTER TABLE `Invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `Invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `ReservationID` int NOT NULL AUTO_INCREMENT,
  `BookID` int NOT NULL,
  `CusID` int NOT NULL,
  `ReservationDate` date NOT NULL,
  `ReservationExpiryDate` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ReservationID`),
  KEY `BookID` (`BookID`),
  KEY `CusID` (`CusID`),
  CONSTRAINT `Reservation_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `Books` (`BookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reservation_ibfk_2` FOREIGN KEY (`CusID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `trg_reservation_expire` BEFORE UPDATE ON `Reservation` FOR EACH ROW BEGIN
    IF NEW.ReservationExpiryDate < CURDATE() THEN
        SET NEW.Status = 'Expired';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `User_Address`
--

DROP TABLE IF EXISTS `User_Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Address` (
  `AdID` int NOT NULL,
  `Street_Name` varchar(255) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `Region` varchar(100) DEFAULT NULL,
  `Postal_Code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`AdID`),
  CONSTRAINT `User_Address_ibfk_1` FOREIGN KEY (`AdID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Address`
--

LOCK TABLES `User_Address` WRITE;
/*!40000 ALTER TABLE `User_Address` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Phone`
--

DROP TABLE IF EXISTS `User_Phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Phone` (
  `AdID` int NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  PRIMARY KEY (`AdID`,`Phone_Number`),
  CONSTRAINT `User_Phone_ibfk_1` FOREIGN KEY (`AdID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Phone`
--

LOCK TABLES `User_Phone` WRITE;
/*!40000 ALTER TABLE `User_Phone` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Rating`
--

DROP TABLE IF EXISTS `User_Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Rating` (
  `UserID` int NOT NULL,
  `BookID` int NOT NULL,
  `Rating` float DEFAULT NULL,
  PRIMARY KEY (`UserID`,`BookID`),
  KEY `BookID` (`BookID`),
  CONSTRAINT `User_Rating_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_Rating_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `Books` (`BookID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Rating`
--

LOCK TABLES `User_Rating` WRITE;
/*!40000 ALTER TABLE `User_Rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `UserFirstName` varchar(255) DEFAULT NULL,
  `UserLastName` varchar(255) DEFAULT NULL,
  `UserBirthDate` date DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `UserPassword` varchar(255) DEFAULT NULL,
  `UserRole` enum('admin','customer') NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Muhammed','Mahmoud','2004-07-19','Muhammed_Mahmoud','$2b$10$bhb0RzZl3opEZOBGQrE87uWOWW2/0qcC8.SmunOC6l4Obhjc5mzlW','admin'),(7,'Harry','Potter','1990-01-01','Harry1990','$2b$10$SMEmMOpYgH7r1cWN8yeLyONhjYYzJBV/PFFdyoSTVLaUvRJnql/fS','customer'),(9,'Abdelrahman','Ahmed','2004-01-01','Abdelrahman2004','$2b$10$N86B1g.DFUgBZwuYg1bQre5Sc1a8dMMo/CYhVG0Emh7cG7BliALdS','admin');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 19:03:01

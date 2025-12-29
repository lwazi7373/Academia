-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: academia
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `assessment`
--

DROP TABLE IF EXISTS `assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment` (
  `assessmentId` int NOT NULL AUTO_INCREMENT,
  `assessmentName` varchar(100) NOT NULL,
  `totalMark` int NOT NULL,
  `weighting` decimal(5,2) NOT NULL,
  `dueDate` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `lecturerId` int NOT NULL,
  `moduleId` int NOT NULL,
  PRIMARY KEY (`assessmentId`),
  KEY `idx_lecturer` (`lecturerId`),
  KEY `idx_module` (`moduleId`),
  KEY `idx_due_date` (`dueDate`),
  CONSTRAINT `assessment_ibfk_1` FOREIGN KEY (`lecturerId`) REFERENCES `lecturer` (`lecturerId`),
  CONSTRAINT `assessment_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`),
  CONSTRAINT `assessment_chk_1` CHECK ((`totalMark` > 0)),
  CONSTRAINT `assessment_chk_2` CHECK (((`weighting` >= 0) and (`weighting` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendancerecord`
--

DROP TABLE IF EXISTS `attendancerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendancerecord` (
  `attendanceRecordId` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `sessionId` int NOT NULL,
  PRIMARY KEY (`attendanceRecordId`),
  UNIQUE KEY `unique_student_session` (`studentId`,`sessionId`),
  KEY `idx_student` (`studentId`),
  KEY `idx_session` (`sessionId`),
  CONSTRAINT `attendancerecord_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`),
  CONSTRAINT `attendancerecord_ibfk_2` FOREIGN KEY (`sessionId`) REFERENCES `classsession` (`sessionId`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classsession`
--

DROP TABLE IF EXISTS `classsession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classsession` (
  `sessionId` int NOT NULL AUTO_INCREMENT,
  `classType` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `expiresAt` datetime NOT NULL,
  `attendanceCode` varchar(10) DEFAULT NULL,
  `lecturerId` int NOT NULL,
  `moduleId` int NOT NULL,
  PRIMARY KEY (`sessionId`),
  KEY `idx_lecturer` (`lecturerId`),
  KEY `idx_module` (`moduleId`),
  KEY `idx_expires` (`expiresAt`),
  CONSTRAINT `classsession_ibfk_1` FOREIGN KEY (`lecturerId`) REFERENCES `lecturer` (`lecturerId`),
  CONSTRAINT `classsession_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coordinator`
--

DROP TABLE IF EXISTS `coordinator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinator` (
  `coordinatorId` int NOT NULL,
  `departmentId` int NOT NULL,
  `staffNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`coordinatorId`),
  UNIQUE KEY `staffNumber` (`staffNumber`),
  KEY `idx_department` (`departmentId`),
  CONSTRAINT `coordinator_ibfk_1` FOREIGN KEY (`coordinatorId`) REFERENCES `users` (`userId`),
  CONSTRAINT `coordinator_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `coordinatormodule`
--

DROP TABLE IF EXISTS `coordinatormodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinatormodule` (
  `coordinatorModuleId` int NOT NULL AUTO_INCREMENT,
  `coordinatorId` int NOT NULL,
  `moduleId` int NOT NULL,
  PRIMARY KEY (`coordinatorModuleId`),
  UNIQUE KEY `unique_coordinator_module` (`coordinatorId`,`moduleId`),
  KEY `idx_coordinator` (`coordinatorId`),
  KEY `idx_module` (`moduleId`),
  CONSTRAINT `coordinatormodule_ibfk_1` FOREIGN KEY (`coordinatorId`) REFERENCES `coordinator` (`coordinatorId`),
  CONSTRAINT `coordinatormodule_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `departmentId` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(50) NOT NULL,
  `facultyId` int NOT NULL,
  PRIMARY KEY (`departmentId`),
  KEY `idx_faculty` (`facultyId`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`facultyId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `facultyId` int NOT NULL AUTO_INCREMENT,
  `facultyName` varchar(100) NOT NULL,
  PRIMARY KEY (`facultyId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `followup`
--

DROP TABLE IF EXISTS `followup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followup` (
  `followUpId` int NOT NULL AUTO_INCREMENT,
  `interventionId` int NOT NULL,
  `content` text NOT NULL,
  `outcome` enum('IMPROVED','NO_CHANGE','WORSENED') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`followUpId`),
  KEY `idx_intervention` (`interventionId`),
  CONSTRAINT `followup_ibfk_1` FOREIGN KEY (`interventionId`) REFERENCES `intervention` (`interventionId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hod`
--

DROP TABLE IF EXISTS `hod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hod` (
  `hodId` int NOT NULL,
  `departmentId` int NOT NULL,
  `staffNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`hodId`),
  UNIQUE KEY `staffNumber` (`staffNumber`),
  KEY `idx_department` (`departmentId`),
  CONSTRAINT `hod_ibfk_1` FOREIGN KEY (`hodId`) REFERENCES `users` (`userId`),
  CONSTRAINT `hod_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `intervention`
--

DROP TABLE IF EXISTS `intervention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intervention` (
  `interventionId` int NOT NULL AUTO_INCREMENT,
  `studentModuleId` int NOT NULL,
  `coordinatorId` int NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `status` enum('ACTIVE','FOLLOW_UP_DUE','CLOSED') NOT NULL,
  PRIMARY KEY (`interventionId`),
  KEY `idx_student_module` (`studentModuleId`),
  KEY `idx_coordinator` (`coordinatorId`),
  KEY `idx_status` (`status`),
  CONSTRAINT `intervention_ibfk_1` FOREIGN KEY (`studentModuleId`) REFERENCES `studentmodule` (`studentModuleId`),
  CONSTRAINT `intervention_ibfk_2` FOREIGN KEY (`coordinatorId`) REFERENCES `coordinator` (`coordinatorId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lecturer`
--

DROP TABLE IF EXISTS `lecturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturer` (
  `lecturerId` int NOT NULL,
  `departmentId` int NOT NULL,
  `staffNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`lecturerId`),
  UNIQUE KEY `staffNumber` (`staffNumber`),
  KEY `idx_department` (`departmentId`),
  CONSTRAINT `lecturer_ibfk_1` FOREIGN KEY (`lecturerId`) REFERENCES `users` (`userId`),
  CONSTRAINT `lecturer_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lecturermodule`
--

DROP TABLE IF EXISTS `lecturermodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturermodule` (
  `lecturerModuleId` int NOT NULL AUTO_INCREMENT,
  `lecturerId` int NOT NULL,
  `moduleId` int NOT NULL,
  PRIMARY KEY (`lecturerModuleId`),
  UNIQUE KEY `unique_lecturer_module` (`lecturerId`,`moduleId`),
  KEY `idx_lecturer` (`lecturerId`),
  KEY `idx_module` (`moduleId`),
  CONSTRAINT `lecturermodule_ibfk_1` FOREIGN KEY (`lecturerId`) REFERENCES `lecturer` (`lecturerId`),
  CONSTRAINT `lecturermodule_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `markentry`
--

DROP TABLE IF EXISTS `markentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `markentry` (
  `markEntryId` int NOT NULL AUTO_INCREMENT,
  `mark` decimal(5,2) DEFAULT NULL,
  `submission` tinyint(1) NOT NULL DEFAULT '0',
  `dateSubmitted` datetime DEFAULT NULL,
  `studentId` int NOT NULL,
  `assessmentId` int NOT NULL,
  PRIMARY KEY (`markEntryId`),
  UNIQUE KEY `unique_student_assessment` (`studentId`,`assessmentId`),
  KEY `idx_student` (`studentId`),
  KEY `idx_assessment` (`assessmentId`),
  KEY `idx_submission` (`submission`),
  CONSTRAINT `markentry_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`),
  CONSTRAINT `markentry_ibfk_2` FOREIGN KEY (`assessmentId`) REFERENCES `assessment` (`assessmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `moduleId` int NOT NULL AUTO_INCREMENT,
  `moduleName` varchar(100) NOT NULL,
  `moduleCode` varchar(20) NOT NULL,
  `credits` int NOT NULL,
  `departmentId` int NOT NULL,
  PRIMARY KEY (`moduleId`),
  UNIQUE KEY `moduleCode` (`moduleCode`),
  KEY `idx_code` (`moduleCode`),
  KEY `idx_department` (`departmentId`),
  CONSTRAINT `module_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`),
  CONSTRAINT `module_chk_1` CHECK ((`credits` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualification` (
  `qualificationId` int NOT NULL AUTO_INCREMENT,
  `qualificationName` varchar(100) NOT NULL,
  `qualificationCode` varchar(20) NOT NULL,
  `duration` int NOT NULL,
  `totalCredits` int NOT NULL,
  `departmentId` int NOT NULL,
  PRIMARY KEY (`qualificationId`),
  UNIQUE KEY `qualificationCode` (`qualificationCode`),
  KEY `idx_department` (`departmentId`),
  KEY `idx_code` (`qualificationCode`),
  CONSTRAINT `qualification_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`),
  CONSTRAINT `qualification_chk_1` CHECK ((`duration` > 0)),
  CONSTRAINT `qualification_chk_2` CHECK ((`totalCredits` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `qualificationmodule`
--

DROP TABLE IF EXISTS `qualificationmodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualificationmodule` (
  `qualificationModuleId` int NOT NULL AUTO_INCREMENT,
  `qualificationId` int NOT NULL,
  `moduleId` int NOT NULL,
  `academicYear` int NOT NULL,
  `semesterNo` int NOT NULL,
  `isCompulsory` tinyint(1) NOT NULL,
  PRIMARY KEY (`qualificationModuleId`),
  KEY `idx_qualification` (`qualificationId`),
  KEY `idx_module` (`moduleId`),
  CONSTRAINT `qualificationmodule_ibfk_1` FOREIGN KEY (`qualificationId`) REFERENCES `qualification` (`qualificationId`),
  CONSTRAINT `qualificationmodule_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`),
  CONSTRAINT `qualificationmodule_chk_1` CHECK ((`academicYear` > 0)),
  CONSTRAINT `qualificationmodule_chk_2` CHECK ((`semesterNo` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `riskreport`
--

DROP TABLE IF EXISTS `riskreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riskreport` (
  `riskReportId` int NOT NULL AUTO_INCREMENT,
  `studentModuleId` int NOT NULL,
  `riskLevel` enum('LOW','MODERATE','HIGH') NOT NULL,
  `attendanceRate` decimal(5,2) NOT NULL,
  `submissionRate` decimal(5,2) NOT NULL,
  `averageMark` decimal(5,2) NOT NULL,
  `calculatedAt` datetime NOT NULL,
  PRIMARY KEY (`riskReportId`),
  KEY `idx_student_module` (`studentModuleId`),
  KEY `idx_calculated` (`calculatedAt`),
  CONSTRAINT `riskreport_ibfk_1` FOREIGN KEY (`studentModuleId`) REFERENCES `studentmodule` (`studentModuleId`),
  CONSTRAINT `riskreport_chk_1` CHECK (((`attendanceRate` >= 0) and (`attendanceRate` <= 100))),
  CONSTRAINT `riskreport_chk_2` CHECK (((`submissionRate` >= 0) and (`submissionRate` <= 100))),
  CONSTRAINT `riskreport_chk_3` CHECK (((`averageMark` >= 0) and (`averageMark` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `studentId` int NOT NULL,
  `studentNumber` varchar(20) NOT NULL,
  `levelOfEducation` varchar(20) DEFAULT NULL,
  `yearOfStudy` int NOT NULL,
  `qualificationId` int NOT NULL,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `studentNumber` (`studentNumber`),
  KEY `idx_student_number` (`studentNumber`),
  KEY `idx_qualification` (`qualificationId`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`userId`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`qualificationId`) REFERENCES `qualification` (`qualificationId`),
  CONSTRAINT `student_chk_1` CHECK ((`yearOfStudy` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `studentmodule`
--

DROP TABLE IF EXISTS `studentmodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentmodule` (
  `studentModuleId` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `moduleId` int NOT NULL,
  PRIMARY KEY (`studentModuleId`),
  UNIQUE KEY `unique_student_module` (`studentId`,`moduleId`),
  KEY `idx_student` (`studentId`),
  KEY `idx_module` (`moduleId`),
  CONSTRAINT `studentmodule_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`),
  CONSTRAINT `studentmodule_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `userRoleId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `userRole` enum('ADMIN','HOD','LECTURER','COORDINATOR','STUDENT') NOT NULL,
  PRIMARY KEY (`userRoleId`),
  UNIQUE KEY `unique_user_role` (`userId`,`userRole`),
  KEY `idx_role` (`userRole`),
  CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `title` varchar(10) DEFAULT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `contactNo` varchar(15) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `dateRegistered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gender` varchar(20) DEFAULT NULL,
  `idNumber` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `emailAddress` (`emailAddress`),
  KEY `idx_email` (`emailAddress`),
  KEY `idx_active` (`isActive`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-29  9:17:31

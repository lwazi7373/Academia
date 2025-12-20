CREATE DATABASE Academia;
USE Academia;

CREATE TABLE Users (
    userId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    title VARCHAR(10),
    emailAddress VARCHAR(100) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    contactNo VARCHAR(15),
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    userRole ENUM ('ADMIN','HOD','LECTURER','COORDINATOR','STUDENT') NOT NULL,
    dateRegistered DATE NOT NULL,
    gender VARCHAR(20),
    idNumber VARCHAR(20),
    PRIMARY KEY (userId)
);

CREATE TABLE Faculty (
    facultyId INT NOT NULL AUTO_INCREMENT,
    facultyName VARCHAR(100) NOT NULL,
    PRIMARY KEY (facultyId)
);


CREATE TABLE Department (
    departmentId INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(50) NOT NULL,
    facultyId INT NOT NULL,
    PRIMARY KEY (departmentId),
    FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId)
);

CREATE TABLE Qualification (
    qualificationId INT NOT NULL AUTO_INCREMENT,
    qualificationName VARCHAR(100) NOT NULL,
    qualificationCode VARCHAR(20) UNIQUE NOT NULL,
    duration INT NOT NULL,
    totalCredits INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (qualificationId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Student (
    studentId INT NOT NULL,
    studentNumber VARCHAR(20) UNIQUE NOT NULL,
    levelOfEducation VARCHAR(20),
    yearOfStudy INT NOT NULL,
    qualificationId INT NOT NULL,
    PRIMARY KEY (studentId),
    FOREIGN KEY (studentId) REFERENCES Users(userId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId)
);

CREATE TABLE Lecturer (
    lecturerId INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (lecturerId),
    FOREIGN KEY (lecturerId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Module (
    moduleId INT NOT NULL AUTO_INCREMENT,
    moduleName VARCHAR(100) NOT NULL,
    moduleCode VARCHAR(20) UNIQUE NOT NULL,
    credits INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (moduleId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);


CREATE TABLE Coordinator (
    coordinatorId INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (coordinatorId),
    FOREIGN KEY (coordinatorId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);


CREATE TABLE HOD (
    hodId INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (hodId),
    FOREIGN KEY (hodId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);


CREATE TABLE StudentModule(
	studentModuleId INT NOT NULL AUTO_INCREMENT,
    studentId INT NOT NULL,
    moduleId INT NOT NULL, 
	PRIMARY KEY (studentModuleId),
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);
CREATE TABLE LecturerModule(
	lecturerModuleId INT NOT NULL AUTO_INCREMENT,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL, 
    PRIMARY KEY (lecturerModuleId),
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE CoordinatorModule(
	coordinatorModuleId INT NOT NULL AUTO_INCREMENT,
    coordinatorId INT NOT NULL,
    moduleId INT NOT NULL, 
    PRIMARY KEY (coordinatorModuleId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE QualificationModule (
    qualificationModuleId INT NOT NULL AUTO_INCREMENT,
    qualificationId INT NOT NULL,
    moduleId INT NOT NULL,
    academicYear INT NOT NULL,
    semesterNo INT NOT NULL,
    isCompulsory BOOLEAN NOT NULL,
    PRIMARY KEY (qualificationModuleId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);


CREATE TABLE Assessment (
	assessmentId INT NOT NULL AUTO_INCREMENT,
    assessmentName VARCHAR(100) NOT NULL,
    totalMark INT NOT NULL,
    weighting DECIMAL(5,2) NOT NULL,
    dueDate DATE NOT NULL,
    dateCreated DATE NOT NULL,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
	PRIMARY KEY (assessmentId),
	FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE ClassSession(
	sessionId INT NOT NULL AUTO_INCREMENT,
    classType VARCHAR(20) NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    dateCreated DATE NOT NULL,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (sessionId),
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE AttendanceRecord (
	attendanceRecordId INT NOT NULL AUTO_INCREMENT,
    StudentId INT NOT NULL,
    sessionId INT NOT NULL,
    PRIMARY KEY (attendanceRecordId),
    FOREIGN KEY (StudentId) REFERENCES  Student(StudentId),
    FOREIGN KEY (sessionId) REFERENCES  ClassSession(sessionId)
);

CREATE TABLE MarkEntry (
	markEntryId INT NOT NULL AUTO_INCREMENT,
    mark DECIMAL,
    submission BOOLEAN,
    dateSubmitted DATE NOT NULL,
    studentId INT NOT NULL,
    assessmentId INT NOT NULL,
    PRIMARY KEY(markEntryId),
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (assessmentId) REFERENCES Assessment(assessmentId)
);

CREATE TABLE RiskReport (
    riskReportId INT NOT NULL AUTO_INCREMENT,
    studentModuleId INT NOT NULL,
    riskLevel ENUM('LOW','MODERATE','HIGH') NOT NULL,
    attendanceRate DECIMAL(5,2) NOT NULL,
    submissionRate DECIMAL(5,2) NOT NULL,
    averageMark DECIMAL(5,2) NOT NULL,
    dateCalculated DATE NOT NULL,
    PRIMARY KEY (riskReportId),
    FOREIGN KEY (studentModuleId) REFERENCES StudentModule(studentModuleId)
);

CREATE TABLE Intervention (
    interventionId INT NOT NULL AUTO_INCREMENT,
    studentModuleId INT NOT NULL,
    coordinatorId INT NOT NULL,
    content TEXT NOT NULL,
    dateCreated DATE NOT NULL,
    status ENUM('ACTIVE','FOLLOW_UP_DUE','CLOSED') NOT NULL,
    PRIMARY KEY (interventionId),
    FOREIGN KEY (studentModuleId) REFERENCES StudentModule(studentModuleId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId)
);

CREATE TABLE FollowUp (
    followUpId INT NOT NULL AUTO_INCREMENT,
    interventionId INT NOT NULL,
    content TEXT NOT NULL,
    outcome ENUM('IMPROVED','NO_CHANGE','WORSENED') NOT NULL,
    dateCreated DATE NOT NULL,
    PRIMARY KEY (followUpId),
    FOREIGN KEY (interventionId) REFERENCES Intervention(interventionId)
);

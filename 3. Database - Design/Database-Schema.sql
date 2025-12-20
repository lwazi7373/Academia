CREATE DATABASE AcademicPerformanceTracker;
USE AcademicPerformanceTracker;

CREATE TABLE Users (
	userId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50),
    LastName VARCHAR(50),
    title VARCHAR(10),
    emailAddress VARCHAR(50) UNIQUE,
    userPassword VARCHAR(255) UNIQUE,
    contactNo VARCHAR(15),
    isActive BOOLEAN,
    userRole ENUM ('Administrator','H.O.D', 'Lecturer', 'Coordinator','Student') NOT NULL,
    dateRegistered DATE,
	gender VARCHAR(10),
	idNumber VARCHAR(13),
    PRIMARY KEY (userId)
);

CREATE TABLE Administrator(
	adminId INT NOT NULL,
    PRIMARY KEY (adminId),
    FOREIGN KEY (adminId) REFERENCES Users(userId)
);

CREATE TABLE Department (
	departmentId INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(50),
    PRIMARY KEY (departmentId)
);

CREATE TABLE Qualification (
	qualificationId INT NOT NULL AUTO_INCREMENT,
    qualificationName VARCHAR(50),
    qualificationCode VARCHAR(50),
    duration INT NOT NULL,
    totalCredits INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (qualificationId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Student (
	studentId INT NOT NULL,
    studentNumber VARCHAR(50),
	levelOfEducation VARCHAR(20),
    yearOfStudy INT,
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
    moduleName VARCHAR(50),
    moduleCode VARCHAR(50),
    credits INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (moduleId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Coordinator (
	coordinatorId INT NOT NULL,
    departmentId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (coordinatorId),
    FOREIGN KEY (coordinatorId) REFERENCES Users(userId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE HOD (
	hodId INT NOT NULL,
    PRIMARY KEY (hodId),
    departmentId INT NOT NULL,
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
CREATE TABLE QualificationModule(
	qualificationModuleId INT NOT NULL AUTO_INCREMENT,
    qualificationId INT NOT NULL,
    moduleId INT NOT NULL,
    yearOffered INT NOT NULL,
    semesterOffered INT NOT NULL,
	compulsoryModule VARCHAR(30),
	electiveModule VARCHAR(30),
    PRIMARY KEY (qualificationModuleId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE Assessment (
	assessmentId INT NOT NULL AUTO_INCREMENT,
    assessment_name VARCHAR(50),
    totalMark INT,
    weighting DECIMAL,
    dueDate DATE,
    dateCreated DATE,
    lecturerModuleId INT NOT NULL,
	PRIMARY KEY (assessmentId),
    FOREIGN KEY (lecturerModuleId) REFERENCES LecturerModule(lecturerModuleId)
);
CREATE TABLE ClassSession(
	sessionId INT NOT NULL AUTO_INCREMENT,
    classType VARCHAR(10),
    lecturerModuleId INT NOT NULL,
    PRIMARY KEY (sessionId),
    FOREIGN KEY (lecturerModuleId) REFERENCES LecturerModule(lecturerModuleId)
);

CREATE TABLE AttendanceRecord (
	attendanceRecordId INT NOT NULL AUTO_INCREMENT,
    StudentModuleId INT NOT NULL,
    sessionId INT NOT NULL,
    PRIMARY KEY (attendanceRecordId),
    FOREIGN KEY (StudentModuleId) REFERENCES  StudentModule(StudentModuleId),
    FOREIGN KEY (sessionId) REFERENCES  ClassSession(sessionId)
);

CREATE TABLE MarkEntry (
	markEntryId INT NOT NULL AUTO_INCREMENT,
    mark DECIMAL,
    submission BOOLEAN,
    dateSubmitted DATE,
    studentId INT NOT NULL,
    assessmentId INT NOT NULL,
    PRIMARY KEY(markEntryId),
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (assessmentId) REFERENCES Assessment(assessmentId)
);

CREATE TABLE RiskReport (
	riskReportId INT NOT NULL AUTO_INCREMENT,
    riskLevel VARCHAR(20),
	attendanceRate DECIMAL,
    submissionRate DECIMAL,
    marks DECIMAL,
    studentModuleId INT NOT NULL,
    PRIMARY KEY (riskReportId),
    FOREIGN KEY (StudentModuleId) REFERENCES  StudentModule(StudentModuleId)
);

CREATE TABLE Message(
	messageId INT NOT NULL AUTO_INCREMENT,
    content TEXT,
    dateSent DATE,
    studentId INT NOT NULL,
    coordinatorId INT NOT NULL,
    PRIMARY KEY(messageId),
    FOREIGN KEY (studentId) REFERENCES  Student(studentId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId)
);

CREATE TABLE Intervention(
	interventionId INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255),
    dateSent DATE,
    studentId INT NOT NULL,
    coordinatorId INT NOT NULL,
    PRIMARY KEY(interventionId),
    FOREIGN KEY (studentId) REFERENCES  Student(studentId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId)
);

CREATE TABLE FollowUP (
	FollowUpId INT NOT NULL AUTO_INCREMENT,
    interventionId INT NOT NULL,
    content VARCHAR(255),
    PRIMARY KEY(FollowUpId),
    FOREIGN KEY (interventionId) REFERENCES Intervention(interventionId)
);
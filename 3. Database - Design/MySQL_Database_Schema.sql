CREATE DATABASE AcademicTrackerSystem;
USE AcademicPerformanceTracker;

CREATE TABLE Users (
	userId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    title VARCHAR(10) NOT NULL,
    emailAddress VARCHAR(50) UNIQUE NOT NULL,
    userPassword VARCHAR(255) UNIQUE NOT NULL,
    contactNo VARCHAR(15) NOT NULL,
    isActive BOOLEAN NOT NULL,
    userRole ENUM ('Administrator','H.O.D', 'Lecturer', 'Coordinator','Student') NOT NULL,
    dateRegistered DATE NOT NULL,
	gender VARCHAR(20) NOT NULL,
	idNumber VARCHAR(20) NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE Administrator(
	adminId INT NOT NULL,
    PRIMARY KEY (adminId),
    FOREIGN KEY (adminId) REFERENCES Users(userId)
);

CREATE TABLE Department (
	departmentId INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(50) NOT NULL,
    PRIMARY KEY (departmentId)
);

CREATE TABLE Qualification (
	qualificationId INT NOT NULL AUTO_INCREMENT,
    qualificationName VARCHAR(50) UNIQUE NOT NULL,
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
	levelOfEducation VARCHAR(20) NOT NULL,
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
    moduleName VARCHAR(50) UNIQUE NOT NULL,
    moduleCode VARCHAR(50) UNIQUE NOT NULL,
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

CREATE TABLE CoordinatorModule(
	coordinatorModuleId INT NOT NULL AUTO_INCREMENT,
    coordinatorId INT NOT NULL,
    moduleId INT NOT NULL, 
    PRIMARY KEY (coordinatorModuleId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE QualificationModule(
	qualificationModuleId INT NOT NULL AUTO_INCREMENT,
    qualificationId INT NOT NULL,
    moduleId INT NOT NULL,
    academicYear INT NOT NULL,
    semesterNo INT NOT NULL,
	compulsoryModule VARCHAR(30),
	electiveModule VARCHAR(30),
    PRIMARY KEY (qualificationModuleId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE Assessment (
	assessmentId INT NOT NULL AUTO_INCREMENT,
    assessment_name VARCHAR(50) NOT NULL,
    totalMark INT NOT NULL,
    weighting DECIMAL NOT NULL,
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
    EndTime TIME NOT NULL,
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
    riskLevel DECIMAL NOT NULL,
	attendanceRate DECIMAL NOT NULL,
    submissionRate DECIMAL NOT NULL,
    marks DECIMAL NOT NULL,
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
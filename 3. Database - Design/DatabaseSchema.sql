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
    dateRegistered DATE NOT NULL,
    gender VARCHAR(20),
    idNumber VARCHAR(20),
    PRIMARY KEY (userId),
    INDEX idx_email (emailAddress),
    INDEX idx_active (isActive)
);

-- Junction table to handle multiple roles per user
CREATE TABLE UserRoles (
    userRoleId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    userRole ENUM('ADMIN','HOD','LECTURER','COORDINATOR','STUDENT') NOT NULL,
    PRIMARY KEY (userRoleId),
    FOREIGN KEY (userId) REFERENCES Users(userId),
    UNIQUE KEY unique_user_role (userId, userRole),
    INDEX idx_role (userRole)
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
    FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId),
    INDEX idx_faculty (facultyId)
);

CREATE TABLE Qualification (
    qualificationId INT NOT NULL AUTO_INCREMENT,
    qualificationName VARCHAR(100) NOT NULL,
    qualificationCode VARCHAR(20) UNIQUE NOT NULL,
    duration INT NOT NULL CHECK (duration > 0),
    totalCredits INT NOT NULL CHECK (totalCredits > 0),
    departmentId INT NOT NULL,
    PRIMARY KEY (qualificationId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    INDEX idx_department (departmentId),
    INDEX idx_code (qualificationCode)
);

CREATE TABLE Student (
    studentId INT NOT NULL,
    studentNumber VARCHAR(20) UNIQUE NOT NULL,
    levelOfEducation VARCHAR(20),
    yearOfStudy INT NOT NULL CHECK (yearOfStudy > 0),
    qualificationId INT NOT NULL,
    PRIMARY KEY (studentId),
    FOREIGN KEY (studentId) REFERENCES Users(userId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId),
    INDEX idx_student_number (studentNumber),
    INDEX idx_qualification (qualificationId)
);

CREATE TABLE Lecturer (
    lecturerId INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (lecturerId),
    FOREIGN KEY (lecturerId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    INDEX idx_department (departmentId)
);

CREATE TABLE Module (
    moduleId INT NOT NULL AUTO_INCREMENT,
    moduleName VARCHAR(100) NOT NULL,
    moduleCode VARCHAR(20) UNIQUE NOT NULL,
    credits INT NOT NULL CHECK (credits > 0),
    departmentId INT NOT NULL,
    PRIMARY KEY (moduleId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    INDEX idx_code (moduleCode),
    INDEX idx_department (departmentId)
);

CREATE TABLE Coordinator (
    coordinatorId INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (coordinatorId),
    FOREIGN KEY (coordinatorId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    INDEX idx_department (departmentId)
);

CREATE TABLE HOD (
    hodId INT NOT NULL,
    departmentId INT NOT NULL,
    PRIMARY KEY (hodId),
    FOREIGN KEY (hodId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    INDEX idx_department (departmentId)
);

CREATE TABLE StudentModule(
    studentModuleId INT NOT NULL AUTO_INCREMENT,
    studentId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (studentModuleId),
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    UNIQUE KEY unique_student_module (studentId, moduleId),
    INDEX idx_student (studentId),
    INDEX idx_module (moduleId)
);

CREATE TABLE LecturerModule(
    lecturerModuleId INT NOT NULL AUTO_INCREMENT,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (lecturerModuleId),
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    UNIQUE KEY unique_lecturer_module (lecturerId, moduleId),
    INDEX idx_lecturer (lecturerId),
    INDEX idx_module (moduleId)
);

CREATE TABLE CoordinatorModule(
    coordinatorModuleId INT NOT NULL AUTO_INCREMENT,
    coordinatorId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (coordinatorModuleId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    UNIQUE KEY unique_coordinator_module (coordinatorId, moduleId),
    INDEX idx_coordinator (coordinatorId),
    INDEX idx_module (moduleId)
);

CREATE TABLE QualificationModule (
    qualificationModuleId INT NOT NULL AUTO_INCREMENT,
    qualificationId INT NOT NULL,
    moduleId INT NOT NULL,
    academicYear INT NOT NULL CHECK (academicYear > 0),
    semesterNo INT NOT NULL CHECK (semesterNo > 0),
    isCompulsory BOOLEAN NOT NULL,
    PRIMARY KEY (qualificationModuleId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    INDEX idx_qualification (qualificationId),
    INDEX idx_module (moduleId)
);

CREATE TABLE Assessment (
    assessmentId INT NOT NULL AUTO_INCREMENT,
    assessmentName VARCHAR(100) NOT NULL,
    totalMark INT NOT NULL CHECK (totalMark > 0),
    weighting DECIMAL(5,2) NOT NULL CHECK (weighting >= 0 AND weighting <= 100),
    dueDate DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (assessmentId),
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    INDEX idx_lecturer (lecturerId),
    INDEX idx_module (moduleId),
    INDEX idx_due_date (dueDate)
);

CREATE TABLE ClassSession(
    sessionId INT NOT NULL AUTO_INCREMENT,
    classType VARCHAR(20) NOT NULL,
    createdAt DATETIME NOT NULL,
    expiresAt DATETIME NOT NULL,
    attendanceCode VARCHAR(10),
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    PRIMARY KEY (sessionId),
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    INDEX idx_lecturer (lecturerId),
    INDEX idx_module (moduleId),
    INDEX idx_expires (expiresAt)
);

CREATE TABLE AttendanceRecord (
    attendanceRecordId INT NOT NULL AUTO_INCREMENT,
    studentId INT NOT NULL,
    sessionId INT NOT NULL,
    PRIMARY KEY (attendanceRecordId),
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (sessionId) REFERENCES ClassSession(sessionId),
    UNIQUE KEY unique_student_session (studentId, sessionId),
    INDEX idx_student (studentId),
    INDEX idx_session (sessionId)
);

CREATE TABLE MarkEntry (
    markEntryId INT NOT NULL AUTO_INCREMENT,
    mark DECIMAL(5,2),
    submission BOOLEAN NOT NULL DEFAULT FALSE,
    dateSubmitted DATETIME,
    studentId INT NOT NULL,
    assessmentId INT NOT NULL,
    PRIMARY KEY(markEntryId),
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (assessmentId) REFERENCES Assessment(assessmentId),
    UNIQUE KEY unique_student_assessment (studentId, assessmentId),
    INDEX idx_student (studentId),
    INDEX idx_assessment (assessmentId),
    INDEX idx_submission (submission)
);

CREATE TABLE RiskReport (
    riskReportId INT NOT NULL AUTO_INCREMENT,
    studentModuleId INT NOT NULL,
    riskLevel ENUM('LOW','MODERATE','HIGH') NOT NULL,
    attendanceRate DECIMAL(5,2) NOT NULL CHECK (attendanceRate >= 0 AND attendanceRate <= 100),
    submissionRate DECIMAL(5,2) NOT NULL CHECK (submissionRate >= 0 AND submissionRate <= 100),
    averageMark DECIMAL(5,2) NOT NULL CHECK (averageMark >= 0 AND averageMark <= 100),
    calculatedAt DATETIME NOT NULL,
    PRIMARY KEY (riskReportId),
    FOREIGN KEY (studentModuleId) REFERENCES StudentModule(studentModuleId),
    INDEX idx_student_module (studentModuleId),
    INDEX idx_calculated (calculatedAt)
);

CREATE TABLE Intervention (
    interventionId INT NOT NULL AUTO_INCREMENT,
    studentModuleId INT NOT NULL,
    coordinatorId INT NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    status ENUM('ACTIVE','FOLLOW_UP_DUE','CLOSED') NOT NULL,
    PRIMARY KEY (interventionId),
    FOREIGN KEY (studentModuleId) REFERENCES StudentModule(studentModuleId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId),
    INDEX idx_student_module (studentModuleId),
    INDEX idx_coordinator (coordinatorId),
    INDEX idx_status (status)
);

CREATE TABLE FollowUp (
    followUpId INT NOT NULL AUTO_INCREMENT,
    interventionId INT NOT NULL,
    content TEXT NOT NULL,
    outcome ENUM('IMPROVED','NO_CHANGE','WORSENED') NOT NULL,
    createdAt DATETIME NOT NULL,
    PRIMARY KEY (followUpId),
    FOREIGN KEY (interventionId) REFERENCES Intervention(interventionId),
    INDEX idx_intervention (interventionId)
);
CREATE DATABASE Academia;
USE Academia;

CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    title VARCHAR(10),
    emailAddress VARCHAR(100) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    contactNo VARCHAR(15),
    isActive BOOLEAN DEFAULT TRUE,
    dateRegistered DATETIME DEFAULT CURRENT_TIMESTAMP,
    gender VARCHAR(20),
    idNumber VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE UserRoles (
    userRoleId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    userRole ENUM('ADMIN','HOD','LECTURER','COORDINATOR','STUDENT') NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    UNIQUE KEY unique_user_role (userId, userRole)
);

CREATE TABLE Faculty (
    facultyId INT AUTO_INCREMENT PRIMARY KEY,
    facultyName VARCHAR(100) NOT NULL
);

CREATE TABLE Department (
    departmentId INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(50) NOT NULL,
    facultyId INT NOT NULL,
    FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId)
);

CREATE TABLE Qualification (
    qualificationId INT AUTO_INCREMENT PRIMARY KEY,
    qualificationName VARCHAR(100) NOT NULL,
    qualificationCode VARCHAR(20) UNIQUE NOT NULL,
    duration INT NOT NULL,
    totalCredits INT NOT NULL,
    departmentId INT NOT NULL,
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE academicPeriod (
    periodId INT AUTO_INCREMENT PRIMARY KEY,
    academicYear INT NOT NULL,
    semesterNo INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    isActive BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_year_semester (academicYear, semesterNo),
    CHECK (semesterNo > 0),
    CHECK (endDate > startDate)
);

CREATE TABLE Student (
    studentId INT PRIMARY KEY,
    studentNumber VARCHAR(20) UNIQUE NOT NULL,
    levelOfEducation VARCHAR(20),
    yearOfStudy INT NOT NULL,
    qualificationId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Users(userId),
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId)
);

CREATE TABLE Lecturer (
    lecturerId INT PRIMARY KEY,
    staffNumber VARCHAR(20) UNIQUE NOT NULL,
    departmentId INT NOT NULL,
    FOREIGN KEY (lecturerId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Coordinator (
    coordinatorId INT PRIMARY KEY,
    staffNumber VARCHAR(20) UNIQUE NOT NULL,
    departmentId INT NOT NULL,
    FOREIGN KEY (coordinatorId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE HOD (
    hodId INT PRIMARY KEY,
    staffNumber VARCHAR(20) UNIQUE NOT NULL,
    departmentId INT NOT NULL,
    FOREIGN KEY (hodId) REFERENCES Users(userId),
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE Module (
    moduleId INT AUTO_INCREMENT PRIMARY KEY,
    moduleName VARCHAR(100) NOT NULL,
    moduleCode VARCHAR(20) UNIQUE NOT NULL,
    credits INT NOT NULL,
    departmentId INT NOT NULL,
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

CREATE TABLE QualificationModule (
    qualificationModuleId INT AUTO_INCREMENT PRIMARY KEY,
    qualificationId INT NOT NULL,
    moduleId INT NOT NULL,
    academicYear INT NOT NULL,
    semesterNo INT NOT NULL,
    isCompulsory BOOLEAN NOT NULL,
    FOREIGN KEY (qualificationId) REFERENCES Qualification(qualificationId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE StudentModule (
    studentModuleId INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    moduleId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    UNIQUE KEY unique_student_module (studentId, moduleId)
);

CREATE TABLE LecturerModule (
    lecturerModuleId INT AUTO_INCREMENT PRIMARY KEY,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    UNIQUE KEY unique_lecturer_module (lecturerId, moduleId)
);

CREATE TABLE CoordinatorModule (
    coordinatorModuleId INT AUTO_INCREMENT PRIMARY KEY,
    coordinatorId INT NOT NULL,
    moduleId INT NOT NULL,
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId),
    UNIQUE KEY unique_coordinator_module (coordinatorId, moduleId)
);

CREATE TABLE Assessment (
    assessmentId INT AUTO_INCREMENT PRIMARY KEY,
    assessmentName VARCHAR(100) NOT NULL,
    totalMark INT NOT NULL,
    weighting DECIMAL(5,2) NOT NULL,
    dueDate DATE NOT NULL,
    createdAt DATETIME NOT NULL,
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE ClassSession (
    sessionId INT AUTO_INCREMENT PRIMARY KEY,
    classType VARCHAR(20) NOT NULL,
    createdAt DATETIME NOT NULL,
    expiresAt DATETIME NOT NULL,
    attendanceCode VARCHAR(10),
    lecturerId INT NOT NULL,
    moduleId INT NOT NULL,
    FOREIGN KEY (lecturerId) REFERENCES Lecturer(lecturerId),
    FOREIGN KEY (moduleId) REFERENCES Module(moduleId)
);

CREATE TABLE AttendanceRecord (
    attendanceRecordId INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    sessionId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (sessionId) REFERENCES ClassSession(sessionId),
    UNIQUE KEY unique_student_session (studentId, sessionId)
);

CREATE TABLE MarkEntry (
    markEntryId INT AUTO_INCREMENT PRIMARY KEY,
    mark DECIMAL(5,2),
    submission BOOLEAN DEFAULT FALSE,
    dateSubmitted DATETIME,
    studentId INT NOT NULL,
    assessmentId INT NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Student(studentId),
    FOREIGN KEY (assessmentId) REFERENCES Assessment(assessmentId),
    UNIQUE KEY unique_student_assessment (studentId, assessmentId)
);

CREATE TABLE RiskReport (
    riskReportId INT AUTO_INCREMENT PRIMARY KEY,
    studentModuleId INT NOT NULL,
    periodId INT NOT NULL,
    riskLevel ENUM('LOW','MODERATE','HIGH') NOT NULL,
    attendanceRate DECIMAL(5,2) NOT NULL,
    submissionRate DECIMAL(5,2) NOT NULL,
    averageMark DECIMAL(5,2) NOT NULL,
    calculatedAt DATETIME NOT NULL,
    FOREIGN KEY (studentModuleId) REFERENCES StudentModule(studentModuleId),
    FOREIGN KEY (periodId) REFERENCES academicPeriod(periodId),
    UNIQUE KEY unique_student_module_period (studentModuleId, periodId)
);

CREATE TABLE Intervention (
    interventionId INT AUTO_INCREMENT PRIMARY KEY,
    studentModuleId INT NOT NULL,
    coordinatorId INT NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    status ENUM('ACTIVE','FOLLOW_UP_DUE','CLOSED') NOT NULL,
    FOREIGN KEY (studentModuleId) REFERENCES StudentModule(studentModuleId),
    FOREIGN KEY (coordinatorId) REFERENCES Coordinator(coordinatorId)
);

CREATE TABLE FollowUp (
    followUpId INT AUTO_INCREMENT PRIMARY KEY,
    interventionId INT NOT NULL,
    content TEXT NOT NULL,
    outcome ENUM('IMPROVED','NO_CHANGE','WORSENED') NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (interventionId) REFERENCES Intervention(interventionId)
);

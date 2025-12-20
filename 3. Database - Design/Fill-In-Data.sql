INSERT INTO Users (firstName, LastName, title, emailAddress, userPassword, contactNo, isActive, userRole, dateRegistered, gender, idNumber) VALUES 
('John', 'Smith', 'Dr.', 'john.smith@university.edu', 'password123', '1234567890', TRUE, 'Administrator', '2023-01-15', 'Male', '8001015001080'),
('Mary', 'Johnson', 'Prof.', 'mary.johnson@university.edu', 'password456', '2345678901', TRUE, 'H.O.D', '2023-01-16', 'Female', '7502024002081'),
('Robert', 'Williams', 'Dr.', 'robert.williams@university.edu', 'password789', '3456789012', TRUE, 'Lecturer', '2023-01-17', 'Male', '8503034003082'),
('Patricia', 'Brown', 'Dr.', 'patricia.brown@university.edu', 'passwordabc', '4567890123', TRUE, 'Lecturer', '2023-01-18', 'Female', '8704044004083'),
('Michael', 'Jones', 'Mr.', 'michael.jones@university.edu', 'passworddef', '5678901234', TRUE, 'Coordinator', '2023-01-19', 'Male', '9005054005084'),
('Jennifer', 'Garcia', 'Ms.', 'jennifer.garcia@university.edu', 'passwordghi', '6789012345', TRUE, 'Coordinator', '2023-01-20', 'Female', '9106064006085'),
('David', 'Miller', 'Mr.', 'david.miller@university.edu', 'passwordjkl', '7890123456', TRUE, 'Student', '2023-01-21', 'Male', '0007075007086'),
('Linda', 'Davis', 'Ms.', 'linda.davis@university.edu', 'passwordmno', '8901234567', TRUE, 'Student', '2023-01-22', 'Female', '0108085008087'),
('James', 'Rodriguez', 'Mr.', 'james.rodriguez@university.edu', 'passwordpqr', '9012345678', TRUE, 'Student', '2023-01-23', 'Male', '0209095009088'),
('Elizabeth', 'Martinez', 'Ms.', 'elizabeth.martinez@university.edu', 'passwordstu', '0123456789', TRUE, 'Student', '2023-01-24', 'Female', '0310105010089');

INSERT INTO Administrator (adminId) VALUES 
(1);

INSERT INTO Department (departmentName) VALUES 
('Computer Science'),
('Engineering'),
('Business Administration');

INSERT INTO Qualification (qualificationName, qualificationCode, duration, totalCredits, departmentId) VALUES 
('Bachelor of Science in Computer Science', 'BSC-CS', 3, 360, 1),
('Bachelor of Engineering', 'BE', 4, 480, 2),
('Bachelor of Business Administration', 'BBA', 3, 360, 3);

INSERT INTO Student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) VALUES 
(7, 'ST100001', 'Undergraduate', 2, 1),
(8, 'ST100002', 'Undergraduate', 3, 1),
(9, 'ST100003', 'Undergraduate', 2, 2),
(10, 'ST100004', 'Undergraduate', 1, 3);

INSERT INTO Lecturer (lecturerId, departmentId) VALUES 
(3, 1),
(4, 2);

INSERT INTO Module (moduleName, moduleCode, credits, departmentId) VALUES 
('Introduction to Programming', 'CS101', 15, 1),
('Database Systems', 'CS202', 15, 1),
('Engineering Mathematics', 'ENG101', 15, 2),
('Thermodynamics', 'ENG202', 15, 2),
('Marketing Principles', 'BUS101', 15, 3),
('Financial Accounting', 'BUS202', 15, 3);

INSERT INTO Coordinator (coordinatorId, departmentId) VALUES 
(5, 1),
(6, 2);

INSERT INTO HOD (hodId, departmentId) VALUES 
(2, 1);

INSERT INTO StudentModule (studentId, moduleId) VALUES 
(7, 1),
(7, 2),
(8, 1),
(8, 2),
(9, 3),
(9, 4),
(10, 5),
(10, 6);

INSERT INTO LecturerModule (lecturerId, moduleId) VALUES 
(3, 1),
(3, 2),
(4, 3),
(4, 4);

INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES 
(5, 1),
(5, 2),
(6, 3),
(6, 4);

INSERT INTO QualificationModule (qualificationId, moduleId, academicYear, semesterNo, compulsoryModule, electiveModule) VALUES 
(1, 1, 2023, 1, 'Yes', NULL),
(1, 2, 2023, 2, 'Yes', NULL),
(2, 3, 2023, 1, 'Yes', NULL),
(2, 4, 2023, 2, 'Yes', NULL),
(3, 5, 2023, 1, 'Yes', NULL),
(3, 6, 2023, 2, 'Yes', NULL);

INSERT INTO Assessment (assessment_name, totalMark, weighting, dueDate, dateCreated, lecturerId, moduleId) VALUES 
('Programming Assignment 1', 100, 20.0, '2023-03-15', '2023-02-01', 3, 1),
('Database Design Project', 100, 30.0, '2023-04-20', '2023-03-01', 3, 2),
('Engineering Mathematics Test', 50, 15.0, '2023-03-10', '2023-02-15', 4, 3),
('Thermodynamics Exam', 100, 40.0, '2023-05-25', '2023-04-01', 4, 4);

INSERT INTO ClassSession (classType, startTime, EndTime, dateCreated, lecturerId, moduleId) VALUES 
('Lecture', '09:00:00', '11:00:00', '2023-02-01', 3, 1),
('Practical', '14:00:00', '16:00:00', '2023-02-02', 3, 1),
('Lecture', '10:00:00', '12:00:00', '2023-02-03', 3, 2),
('Tutorial', '13:00:00', '15:00:00', '2023-02-04', 4, 3),
('Lecture', '09:00:00', '11:00:00', '2023-02-05', 4, 4);

INSERT INTO AttendanceRecord (StudentId, sessionId) VALUES 
(7, 1),
(7, 2),
(8, 1),
(8, 3),
(9, 4),
(9, 5),
(10, 1);

INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES 
(75.5, TRUE, '2023-03-14', 7, 1),
(68.0, TRUE, '2023-04-19', 7, 2),
(82.5, TRUE, '2023-03-14', 8, 1),
(88.0, TRUE, '2023-04-18', 8, 2),
(65.0, TRUE, '2023-03-09', 9, 3),
(72.0, TRUE, '2023-05-24', 9, 4);


INSERT INTO RiskReport (riskLevel, attendanceRate, submissionRate, marks, studentModuleId) VALUES 
('Low', 95.0, 100.0, 75.5, 1),
('Low', 90.0, 100.0, 68.0, 2),
('Low', 85.0, 100.0, 82.5, 3),
('Medium', 70.0, 100.0, 65.0, 5),
('Low', 80.0, 100.0, 72.0, 6);

INSERT INTO Message (content, dateSent, studentId, coordinatorId) VALUES 
('I need help with the programming assignment.', '2023-03-01', 7, 5),
('Could you provide some resources for database design?', '2023-03-25', 8, 5),
('Im struggling with the engineering concepts.', '2023-03-05', 9, 6),
('When is the next tutorial session?', '2023-04-10', 10, 6);

INSERT INTO Intervention (content, dateSent, studentId, coordinatorId) VALUES 
('Scheduling additional programming tutorial sessions.', '2023-03-02', 7, 5),
('Providing additional resources for database design.', '2023-03-26', 8, 5),
('Setting up one-to-one sessions with engineering tutor.', '2023-03-06', 9, 6),
('Connecting you with peer study group for business modules.', '2023-04-11', 10, 6);

INSERT INTO FollowUP (interventionId, content) VALUES 
(1, 'Programming tutorial session was attended. Student reports improved understanding.'),
(2, 'Resources were utilized effectively. Assignment submission improved.'),
(3, 'One-to-one sessions scheduled weekly. Progress being monitored.'),
(4, 'Student joined peer study group and is participating regularly.');

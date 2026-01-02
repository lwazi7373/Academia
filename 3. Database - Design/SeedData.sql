use academia;

-- Insert Faculties (2)
INSERT INTO Faculty (facultyName) VALUES
('Faculty of Engineering and Technology'),
('Faculty of Business and Management Sciences');

-- Insert Departments (4)
INSERT INTO Department (departmentName, facultyId) VALUES
('Department of Civil Engineering', 1),
('Department of Electrical Engineering', 1),
('Department of Accounting', 2),
('Department of Business Management', 2);

-- Insert Users (10 Students, 3 Lecturers, 2 Coordinators, 1 HOD, 1 Admin = 17 total)
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, gender, idNumber) VALUES
-- Admin
('Admin', 'System', 'Mr', 'admin@academia.ac.za', '$2y$10$hashedpassword', '0111234567', 'Male', '8501011234081'),

-- Lecturers (3)
('John', 'Smith', 'Dr', 'john.smith@academia.ac.za', '$2y$10$hashedpassword', '0112345678', 'Male', '7502151234082'),
('Sarah', 'Johnson', 'Prof', 'sarah.johnson@academia.ac.za', '$2y$10$hashedpassword', '0113456789', 'Female', '7803301234083'),
('David', 'Brown', 'Mr', 'david.brown@academia.ac.za', '$2y$10$hashedpassword', '0114567890', 'Male', '8205121234084'),

-- Coordinators (2)
('Michael', 'Wilson', 'Dr', 'michael.wilson@academia.ac.za', '$2y$10$hashedpassword', '0115678901', 'Male', '7607081234085'),
('Emily', 'Davis', 'Ms', 'emily.davis@academia.ac.za', '$2y$10$hashedpassword', '0116789012', 'Female', '8311221234086'),

-- HOD (1)
('Robert', 'Taylor', 'Prof', 'robert.taylor@academia.ac.za', '$2y$10$hashedpassword', '0117890123', 'Male', '7104091234087'),

-- Students (10)
('James', 'Miller', 'Mr', 'james.miller@student.academia.ac.za', '$2y$10$hashedpassword', '0821112222', 'Male', '0101011234088'),
('Sophia', 'Anderson', 'Ms', 'sophia.anderson@student.academia.ac.za', '$2y$10$hashedpassword', '0822223333', 'Female', '0102021234089'),
('William', 'Thomas', 'Mr', 'william.thomas@student.academia.ac.za', '$2y$10$hashedpassword', '0823334444', 'Male', '0103031234090'),
('Olivia', 'Jackson', 'Ms', 'olivia.jackson@student.academia.ac.za', '$2y$10$hashedpassword', '0824445555', 'Female', '0104041234091'),
('Benjamin', 'White', 'Mr', 'benjamin.white@student.academia.ac.za', '$2y$10$hashedpassword', '0825556666', 'Male', '0105051234092'),
('Emma', 'Harris', 'Ms', 'emma.harris@student.academia.ac.za', '$2y$10$hashedpassword', '0826667777', 'Female', '0106061234093'),
('Daniel', 'Martin', 'Mr', 'daniel.martin@student.academia.ac.za', '$2y$10$hashedpassword', '0827778888', 'Male', '0107071234094'),
('Ava', 'Thompson', 'Ms', 'ava.thompson@student.academia.ac.za', '$2y$10$hashedpassword', '0828889999', 'Female', '0108081234095'),
('Matthew', 'Garcia', 'Mr', 'matthew.garcia@student.academia.ac.za', '$2y$10$hashedpassword', '0829990000', 'Male', '0109091234096'),
('Isabella', 'Martinez', 'Ms', 'isabella.martinez@student.academia.ac.za', '$2y$10$hashedpassword', '0820001111', 'Female', '0110101234097');

-- Insert UserRoles
INSERT INTO UserRoles (userId, userRole) VALUES
(1, 'ADMIN'),
(2, 'LECTURER'),
(3, 'LECTURER'),
(4, 'LECTURER'),
(5, 'COORDINATOR'),
(6, 'COORDINATOR'),
(7, 'HOD'),
(8, 'STUDENT'),
(9, 'STUDENT'),
(10, 'STUDENT'),
(11, 'STUDENT'),
(12, 'STUDENT'),
(13, 'STUDENT'),
(14, 'STUDENT'),
(15, 'STUDENT'),
(16, 'STUDENT'),
(17, 'STUDENT');

-- Insert Qualifications (2)
INSERT INTO Qualification (qualificationName, qualificationCode, duration, totalCredits, departmentId) VALUES
('Bachelor of Engineering in Civil Engineering', 'BENGCE', 4, 480, 1),
('Bachelor of Commerce in Accounting', 'BCOMACC', 3, 360, 3);

-- Insert Modules (6)
INSERT INTO Module (moduleName, moduleCode, credits, departmentId) VALUES
-- Civil Engineering modules
('Structural Analysis', 'CIV101', 15, 1),
('Geotechnical Engineering', 'CIV102', 15, 1),
('Construction Management', 'CIV201', 15, 1),

-- Electrical Engineering modules
('Circuit Theory', 'ELE101', 15, 2),
('Digital Systems', 'ELE102', 15, 2),

-- Accounting module
('Financial Accounting', 'ACC101', 15, 3);

-- Insert QualificationModule
INSERT INTO QualificationModule (qualificationId, moduleId, academicYear, semesterNo, isCompulsory) VALUES
(1, 1, 2025, 1, TRUE),  -- Civil Eng: Structural Analysis
(1, 2, 2025, 1, TRUE),  -- Civil Eng: Geotechnical Engineering
(1, 3, 2025, 2, TRUE),  -- Civil Eng: Construction Management
(1, 4, 2025, 1, TRUE),  -- Civil Eng: Circuit Theory (service module)
(2, 5, 2025, 1, TRUE),  -- Accounting: Digital Systems (service module)
(2, 6, 2025, 1, TRUE);  -- Accounting: Financial Accounting

-- Insert Academic Period (only one active)
INSERT INTO academicPeriod (academicYear, semesterNo, startDate, endDate, isActive) VALUES
(2025, 1, '2025-02-01', '2025-06-30', TRUE),
(2025, 2, '2025-07-15', '2025-11-30', FALSE);

-- Insert Student records
INSERT INTO Student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) VALUES
(8, 'STU2025001', 'Undergraduate', 1, 1),
(9, 'STU2025002', 'Undergraduate', 1, 1),
(10, 'STU2025003', 'Undergraduate', 1, 1),
(11, 'STU2025004', 'Undergraduate', 1, 1),
(12, 'STU2025005', 'Undergraduate', 1, 1),
(13, 'STU2025006', 'Undergraduate', 1, 2),
(14, 'STU2025007', 'Undergraduate', 1, 2),
(15, 'STU2025008', 'Undergraduate', 1, 2),
(16, 'STU2025009', 'Undergraduate', 1, 2),
(17, 'STU2025010', 'Undergraduate', 1, 2);

-- Insert Lecturer records
INSERT INTO Lecturer (lecturerId, staffNumber, departmentId) VALUES
(2, 'STF2025001', 1),  -- John Smith - Civil Engineering
(3, 'STF2025002', 2),  -- Sarah Johnson - Electrical Engineering
(4, 'STF2025003', 3);  -- David Brown - Accounting

-- Insert Coordinator records
INSERT INTO Coordinator (coordinatorId, staffNumber, departmentId) VALUES
(5, 'STF2025004', 1),  -- Michael Wilson - Civil Engineering
(6, 'STF2025005', 3);  -- Emily Davis - Accounting

-- Insert HOD record
INSERT INTO HOD (hodId, staffNumber, departmentId) VALUES
(7, 'STF2025006', 1);  -- Robert Taylor - Civil Engineering

-- Insert StudentModule (assign students to their modules based on qualification)
INSERT INTO StudentModule (studentId, moduleId) VALUES
-- Civil Engineering students (first 5) take CIV101, CIV102, ELE101
(8, 1), (8, 2), (8, 4),
(9, 1), (9, 2), (9, 4),
(10, 1), (10, 2), (10, 4),
(11, 1), (11, 2), (11, 4),
(12, 1), (12, 2), (12, 4),

-- Accounting students (last 5) take ACC101, ELE102
(13, 5), (13, 6),
(14, 5), (14, 6),
(15, 5), (15, 6),
(16, 5), (16, 6),
(17, 5), (17, 6);

-- Insert LecturerModule
INSERT INTO LecturerModule (lecturerId, moduleId) VALUES
(2, 1),  -- John Smith teaches Structural Analysis
(2, 2),  -- John Smith teaches Geotechnical Engineering
(2, 3),  -- John Smith teaches Construction Management
(3, 4),  -- Sarah Johnson teaches Circuit Theory
(3, 5),  -- Sarah Johnson teaches Digital Systems
(4, 6);  -- David Brown teaches Financial Accounting

-- Insert CoordinatorModule
INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES
(5, 1),  -- Michael Wilson coordinates Structural Analysis
(5, 2),  -- Michael Wilson coordinates Geotechnical Engineering
(5, 3),  -- Michael Wilson coordinates Construction Management
(6, 6);  -- Emily Davis coordinates Financial Accounting

-- Insert Assessments (3 per module, total weighting = 100)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
-- Module 1: Structural Analysis
('Test 1', 50, 30.00, '2025-03-15', '2025-02-01', 2, 1),
('Assignment 1', 100, 20.00, '2025-04-15', '2025-02-01', 2, 1),
('Exam', 100, 50.00, '2025-06-01', '2025-02-01', 2, 1),

-- Module 2: Geotechnical Engineering
('Quiz 1', 25, 15.00, '2025-03-10', '2025-02-01', 2, 2),
('Project', 100, 35.00, '2025-05-01', '2025-02-01', 2, 2),
('Exam', 100, 50.00, '2025-06-05', '2025-02-01', 2, 2),

-- Module 4: Circuit Theory
('Lab Report 1', 50, 20.00, '2025-03-20', '2025-02-01', 3, 4),
('Midterm', 75, 30.00, '2025-04-20', '2025-02-01', 3, 4),
('Final Exam', 100, 50.00, '2025-06-10', '2025-02-01', 3, 4),

-- Module 5: Digital Systems
('Assignment 1', 50, 25.00, '2025-03-25', '2025-02-01', 3, 5),
('Test', 50, 25.00, '2025-05-01', '2025-02-01', 3, 5),
('Exam', 100, 50.00, '2025-06-15', '2025-02-01', 3, 5),

-- Module 6: Financial Accounting
('Homework 1', 20, 10.00, '2025-03-05', '2025-02-01', 4, 6),
('Test 1', 50, 30.00, '2025-04-10', '2025-02-01', 4, 6),
('Final Exam', 100, 60.00, '2025-06-20', '2025-02-01', 4, 6);

-- Insert ClassSessions (5 sessions per module)
INSERT INTO ClassSession (classType, createdAt, expiresAt, attendanceCode, lecturerId, moduleId) VALUES
-- Module 1 sessions
('Lecture', '2025-02-05 08:00:00', '2025-02-05 10:00:00', 'ABC123', 2, 1),
('Tutorial', '2025-02-12 10:00:00', '2025-02-12 12:00:00', 'DEF456', 2, 1),
('Lecture', '2025-02-19 08:00:00', '2025-02-19 10:00:00', 'GHI789', 2, 1),
('Practical', '2025-02-26 14:00:00', '2025-02-26 16:00:00', 'JKL012', 2, 1),
('Lecture', '2025-03-05 08:00:00', '2025-03-05 10:00:00', 'MNO345', 2, 1),

-- Module 2 sessions
('Lecture', '2025-02-06 09:00:00', '2025-02-06 11:00:00', 'PQR678', 2, 2),
('Tutorial', '2025-02-13 11:00:00', '2025-02-13 13:00:00', 'STU901', 2, 2),
('Lecture', '2025-02-20 09:00:00', '2025-02-20 11:00:00', 'VWX234', 2, 2),
('Practical', '2025-02-27 15:00:00', '2025-02-27 17:00:00', 'YZA567', 2, 2),
('Lecture', '2025-03-06 09:00:00', '2025-03-06 11:00:00', 'BCD890', 2, 2),

-- Module 4 sessions
('Lecture', '2025-02-07 10:00:00', '2025-02-07 12:00:00', 'EFG123', 3, 4),
('Lab', '2025-02-14 14:00:00', '2025-02-14 16:00:00', 'HIJ456', 3, 4),
('Lecture', '2025-02-21 10:00:00', '2025-02-21 12:00:00', 'KLM789', 3, 4),
('Tutorial', '2025-02-28 16:00:00', '2025-02-28 18:00:00', 'NOP012', 3, 4),
('Lecture', '2025-03-07 10:00:00', '2025-03-07 12:00:00', 'QRS345', 3, 4),

-- Module 5 sessions
('Lecture', '2025-02-08 11:00:00', '2025-02-08 13:00:00', 'TUV678', 3, 5),
('Lab', '2025-02-15 15:00:00', '2025-02-15 17:00:00', 'WXY901', 3, 5),
('Lecture', '2025-02-22 11:00:00', '2025-02-22 13:00:00', 'ZAB234', 3, 5),
('Tutorial', '2025-03-01 17:00:00', '2025-03-01 19:00:00', 'CDE567', 3, 5),
('Lecture', '2025-03-08 11:00:00', '2025-03-08 13:00:00', 'FGH890', 3, 5),

-- Module 6 sessions
('Lecture', '2025-02-09 12:00:00', '2025-02-09 14:00:00', 'IJK123', 4, 6),
('Tutorial', '2025-02-16 16:00:00', '2025-02-16 18:00:00', 'LMN456', 4, 6),
('Lecture', '2025-02-23 12:00:00', '2025-02-23 14:00:00', 'OPQ789', 4, 6),
('Workshop', '2025-03-02 18:00:00', '2025-03-02 20:00:00', 'RST012', 4, 6),
('Lecture', '2025-03-09 12:00:00', '2025-03-09 14:00:00', 'UVW345', 4, 6);

-- Insert AttendanceRecords (varying attendance to create risk profiles)
-- Creating: 3 HIGH risk (attendance < 60%), 4 MODERATE (60-80%), 3 LOW (>80%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
-- Student 8 (HIGH risk - attends only 2/5 sessions in module 1)
(8, 1), (8, 3),  -- Attends 2 sessions

-- Student 9 (MODERATE risk - attends 3/5 sessions in module 1)
(9, 1), (9, 2), (9, 4),

-- Student 10 (LOW risk - attends all 5 sessions in module 1)
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5),

-- Student 11 (HIGH risk - attends 1/5 sessions in module 2)
(11, 6),  -- Attends only 1 session

-- Student 12 (MODERATE risk - attends 4/5 sessions in module 2)
(12, 6), (12, 7), (12, 8), (12, 9),

-- Continue similar pattern for other modules...

-- Module 4: Circuit Theory
(8, 11), (8, 12),  -- HIGH risk (2/5)
(9, 11), (9, 12), (9, 13),  -- MODERATE (3/5)
(10, 11), (10, 12), (10, 13), (10, 14), (10, 15),  -- LOW (5/5)
(11, 11),  -- HIGH (1/5)
(12, 11), (12, 12), (12, 13), (12, 14),  -- MODERATE (4/5)

-- Module 5: Digital Systems (Accounting students)
(13, 16), (13, 17),  -- HIGH risk (2/5)
(14, 16), (14, 17), (14, 18),  -- MODERATE (3/5)
(15, 16), (15, 17), (15, 18), (15, 19), (15, 20),  -- LOW (5/5)
(16, 16),  -- HIGH (1/5)
(17, 16), (17, 17), (17, 18), (17, 19);  -- MODERATE (4/5)

-- Insert MarkEntries (varying marks to create risk profiles)
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
-- Module 1 assessments for students 8-12
-- Student 8 (HIGH risk: low marks, missing submissions)
(35.00, TRUE, '2025-03-14', 8, 1),
(NULL, FALSE, NULL, 8, 2),
(45.00, TRUE, '2025-06-01', 8, 3),

-- Student 9 (MODERATE risk: average marks)
(62.00, TRUE, '2025-03-14', 9, 1),
(70.00, TRUE, '2025-04-14', 9, 2),
(58.00, TRUE, '2025-06-01', 9, 3),

-- Student 10 (LOW risk: good marks)
(85.00, TRUE, '2025-03-14', 10, 1),
(92.00, TRUE, '2025-04-14', 10, 2),
(88.00, TRUE, '2025-06-01', 10, 3),

-- Student 11 (HIGH risk: very low marks)
(28.00, TRUE, '2025-03-14', 11, 1),
(NULL, FALSE, NULL, 11, 2),
(32.00, TRUE, '2025-06-01', 11, 3),

-- Student 12 (MODERATE risk: borderline marks)
(55.00, TRUE, '2025-03-14', 12, 1),
(60.00, TRUE, '2025-04-14', 12, 2),
(52.00, TRUE, '2025-06-01', 12, 3),

-- Module 2 assessments
(30.00, TRUE, '2025-03-09', 8, 4),
(NULL, FALSE, NULL, 8, 5),
(40.00, TRUE, '2025-06-04', 8, 6),

-- Module 4 assessments
(65.00, TRUE, '2025-03-19', 13, 7),
(70.00, TRUE, '2025-04-19', 13, 8),
(75.00, TRUE, '2025-06-09', 13, 9),

-- Module 6 assessments
(15.00, TRUE, '2025-03-04', 13, 13),
(40.00, TRUE, '2025-04-09', 13, 14),
(55.00, TRUE, '2025-06-19', 13, 15);

-- Insert RiskReport (based on calculated performance)
INSERT INTO RiskReport (studentModuleId, periodId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt) VALUES
-- HIGH risk students
(1, 1, 'HIGH', 40.00, 66.67, 40.00, '2025-06-30'),  -- Student 8, Module 1
(4, 1, 'HIGH', 20.00, 66.67, 30.00, '2025-06-30'),  -- Student 11, Module 2
(19, 1, 'HIGH', 40.00, 100.00, 48.33, '2025-06-30'),  -- Student 13, Module 6

-- MODERATE risk students
(2, 1, 'MODERATE', 60.00, 100.00, 63.33, '2025-06-30'),  -- Student 9, Module 1
(5, 1, 'MODERATE', 80.00, 100.00, 55.67, '2025-06-30'),  -- Student 12, Module 2
(20, 1, 'MODERATE', 60.00, 100.00, 70.00, '2025-06-30'),  -- Student 14, Module 5

-- LOW risk students
(3, 1, 'LOW', 100.00, 100.00, 88.33, '2025-06-30'),  -- Student 10, Module 1
(21, 1, 'LOW', 100.00, 100.00, 82.50, '2025-06-30'),  -- Student 15, Module 5
(22, 1, 'LOW', 80.00, 100.00, 78.00, '2025-06-30');  -- Student 16, Module 6

-- Insert Interventions (for HIGH risk students)
INSERT INTO Intervention (studentModuleId, coordinatorId, content, createdAt, status) VALUES
(1, 5, 'Student has poor attendance and low marks. Schedule meeting to discuss study strategies.', '2025-04-01', 'ACTIVE'),
(4, 5, 'Multiple missed submissions and very low marks. Requires academic support.', '2025-04-05', 'FOLLOW_UP_DUE'),
(19, 6, 'Borderline performance in Financial Accounting. Recommend tutoring.', '2025-04-10', 'CLOSED');

-- Insert FollowUps
INSERT INTO FollowUp (interventionId, content, outcome, createdAt) VALUES
(2, 'Student attended one tutoring session but still struggling with basic concepts.', 'NO_CHANGE', '2025-04-20'),
(3, 'Student improved after attending extra tutoring sessions. Now passing.', 'IMPROVED', '2025-05-15');
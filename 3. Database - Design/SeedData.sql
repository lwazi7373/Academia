-- Academia Database Seed Data
-- Academic Year 2025-2026

USE Academia;

-- ============================================
-- FACULTY DATA
-- ============================================
INSERT INTO Faculty (facultyName) VALUES
('Faculty of Engineering and the Built Environment'),
('Faculty of Science'),
('Faculty of Commerce, Law and Management'),
('Faculty of Health Sciences');

-- ============================================
-- DEPARTMENT DATA
-- ============================================
INSERT INTO Department (departmentName, facultyId) VALUES
-- Engineering Departments
('Computer Science', 1),
('Electrical Engineering', 1),
('Civil Engineering', 1),
('Mechanical Engineering', 1),
-- Science Departments
('Mathematics', 2),
('Physics', 2),
('Chemistry', 2),
('Biological Sciences', 2),
-- Commerce Departments
('Accounting', 3),
('Business Management', 3),
('Economics', 3),
-- Health Sciences Departments
('Nursing', 4),
('Physiotherapy', 4);

-- ============================================
-- QUALIFICATION DATA
-- ============================================
INSERT INTO Qualification (qualificationName, qualificationCode, duration, totalCredits, departmentId) VALUES
('Bachelor of Science in Computer Science', 'BSCS', 3, 360, 1),
('Bachelor of Science in Electrical Engineering', 'BSEE', 4, 480, 2),
('Bachelor of Science in Mathematics', 'BSMATH', 3, 360, 5),
('Bachelor of Commerce in Accounting', 'BCOM-ACC', 3, 360, 9),
('Bachelor of Science in Nursing', 'BSNURS', 4, 480, 12);

-- ============================================
-- ACADEMIC PERIODS
-- ============================================
INSERT INTO academicPeriod (academicYear, semesterNo, startDate, endDate, isActive) VALUES
(2024, 1, '2024-02-01', '2024-06-30', FALSE),
(2024, 2, '2024-07-15', '2024-11-30', FALSE),
(2025, 1, '2025-02-01', '2025-06-30', FALSE),
(2025, 2, '2025-07-15', '2025-11-30', TRUE),  -- ACTIVE PERIOD
(2026, 1, '2026-02-01', '2026-06-30', FALSE);

-- ============================================
-- USERS DATA (Students, Lecturers, Coordinators, HODs, Admin)
-- ============================================

-- Admin Users
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, gender, idNumber) VALUES
('Sarah', 'Johnson', 'Dr', 'sarah.johnson@academia.ac.za', 'hashed_password_1', '0821234567', TRUE, 'Female', '8505120234567'),
('Michael', 'Chen', 'Prof', 'michael.chen@academia.ac.za', 'hashed_password_2', '0827654321', TRUE, 'Male', '7803150345678');

-- HOD Users
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, gender, idNumber) VALUES
('David', 'Nkosi', 'Prof', 'david.nkosi@academia.ac.za', 'hashed_password_3', '0831234567', TRUE, 'Male', '7209080456789'),
('Linda', 'van der Merwe', 'Dr', 'linda.vandermerwe@academia.ac.za', 'hashed_password_4', '0834567890', TRUE, 'Female', '7811230567890'),
('James', 'Mbeki', 'Prof', 'james.mbeki@academia.ac.za', 'hashed_password_5', '0837654321', TRUE, 'Male', '7504140678901'),
('Patricia', 'Smith', 'Dr', 'patricia.smith@academia.ac.za', 'hashed_password_6', '0839876543', TRUE, 'Female', '8006250789012');

-- Coordinator Users
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, gender, idNumber) VALUES
('Robert', 'Botha', 'Dr', 'robert.botha@academia.ac.za', 'hashed_password_7', '0841234567', TRUE, 'Male', '8107080890123'),
('Nomsa', 'Dlamini', 'Dr', 'nomsa.dlamini@academia.ac.za', 'hashed_password_8', '0845678901', TRUE, 'Female', '8309150901234'),
('Peter', 'Williams', 'Dr', 'peter.williams@academia.ac.za', 'hashed_password_9', '0848765432', TRUE, 'Male', '7906200012345'),
('Thandi', 'Mthembu', 'Dr', 'thandi.mthembu@academia.ac.za', 'hashed_password_10', '0842345678', TRUE, 'Female', '8512100123456');

-- Lecturer Users
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, gender, idNumber) VALUES
('John', 'Patel', 'Mr', 'john.patel@academia.ac.za', 'hashed_password_11', '0851234567', TRUE, 'Male', '8808120234567'),
('Mary', 'Ndlovu', 'Ms', 'mary.ndlovu@academia.ac.za', 'hashed_password_12', '0854567890', TRUE, 'Female', '9002180345678'),
('Ahmed', 'Hassan', 'Dr', 'ahmed.hassan@academia.ac.za', 'hashed_password_13', '0857654321', TRUE, 'Male', '8605050456789'),
('Susan', 'Khumalo', 'Ms', 'susan.khumalo@academia.ac.za', 'hashed_password_14', '0859876543', TRUE, 'Female', '9104120567890'),
('Thomas', 'Brown', 'Mr', 'thomas.brown@academia.ac.za', 'hashed_password_15', '0852345678', TRUE, 'Male', '8711250678901'),
('Rachel', 'Zulu', 'Dr', 'rachel.zulu@academia.ac.za', 'hashed_password_16', '0856789012', TRUE, 'Female', '8903080789012'),
('Daniel', 'Coetzee', 'Mr', 'daniel.coetzee@academia.ac.za', 'hashed_password_17', '0853456789', TRUE, 'Male', '9006150890123'),
('Jennifer', 'Sithole', 'Ms', 'jennifer.sithole@academia.ac.za', 'hashed_password_18', '0858901234', TRUE, 'Female', '9108200901234');

-- Student Users (15 students with varied profiles)
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, gender, idNumber) VALUES
('Sipho', 'Mahlangu', 'Mr', 'sipho.mahlangu@student.academia.ac.za', 'hashed_password_19', '0731234567', TRUE, 'Male', '0301150123456'),
('Lerato', 'Mokoena', 'Ms', 'lerato.mokoena@student.academia.ac.za', 'hashed_password_20', '0734567890', TRUE, 'Female', '0405200234567'),
('Thabo', 'Radebe', 'Mr', 'thabo.radebe@student.academia.ac.za', 'hashed_password_21', '0737654321', TRUE, 'Male', '0308100345678'),
('Zanele', 'Ntuli', 'Ms', 'zanele.ntuli@student.academia.ac.za', 'hashed_password_22', '0739876543', TRUE, 'Female', '0506250456789'),
('Lungile', 'Shabangu', 'Mr', 'lungile.shabangu@student.academia.ac.za', 'hashed_password_23', '0732345678', TRUE, 'Male', '0407050567890'),
('Precious', 'Ndaba', 'Ms', 'precious.ndaba@student.academia.ac.za', 'hashed_password_24', '0736789012', TRUE, 'Female', '0509120678901'),
('Mandla', 'Kgomo', 'Mr', 'mandla.kgomo@student.academia.ac.za', 'hashed_password_25', '0733456789', TRUE, 'Male', '0402150789012'),
('Nosipho', 'Cele', 'Ms', 'nosipho.cele@student.academia.ac.za', 'hashed_password_26', '0738901234', TRUE, 'Female', '0510200890123'),
('Bongani', 'Vilakazi', 'Mr', 'bongani.vilakazi@student.academia.ac.za', 'hashed_password_27', '0735678901', TRUE, 'Male', '0311080901234'),
('Noluthando', 'Buthelezi', 'Ms', 'noluthando.buthelezi@student.academia.ac.za', 'hashed_password_28', '0741234567', TRUE, 'Female', '0412100012345'),
('Sibusiso', 'Dube', 'Mr', 'sibusiso.dube@student.academia.ac.za', 'hashed_password_29', '0744567890', TRUE, 'Male', '0306150123456'),
('Thembisile', 'Ngwenya', 'Ms', 'thembisile.ngwenya@student.academia.ac.za', 'hashed_password_30', '0747654321', TRUE, 'Female', '0508200234567'),
('Kagiso', 'Molefe', 'Mr', 'kagiso.molefe@student.academia.ac.za', 'hashed_password_31', '0749876543', TRUE, 'Male', '0410050345678'),
('Ayanda', 'Nkosi', 'Ms', 'ayanda.nkosi@student.academia.ac.za', 'hashed_password_32', '0742345678', TRUE, 'Female', '0501120456789'),
('Mthokozisi', 'Zwane', 'Mr', 'mthokozisi.zwane@student.academia.ac.za', 'hashed_password_33', '0746789012', TRUE, 'Male', '0403180567890');

-- ============================================
-- USER ROLES
-- ============================================
INSERT INTO UserRoles (userId, userRole) VALUES
-- Admins
(1, 'ADMIN'),
(2, 'ADMIN'),
-- HODs
(3, 'HOD'),
(4, 'HOD'),
(5, 'HOD'),
(6, 'HOD'),
-- Coordinators
(7, 'COORDINATOR'),
(8, 'COORDINATOR'),
(9, 'COORDINATOR'),
(10, 'COORDINATOR'),
-- Lecturers
(11, 'LECTURER'),
(12, 'LECTURER'),
(13, 'LECTURER'),
(14, 'LECTURER'),
(15, 'LECTURER'),
(16, 'LECTURER'),
(17, 'LECTURER'),
(18, 'LECTURER'),
-- Students
(19, 'STUDENT'),
(20, 'STUDENT'),
(21, 'STUDENT'),
(22, 'STUDENT'),
(23, 'STUDENT'),
(24, 'STUDENT'),
(25, 'STUDENT'),
(26, 'STUDENT'),
(27, 'STUDENT'),
(28, 'STUDENT'),
(29, 'STUDENT'),
(30, 'STUDENT'),
(31, 'STUDENT'),
(32, 'STUDENT'),
(33, 'STUDENT');

-- ============================================
-- HOD ASSIGNMENTS
-- ============================================
INSERT INTO HOD (hodId, staffNumber, departmentId) VALUES
(3, 'STF2020001', 1),  -- Computer Science
(4, 'STF2020002', 5),  -- Mathematics
(5, 'STF2021001', 9),  -- Accounting
(6, 'STF2021002', 12); -- Nursing

-- ============================================
-- COORDINATOR ASSIGNMENTS
-- ============================================
INSERT INTO Coordinator (coordinatorId, staffNumber, departmentId) VALUES
(7, 'STF2022001', 1),  -- Computer Science
(8, 'STF2022002', 5),  -- Mathematics
(9, 'STF2023001', 9),  -- Accounting
(10, 'STF2023002', 12); -- Nursing

-- ============================================
-- LECTURER ASSIGNMENTS
-- ============================================
INSERT INTO Lecturer (lecturerId, staffNumber, departmentId) VALUES
(11, 'STF2024001', 1),  -- Computer Science
(12, 'STF2024002', 1),  -- Computer Science
(13, 'STF2024003', 5),  -- Mathematics
(14, 'STF2024004', 5),  -- Mathematics
(15, 'STF2025001', 9),  -- Accounting
(16, 'STF2025002', 9),  -- Accounting
(17, 'STF2025003', 12), -- Nursing
(18, 'STF2025004', 12); -- Nursing

-- ============================================
-- STUDENT ASSIGNMENTS
-- ============================================
INSERT INTO Student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) VALUES
-- Computer Science Students (varied year levels)
(19, 'STU2023001', 'Undergraduate', 3, 1),
(20, 'STU2024001', 'Undergraduate', 2, 1),
(21, 'STU2024002', 'Undergraduate', 2, 1),
(22, 'STU2025001', 'Undergraduate', 1, 1),
-- Mathematics Students
(23, 'STU2023002', 'Undergraduate', 3, 3),
(24, 'STU2024003', 'Undergraduate', 2, 3),
(25, 'STU2025002', 'Undergraduate', 1, 3),
-- Accounting Students
(26, 'STU2023003', 'Undergraduate', 3, 4),
(27, 'STU2024004', 'Undergraduate', 2, 4),
(28, 'STU2025003', 'Undergraduate', 1, 4),
-- Nursing Students
(29, 'STU2022001', 'Undergraduate', 4, 5),
(30, 'STU2023004', 'Undergraduate', 3, 5),
(31, 'STU2024005', 'Undergraduate', 2, 5),
(32, 'STU2025004', 'Undergraduate', 1, 5),
(33, 'STU2025005', 'Undergraduate', 1, 5);

-- ============================================
-- MODULE DATA
-- ============================================
INSERT INTO Module (moduleName, moduleCode, credits, departmentId) VALUES
-- Computer Science Modules
('Programming Fundamentals', 'CSC101', 15, 1),
('Data Structures and Algorithms', 'CSC201', 15, 1),
('Database Systems', 'CSC202', 15, 1),
('Software Engineering', 'CSC301', 20, 1),
('Artificial Intelligence', 'CSC302', 20, 1),
-- Mathematics Modules
('Calculus I', 'MAT101', 15, 5),
('Linear Algebra', 'MAT102', 15, 5),
('Statistics', 'MAT201', 15, 5),
('Abstract Algebra', 'MAT301', 20, 5),
-- Accounting Modules
('Financial Accounting I', 'ACC101', 15, 9),
('Management Accounting', 'ACC201', 15, 9),
('Taxation', 'ACC202', 15, 9),
('Auditing', 'ACC301', 20, 9),
-- Nursing Modules
('Anatomy and Physiology', 'NUR101', 20, 12),
('Fundamentals of Nursing', 'NUR102', 20, 12),
('Pharmacology', 'NUR201', 20, 12),
('Clinical Practice', 'NUR301', 25, 12);

-- ============================================
-- QUALIFICATION MODULES
-- ============================================
INSERT INTO QualificationModule (qualificationId, moduleId, academicYear, semesterNo, isCompulsory) VALUES
-- Computer Science Curriculum
(1, 1, 1, 1, TRUE),  -- Programming Fundamentals
(1, 2, 2, 1, TRUE),  -- Data Structures
(1, 3, 2, 2, TRUE),  -- Database Systems
(1, 4, 3, 1, TRUE),  -- Software Engineering
(1, 5, 3, 2, FALSE), -- AI (elective)
-- Mathematics Curriculum
(3, 6, 1, 1, TRUE),  -- Calculus I
(3, 7, 1, 2, TRUE),  -- Linear Algebra
(3, 8, 2, 1, TRUE),  -- Statistics
(3, 9, 3, 1, TRUE),  -- Abstract Algebra
-- Accounting Curriculum
(4, 10, 1, 1, TRUE), -- Financial Accounting I
(4, 11, 2, 1, TRUE), -- Management Accounting
(4, 12, 2, 2, TRUE), -- Taxation
(4, 13, 3, 1, TRUE), -- Auditing
-- Nursing Curriculum
(5, 14, 1, 1, TRUE), -- Anatomy
(5, 15, 1, 2, TRUE), -- Fundamentals
(5, 16, 2, 1, TRUE), -- Pharmacology
(5, 17, 3, 1, TRUE); -- Clinical Practice

-- ============================================
-- LECTURER MODULE ASSIGNMENTS
-- ============================================
INSERT INTO LecturerModule (lecturerId, moduleId) VALUES
-- Computer Science Lecturers
(11, 1), (11, 2),  -- John Patel
(12, 3), (12, 4),  -- Mary Ndlovu
-- Mathematics Lecturers
(13, 6), (13, 8),  -- Ahmed Hassan
(14, 7), (14, 9),  -- Susan Khumalo
-- Accounting Lecturers
(15, 10), (15, 11), -- Thomas Brown
(16, 12), (16, 13), -- Rachel Zulu
-- Nursing Lecturers
(17, 14), (17, 15), -- Daniel Coetzee
(18, 16), (18, 17); -- Jennifer Sithole

-- ============================================
-- COORDINATOR MODULE ASSIGNMENTS
-- ============================================
INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES
-- Computer Science Coordinator
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5),
-- Mathematics Coordinator
(8, 6), (8, 7), (8, 8), (8, 9),
-- Accounting Coordinator
(9, 10), (9, 11), (9, 12), (9, 13),
-- Nursing Coordinator
(10, 14), (10, 15), (10, 16), (10, 17);

-- ============================================
-- STUDENT MODULE REGISTRATIONS (Current Semester 2025-2)
-- ============================================
INSERT INTO StudentModule (studentId, moduleId) VALUES
-- Sipho (3rd year CS) - Module 4
(19, 4),
-- Lerato (2nd year CS) - Modules 2, 3
(20, 2), (20, 3),
-- Thabo (2nd year CS) - Modules 2, 3
(21, 2), (21, 3),
-- Zanele (1st year CS) - Module 1
(22, 1),
-- Lungile (3rd year Math) - Module 9
(23, 9),
-- Precious (2nd year Math) - Module 8
(24, 8),
-- Mandla (1st year Math) - Modules 6, 7
(25, 6), (25, 7),
-- Nosipho (3rd year Accounting) - Module 13
(26, 13),
-- Bongani (2nd year Accounting) - Modules 11, 12
(27, 11), (27, 12),
-- Noluthando (1st year Accounting) - Module 10
(28, 10),
-- Sibusiso (4th year Nursing) - Module 17
(29, 17),
-- Thembisile (3rd year Nursing) - Module 17
(30, 17),
-- Kagiso (2nd year Nursing) - Module 16
(31, 16),
-- Ayanda (1st year Nursing) - Modules 14, 15
(32, 14), (32, 15),
-- Mthokozisi (1st year Nursing) - Modules 14, 15
(33, 14), (33, 15);

-- ============================================
-- ASSESSMENTS (Weightings total 100% per module)
-- ============================================

-- Module 1: Programming Fundamentals (CSC101)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 15.00, '2025-08-15', '2025-07-20 10:00:00', 11, 1),
('Test 1', 100, 20.00, '2025-09-10', '2025-07-20 10:00:00', 11, 1),
('Assignment 2', 100, 15.00, '2025-10-05', '2025-07-20 10:00:00', 11, 1),
('Final Exam', 100, 50.00, '2025-11-20', '2025-07-20 10:00:00', 11, 1);

-- Module 2: Data Structures (CSC201)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Practical 1', 100, 20.00, '2025-08-20', '2025-07-20 10:00:00', 11, 2),
('Test 1', 100, 15.00, '2025-09-15', '2025-07-20 10:00:00', 11, 2),
('Practical 2', 100, 20.00, '2025-10-10', '2025-07-20 10:00:00', 11, 2),
('Project', 100, 15.00, '2025-11-05', '2025-07-20 10:00:00', 11, 2),
('Final Exam', 100, 30.00, '2025-11-22', '2025-07-20 10:00:00', 11, 2);

-- Module 3: Database Systems (CSC202)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 15.00, '2025-08-18', '2025-07-20 10:00:00', 12, 3),
('Test 1', 100, 20.00, '2025-09-12', '2025-07-20 10:00:00', 12, 3),
('Project', 100, 25.00, '2025-10-20', '2025-07-20 10:00:00', 12, 3),
('Final Exam', 100, 40.00, '2025-11-21', '2025-07-20 10:00:00', 12, 3);

-- Module 4: Software Engineering (CSC301)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Sprint 1', 100, 20.00, '2025-08-25', '2025-07-20 10:00:00', 12, 4),
('Sprint 2', 100, 20.00, '2025-09-25', '2025-07-20 10:00:00', 12, 4),
('Sprint 3', 100, 20.00, '2025-10-25', '2025-07-20 10:00:00', 12, 4),
('Final Exam', 100, 40.00, '2025-11-23', '2025-07-20 10:00:00', 12, 4);

-- Module 6: Calculus I (MAT101)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 25.00, '2025-08-22', '2025-07-20 10:00:00', 13, 6),
('Test 2', 100, 25.00, '2025-09-20', '2025-07-20 10:00:00', 13, 6),
('Final Exam', 100, 50.00, '2025-11-18', '2025-07-20 10:00:00', 13, 6);

-- Module 7: Linear Algebra (MAT102)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 20.00, '2025-08-17', '2025-07-20 10:00:00', 14, 7),
('Test 1', 100, 30.00, '2025-09-18', '2025-07-20 10:00:00', 14, 7),
('Final Exam', 100, 50.00, '2025-11-19', '2025-07-20 10:00:00', 14, 7);

-- Module 8: Statistics (MAT201)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 15.00, '2025-08-19', '2025-07-20 10:00:00', 13, 8),
('Test 1', 100, 20.00, '2025-09-16', '2025-07-20 10:00:00', 13, 8),
('Assignment 2', 100, 15.00, '2025-10-14', '2025-07-20 10:00:00', 13, 8),
('Final Exam', 100, 50.00, '2025-11-24', '2025-07-20 10:00:00', 13, 8);

-- Module 9: Abstract Algebra (MAT301)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 25.00, '2025-08-28', '2025-07-20 10:00:00', 14, 9),
('Test 2', 100, 25.00, '2025-09-28', '2025-07-20 10:00:00', 14, 9),
('Final Exam', 100, 50.00, '2025-11-25', '2025-07-20 10:00:00', 14, 9);

-- Module 10: Financial Accounting I (ACC101)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 20.00, '2025-08-21', '2025-07-20 10:00:00', 15, 10),
('Assignment', 100, 15.00, '2025-09-17', '2025-07-20 10:00:00', 15, 10),
('Test 2', 100, 20.00, '2025-10-15', '2025-07-20 10:00:00', 15, 10),
('Final Exam', 100, 45.00, '2025-11-26', '2025-07-20 10:00:00', 15, 10);

-- Module 11: Management Accounting (ACC201)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Case Study 1', 100, 25.00, '2025-08-30', '2025-07-20 10:00:00', 15, 11),
('Test 1', 100, 25.00, '2025-09-30', '2025-07-20 10:00:00', 15, 11),
('Final Exam', 100, 50.00, '2025-11-27', '2025-07-20 10:00:00', 15, 11);

-- Module 12: Taxation (ACC202)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 20.00, '2025-08-23', '2025-07-20 10:00:00', 16, 12),
('Test 1', 100, 30.00, '2025-09-22', '2025-07-20 10:00:00', 16, 12),
('Final Exam', 100, 50.00, '2025-11-28', '2025-07-20 10:00:00', 16, 12);

-- Module 13: Auditing (ACC301)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Case Study', 100, 30.00, '2025-09-05', '2025-07-20 10:00:00', 16, 13),
('Test 1', 100, 20.00, '2025-10-03', '2025-07-20 10:00:00', 16, 13),
('Final Exam', 100, 50.00, '2025-11-29', '2025-07-20 10:00:00', 16, 13);

-- Module 14: Anatomy and Physiology (NUR101)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 20.00, '2025-08-16', '2025-07-20 10:00:00', 17, 14),
('Practical Assessment', 100, 30.00, '2025-09-14', '2025-07-20 10:00:00', 17, 14),
('Final Exam', 100, 50.00, '2025-11-17', '2025-07-20 10:00:00', 17, 14);

-- Module 15: Fundamentals of Nursing (NUR102)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Skills Assessment', 100, 25.00, '2025-08-27', '2025-07-20 10:00:00', 17, 15),
('Test 1', 100, 25.00, '2025-09-24', '2025-07-20 10:00:00', 17, 15),
('Final Exam', 100, 50.00, '2025-11-30', '2025-07-20 10:00:00', 17, 15);

-- Module 16: Pharmacology (NUR201)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 25.00, '2025-08-26', '2025-07-20 10:00:00', 18, 16),
('Test 2', 100, 25.00, '2025-09-26', '2025-07-20 10:00:00', 18, 16),
('Final Exam', 100, 50.00, '2025-12-01', '2025-07-20 10:00:00', 18, 16);

-- Module 17: Clinical Practice (NUR301)
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Clinical Portfolio', 100, 40.00, '2025-10-30', '2025-07-20 10:00:00', 18, 17),
('OSCE Exam', 100, 30.00, '2025-11-10', '2025-07-20 10:00:00', 18, 17),
('Final Exam', 100, 30.00, '2025-12-02', '2025-07-20 10:00:00', 18, 17);

-- ============================================
-- CLASS SESSIONS
-- ============================================
INSERT INTO ClassSession (classType, createdAt, expiresAt, attendanceCode, lecturerId, moduleId) VALUES
-- Module 1 Sessions
('Lecture', '2025-07-16 08:00:00', '2025-07-16 10:00:00', 'LEC001', 11, 1),
('Tutorial', '2025-07-18 10:00:00', '2025-07-18 12:00:00', 'TUT001', 11, 1),
('Lecture', '2025-07-23 08:00:00', '2025-07-23 10:00:00', 'LEC002', 11, 1),
('Practical', '2025-07-25 14:00:00', '2025-07-25 17:00:00', 'PRC001', 11, 1),
-- Module 2 Sessions
('Lecture', '2025-07-17 09:00:00', '2025-07-17 11:00:00', 'LEC003', 11, 2),
('Practical', '2025-07-19 13:00:00', '2025-07-19 16:00:00', 'PRC002', 11, 2),
('Lecture', '2025-07-24 09:00:00', '2025-07-24 11:00:00', 'LEC004', 11, 2),
-- Module 3 Sessions
('Lecture', '2025-07-16 10:00:00', '2025-07-16 12:00:00', 'LEC005', 12, 3),
('Practical', '2025-07-18 14:00:00', '2025-07-18 17:00:00', 'PRC003', 12, 3),
('Lecture', '2025-07-23 10:00:00', '2025-07-23 12:00:00', 'LEC006', 12, 3),
-- Module 4 Sessions
('Lecture', '2025-07-17 11:00:00', '2025-07-17 13:00:00', 'LEC007', 12, 4),
('Workshop', '2025-07-22 09:00:00', '2025-07-22 12:00:00', 'WRK001', 12, 4),
-- Module 6 Sessions
('Lecture', '2025-07-16 08:00:00', '2025-07-16 10:00:00', 'LEC008', 13, 6),
('Tutorial', '2025-07-18 08:00:00', '2025-07-18 10:00:00', 'TUT002', 13, 6),
('Lecture', '2025-07-23 08:00:00', '2025-07-23 10:00:00', 'LEC009', 13, 6),
-- Module 8 Sessions
('Lecture', '2025-07-17 13:00:00', '2025-07-17 15:00:00', 'LEC010', 13, 8),
('Practical', '2025-07-19 10:00:00', '2025-07-19 13:00:00', 'PRC004', 13, 8),
-- Module 10 Sessions
('Lecture', '2025-07-16 13:00:00', '2025-07-16 15:00:00', 'LEC011', 15, 10),
('Tutorial', '2025-07-20 09:00:00', '2025-07-20 11:00:00', 'TUT003', 15, 10),
-- Module 14 Sessions
('Lecture', '2025-07-17 08:00:00', '2025-07-17 10:00:00', 'LEC012', 17, 14),
('Practical', '2025-07-19 08:00:00', '2025-07-19 11:00:00', 'PRC005', 17, 14),
('Lecture', '2025-07-24 08:00:00', '2025-07-24 10:00:00', 'LEC013', 17, 14);

-- ============================================
-- ATTENDANCE RECORDS (Varying attendance patterns)
-- ============================================

-- HIGH RISK Student (Zanele - studentId 22, poor attendance)
-- Module 1 - Only 2 out of 4 sessions attended (50%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(22, 1),  -- Attended lecture 1
(22, 3);  -- Attended lecture 2

-- MODERATE RISK Student (Lerato - studentId 20, average attendance)
-- Module 2 - 5 out of 7 sessions (71%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(20, 5), (20, 6), (20, 7);  -- Module 2 - 3 out of 3

-- Module 3 - 2 out of 3 sessions (67%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(20, 8), (20, 10);

-- LOW RISK Student (Thabo - studentId 21, excellent attendance)
-- Module 2 - All sessions
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(21, 5), (21, 6), (21, 7);

-- Module 3 - All sessions
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(21, 8), (21, 9), (21, 10);

-- HIGH RISK Student (Sipho - studentId 19, poor attendance)
-- Module 4 - 1 out of 2 sessions (50%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(19, 11);

-- MODERATE RISK Student (Mandla - studentId 25)
-- Module 6 - 2 out of 3 sessions (67%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(25, 13), (25, 15);

-- LOW RISK Student (Precious - studentId 24)
-- Module 8 - All sessions
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(24, 16), (24, 17);

-- HIGH RISK Student (Noluthando - studentId 28, poor attendance)
-- Module 10 - 1 out of 2 sessions (50%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(28, 18);

-- LOW RISK Student (Ayanda - studentId 32)
-- Module 14 - All sessions
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(32, 20), (32, 21), (32, 22);

-- MODERATE RISK Student (Mthokozisi - studentId 33)
-- Module 14 - 2 out of 3 sessions (67%)
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(33, 20), (33, 22);

-- Additional good attendance records for other students
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
(23, 13), (23, 14), (23, 15),  -- Lungile - Module 9 (no sessions created yet, but Module 6)
(26, 18), (26, 19),  -- Nosipho
(27, 18), (27, 19),  -- Bongani
(29, 20), (29, 21), (29, 22),  -- Sibusiso
(30, 20), (30, 21), (30, 22),  -- Thembisile
(31, 16), (31, 17);  -- Kagiso

-- ============================================
-- MARK ENTRIES (Realistic marks for risk stratification)
-- ============================================

-- HIGH RISK Student - Zanele (studentId 22) - Low marks, poor submission
-- Module 1 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(35.00, TRUE, '2025-08-16 14:30:00', 22, 1),   -- Assignment 1: 35%
(42.00, TRUE, '2025-09-10 15:45:00', 22, 2),   -- Test 1: 42%
(NULL, FALSE, NULL, 22, 3),                     -- Assignment 2: Not submitted
(NULL, FALSE, NULL, 22, 4);                     -- Final Exam: Not yet

-- MODERATE RISK - Lerato (studentId 20) - Average marks
-- Module 2 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(62.00, TRUE, '2025-08-20 16:00:00', 20, 5),   -- Practical 1: 62%
(58.00, TRUE, '2025-09-15 14:20:00', 20, 6),   -- Test 1: 58%
(65.00, TRUE, '2025-10-10 17:30:00', 20, 7),   -- Practical 2: 65%
(NULL, FALSE, NULL, 20, 8),                     -- Project: Not yet
(NULL, FALSE, NULL, 20, 9);                     -- Final Exam: Not yet

-- Module 3 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(60.00, TRUE, '2025-08-18 15:00:00', 20, 10),  -- Assignment 1: 60%
(55.00, TRUE, '2025-09-12 16:30:00', 20, 11),  -- Test 1: 55%
(NULL, FALSE, NULL, 20, 12),                    -- Project: Not yet
(NULL, FALSE, NULL, 20, 13);                    -- Final Exam: Not yet

-- LOW RISK - Thabo (studentId 21) - Good marks, all submitted
-- Module 2 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(78.00, TRUE, '2025-08-19 12:00:00', 21, 5),   -- Practical 1: 78%
(82.00, TRUE, '2025-09-15 13:15:00', 21, 6),   -- Test 1: 82%
(76.00, TRUE, '2025-10-09 14:00:00', 21, 7),   -- Practical 2: 76%
(85.00, TRUE, '2025-11-05 16:00:00', 21, 8),   -- Project: 85%
(NULL, FALSE, NULL, 21, 9);                     -- Final Exam: Not yet

-- Module 3 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(75.00, TRUE, '2025-08-17 14:30:00', 21, 10),  -- Assignment 1: 75%
(80.00, TRUE, '2025-09-12 15:00:00', 21, 11),  -- Test 1: 80%
(82.00, TRUE, '2025-10-20 17:00:00', 21, 12),  -- Project: 82%
(NULL, FALSE, NULL, 21, 13);                    -- Final Exam: Not yet

-- HIGH RISK - Sipho (studentId 19) - Very poor performance
-- Module 4 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(38.00, TRUE, '2025-08-26 23:45:00', 19, 14),  -- Sprint 1: 38% (late)
(NULL, FALSE, NULL, 19, 15),                    -- Sprint 2: Not submitted
(45.00, TRUE, '2025-10-25 16:00:00', 19, 16),  -- Sprint 3: 45%
(NULL, FALSE, NULL, 19, 17);                    -- Final Exam: Not yet

-- MODERATE RISK - Mandla (studentId 25) - Inconsistent performance
-- Module 6 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(68.00, TRUE, '2025-08-22 14:00:00', 25, 21),  -- Test 1: 68%
(52.00, TRUE, '2025-09-20 15:30:00', 25, 22),  -- Test 2: 52%
(NULL, FALSE, NULL, 25, 23);                    -- Final Exam: Not yet

-- Module 7 - Good marks
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(72.00, TRUE, '2025-08-17 13:00:00', 25, 24),  -- Assignment 1: 72%
(70.00, TRUE, '2025-09-18 14:30:00', 25, 25),  -- Test 1: 70%
(NULL, FALSE, NULL, 25, 26);                    -- Final Exam: Not yet

-- LOW RISK - Precious (studentId 24) - Excellent performance
-- Module 8 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(88.00, TRUE, '2025-08-18 11:00:00', 24, 27),  -- Assignment 1: 88%
(85.00, TRUE, '2025-09-16 13:00:00', 24, 28),  -- Test 1: 85%
(90.00, TRUE, '2025-10-14 12:00:00', 24, 29),  -- Assignment 2: 90%
(NULL, FALSE, NULL, 24, 30);                    -- Final Exam: Not yet

-- HIGH RISK - Noluthando (studentId 28) - Poor marks and submissions
-- Module 10 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(40.00, TRUE, '2025-08-21 15:00:00', 28, 31),  -- Test 1: 40%
(NULL, FALSE, NULL, 28, 32),                    -- Assignment: Not submitted
(38.00, TRUE, '2025-10-15 16:00:00', 28, 33),  -- Test 2: 38%
(NULL, FALSE, NULL, 28, 34);                    -- Final Exam: Not yet

-- MODERATE RISK - Bongani (studentId 27)
-- Module 11 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(65.00, TRUE, '2025-08-30 14:00:00', 27, 35),  -- Case Study 1: 65%
(60.00, TRUE, '2025-09-30 15:00:00', 27, 36),  -- Test 1: 60%
(NULL, FALSE, NULL, 27, 37);                    -- Final Exam: Not yet

-- Module 12 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(58.00, TRUE, '2025-08-23 16:00:00', 27, 38),  -- Assignment 1: 58%
(62.00, TRUE, '2025-09-22 14:30:00', 27, 39),  -- Test 1: 62%
(NULL, FALSE, NULL, 27, 40);                    -- Final Exam: Not yet

-- LOW RISK - Nosipho (studentId 26) - Good performance
-- Module 13 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(75.00, TRUE, '2025-09-04 15:00:00', 26, 41),  -- Case Study: 75%
(78.00, TRUE, '2025-10-03 14:00:00', 26, 42),  -- Test 1: 78%
(NULL, FALSE, NULL, 26, 43);                    -- Final Exam: Not yet

-- LOW RISK - Ayanda (studentId 32) - Excellent nursing student
-- Module 14 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(82.00, TRUE, '2025-08-16 13:00:00', 32, 44),  -- Test 1: 82%
(88.00, TRUE, '2025-09-14 15:00:00', 32, 45),  -- Practical: 88%
(NULL, FALSE, NULL, 32, 46);                    -- Final Exam: Not yet

-- Module 15 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(85.00, TRUE, '2025-08-27 14:00:00', 32, 47),  -- Skills: 85%
(80.00, TRUE, '2025-09-24 13:00:00', 32, 48),  -- Test 1: 80%
(NULL, FALSE, NULL, 32, 49);                    -- Final Exam: Not yet

-- MODERATE RISK - Mthokozisi (studentId 33)
-- Module 14 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(62.00, TRUE, '2025-08-16 16:00:00', 33, 44),  -- Test 1: 62%
(58.00, TRUE, '2025-09-14 17:00:00', 33, 45),  -- Practical: 58%
(NULL, FALSE, NULL, 33, 46);                    -- Final Exam: Not yet

-- Module 15 Assessments
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(60.00, TRUE, '2025-08-27 16:00:00', 33, 47),  -- Skills: 60%
(65.00, TRUE, '2025-09-24 15:00:00', 33, 48),  -- Test 1: 65%
(NULL, FALSE, NULL, 33, 49);                    -- Final Exam: Not yet

-- Additional students with good performance
-- Lungile (studentId 23) - Module 9
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(76.00, TRUE, '2025-08-28 12:00:00', 23, 50),  -- Test 1: 76%
(74.00, TRUE, '2025-09-28 13:00:00', 23, 51),  -- Test 2: 74%
(NULL, FALSE, NULL, 23, 52);                    -- Final Exam: Not yet

-- Sibusiso (studentId 29) - Module 17
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(80.00, TRUE, '2025-10-30 16:00:00', 29, 53),  -- Clinical Portfolio: 80%
(82.00, TRUE, '2025-11-10 14:00:00', 29, 54),  -- OSCE: 82%
(NULL, FALSE, NULL, 29, 55);                    -- Final Exam: Not yet

-- Thembisile (studentId 30) - Module 17
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(78.00, TRUE, '2025-10-30 15:00:00', 30, 53),  -- Clinical Portfolio: 78%
(75.00, TRUE, '2025-11-10 15:00:00', 30, 54),  -- OSCE: 75%
(NULL, FALSE, NULL, 30, 55);                    -- Final Exam: Not yet

-- Kagiso (studentId 31) - Module 16 (Skipped)
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(70.00, TRUE, '2025-08-26 14:00:00', 31, 56),  -- Test 1: 70%
(68.00, TRUE, '2025-09-26 15:00:00', 31, 57),  -- Test 2: 68%
(NULL, FALSE, NULL, 31, 58);                    -- Final Exam: Not yet

-- ============================================
-- RISK REPORTS (For active period 2025-2)
-- ============================================

-- HIGH RISK Students
INSERT INTO RiskReport (studentModuleId, periodId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt) VALUES
-- Zanele (studentId 22) - Module 1 (studentModuleId 4)
(4, 4, 'HIGH', 50.00, 50.00, 38.50, '2025-10-01 08:00:00'),

-- Sipho (studentId 19) - Module 4 (studentModuleId 1)
(1, 4, 'HIGH', 50.00, 66.67, 41.50, '2025-10-01 08:00:00'),

-- Noluthando (studentId 28) - Module 10 (studentModuleId 10)
(10, 4, 'HIGH', 50.00, 66.67, 39.00, '2025-10-01 08:00:00');

-- MODERATE RISK Students
INSERT INTO RiskReport (studentModuleId, periodId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt) VALUES
-- Lerato (studentId 20) - Module 2 (studentModuleId 2)
(2, 4, 'MODERATE', 71.43, 75.00, 61.67, '2025-10-01 08:00:00'),

-- Lerato (studentId 20) - Module 3 (studentModuleId 3)
(3, 4, 'MODERATE', 66.67, 50.00, 57.50, '2025-10-01 08:00:00'),

-- Mandla (studentId 25) - Module 6 (studentModuleId 7)
(7, 4, 'MODERATE', 66.67, 66.67, 60.00, '2025-10-01 08:00:00'),

-- Mthokozisi (studentId 33) - Module 14 (studentModuleId 15)
(15, 4, 'MODERATE', 66.67, 66.67, 60.00, '2025-10-01 08:00:00'),

-- Bongani (studentId 27) - Module 11 (studentModuleId 9)
(9, 4, 'MODERATE', 100.00, 66.67, 62.50, '2025-10-01 08:00:00');

-- LOW RISK Students
INSERT INTO RiskReport (studentModuleId, periodId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt) VALUES
-- Thabo (studentId 21) - Module 2 (studentModuleId 5)
(5, 4, 'LOW', 100.00, 100.00, 80.25, '2025-10-01 08:00:00'),

-- Thabo (studentId 21) - Module 3 (studentModuleId 6)
(6, 4, 'LOW', 100.00, 75.00, 79.00, '2025-10-01 08:00:00'),

-- Precious (studentId 24) - Module 8 (studentModuleId 8)
(8, 4, 'LOW', 100.00, 75.00, 87.67, '2025-10-01 08:00:00'),

-- Ayanda (studentId 32) - Module 14 (studentModuleId 13)
(13, 4, 'LOW', 100.00, 66.67, 85.00, '2025-10-01 08:00:00'),

-- Ayanda (studentId 32) - Module 15 (studentModuleId 14)
(14, 4, 'LOW', 100.00, 66.67, 82.50, '2025-10-01 08:00:00'),

-- Nosipho (studentId 26) - Module 13 (studentModuleId 11)
(11, 4, 'LOW', 100.00, 66.67, 76.50, '2025-10-01 08:00:00'),

-- Lungile (studentId 23) - Module 9 (studentModuleId 16)  
-- Note: Using Module 6 attendance as proxy since Module 9 sessions weren't tracked
(16, 4, 'LOW', 100.00, 66.67, 75.00, '2025-10-01 08:00:00');

-- ============================================
-- INTERVENTIONS (For high and moderate risk students)
-- ============================================

-- Interventions for HIGH RISK students
INSERT INTO Intervention (studentModuleId, coordinatorId, content, createdAt, status) VALUES
-- Zanele - Module 1
(4, 7, 'Student is struggling with Programming Fundamentals. Poor attendance (50%) and failing grades (avg 38.5%). Contacted student via email and scheduled a meeting to discuss academic support options including tutoring and study groups. Student advised to attend all remaining classes and submit outstanding Assignment 2.', '2025-10-02 09:00:00', 'ACTIVE'),

-- Sipho - Module 4
(1, 7, 'Senior student showing concerning decline in Software Engineering module. Only 50% attendance and missed Sprint 2 submission entirely. Average mark of 41.5% indicates risk of failure. Met with student who cited personal challenges. Referred to student wellness services and arranged weekly check-ins with lecturer.', '2025-10-02 10:30:00', 'FOLLOW_UP_DUE'),

-- Noluthando - Module 10
(10, 9, 'First-year student struggling significantly in Financial Accounting (39% average). Poor attendance at tutorials and missed one assignment. Student appears overwhelmed with university transition. Arranged peer mentoring with successful second-year student and enrolled in supplementary tutorial program.', '2025-10-02 11:00:00', 'ACTIVE');

-- Interventions for MODERATE RISK students
INSERT INTO Intervention (studentModuleId, coordinatorId, content, createdAt, status) VALUES
-- Lerato - Module 2
(2, 7, 'Student showing moderate risk in Data Structures with 71% attendance and 61.67% average. Performance is passing but inconsistent. Discussed time management strategies and provided additional practice materials. Student committed to improving attendance and completing project on time.', '2025-10-03 09:00:00', 'ACTIVE'),

-- Mandla - Module 6
(8, 8, 'First-year mathematics student with concerning drop in Test 2 performance (52% down from 68%). Attendance at 67%. Student struggling with integration concepts. Arranged additional tutorial sessions and provided past exam papers for practice.', '2025-10-03 10:00:00', 'ACTIVE'),

-- Mthokozisi - Module 14
(15, 10, 'Nursing student showing moderate concerns in Anatomy. Attendance at 67% and marks averaging 60%. Student is working part-time which affects study time. Discussed workload balance and connected with financial aid office to explore bursary options.', '2025-10-03 11:30:00', 'ACTIVE');

-- ============================================
-- FOLLOW-UPS
-- ============================================

INSERT INTO FollowUp (interventionId, content, outcome, createdAt) VALUES
-- Follow-up for Sipho (HIGH RISK - intervention 2)
(2, 'Met with student for scheduled check-in. Student has engaged with wellness services and reports improved mental health. Attended last two lectures and submitted Sprint 3 on time with mark of 45%. Still at risk but showing commitment to improvement. Agreed to continue weekly meetings until end of semester.', 'IMPROVED', '2025-10-16 14:00:00'),

-- Additional follow-up for Sipho
(2, 'Second follow-up meeting held. Student maintaining improved attendance pattern. Lecturer reports active participation in workshop sessions. Student expressed confidence about final exam preparation. Will schedule one final check-in before exam period.', 'IMPROVED', '2025-10-30 15:00:00');
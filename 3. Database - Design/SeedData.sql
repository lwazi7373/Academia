-- Academia Database Comprehensive Seed Data (With Staff Numbers)
USE Academia;

-- Disable foreign key checks for easier insertion
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (optional - comment out if not needed)
TRUNCATE TABLE FollowUp;
TRUNCATE TABLE Intervention;
TRUNCATE TABLE RiskReport;
TRUNCATE TABLE MarkEntry;
TRUNCATE TABLE AttendanceRecord;
TRUNCATE TABLE ClassSession;
TRUNCATE TABLE Assessment;
TRUNCATE TABLE QualificationModule;
TRUNCATE TABLE CoordinatorModule;
TRUNCATE TABLE LecturerModule;
TRUNCATE TABLE StudentModule;
TRUNCATE TABLE HOD;
TRUNCATE TABLE Coordinator;
TRUNCATE TABLE Module;
TRUNCATE TABLE Lecturer;
TRUNCATE TABLE Student;
TRUNCATE TABLE Qualification;
TRUNCATE TABLE Department;
TRUNCATE TABLE Faculty;
TRUNCATE TABLE UserRoles;
TRUNCATE TABLE Users;

-- =====================================================
-- FACULTY DATA
-- =====================================================
INSERT INTO Faculty (facultyId, facultyName) VALUES
(1, 'Faculty of Engineering and Built Environment'),
(2, 'Faculty of Science'),
(3, 'Faculty of Commerce'),
(4, 'Faculty of Humanities'),
(5, 'Faculty of Health Sciences');

-- =====================================================
-- DEPARTMENT DATA
-- =====================================================
INSERT INTO Department (departmentId, departmentName, facultyId) VALUES
(1, 'Computer Science', 1),
(2, 'Electrical Engineering', 1),
(3, 'Civil Engineering', 1),
(4, 'Mathematics', 2),
(5, 'Physics', 2),
(6, 'Chemistry', 2),
(7, 'Accounting', 3),
(8, 'Business Management', 3),
(9, 'Economics', 3),
(10, 'Psychology', 4),
(11, 'Sociology', 4),
(12, 'Nursing', 5);

-- =====================================================
-- USERS DATA (Admin, HODs, Lecturers, Coordinators, Students)
-- =====================================================
INSERT INTO Users (userId, firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, dateRegistered, gender, idNumber) VALUES
-- Admin
(1, 'Sarah', 'Johnson', 'Dr', 'sarah.johnson@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0821234567', TRUE, '2020-01-15', 'Female', '8506145678089'),

-- HODs (Head of Departments)
(2, 'Michael', 'Chen', 'Prof', 'michael.chen@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0823456789', TRUE, '2018-03-10', 'Male', '7809234567890'),
(3, 'Linda', 'Mbatha', 'Dr', 'linda.mbatha@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0834567890', TRUE, '2019-06-20', 'Female', '8203145678091'),
(4, 'David', 'Williams', 'Prof', 'david.williams@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0845678901', TRUE, '2017-09-15', 'Male', '7512234567892'),
(5, 'Priya', 'Naidoo', 'Dr', 'priya.naidoo@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0856789012', TRUE, '2019-02-28', 'Female', '8607145678093'),

-- Lecturers
(6, 'James', 'Thompson', 'Dr', 'james.thompson@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0867890123', TRUE, '2020-08-01', 'Male', '8301234567894'),
(7, 'Fatima', 'Hassan', 'Ms', 'fatima.hassan@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0878901234', TRUE, '2021-01-15', 'Female', '9105145678095'),
(8, 'Robert', 'Van Der Merwe', 'Dr', 'robert.vandermerwe@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0889012345', TRUE, '2019-07-20', 'Male', '7908234567896'),
(9, 'Zanele', 'Dlamini', 'Ms', 'zanele.dlamini@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0890123456', TRUE, '2020-09-10', 'Female', '8809145678097'),
(10, 'Peter', 'Kowalski', 'Dr', 'peter.kowalski@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0801234567', TRUE, '2018-11-05', 'Male', '7706234567898'),
(11, 'Amina', 'Mohamed', 'Dr', 'amina.mohamed@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0812345678', TRUE, '2021-03-12', 'Female', '8504145678099'),
(12, 'Thomas', 'Brown', 'Mr', 'thomas.brown@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0823456780', TRUE, '2020-05-18', 'Male', '8612234567800'),
(13, 'Ntombi', 'Khumalo', 'Dr', 'ntombi.khumalo@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0834567891', TRUE, '2019-08-25', 'Female', '8407145678801'),
(14, 'Andrew', 'Smith', 'Dr', 'andrew.smith@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0845678902', TRUE, '2021-02-14', 'Male', '8208234567802'),
(15, 'Sipho', 'Mthembu', 'Mr', 'sipho.mthembu@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0856789013', TRUE, '2020-10-30', 'Male', '9001234567803'),

-- Coordinators
(16, 'Jennifer', 'Lee', 'Dr', 'jennifer.lee@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0867890124', TRUE, '2019-04-15', 'Female', '8305145678804'),
(17, 'Marcus', 'Ndlovu', 'Dr', 'marcus.ndlovu@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0878901235', TRUE, '2020-06-22', 'Male', '8106234567805'),
(18, 'Elena', 'Petrova', 'Dr', 'elena.petrova@academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0889012346', TRUE, '2021-01-08', 'Female', '8704145678806'),

-- Students
(19, 'Thabo', 'Mokoena', 'Mr', 'thabo.mokoena@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0890123457', TRUE, '2023-02-01', 'Male', '0305145678807'),
(20, 'Emma', 'Wilson', 'Ms', 'emma.wilson@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0801234568', TRUE, '2023-02-01', 'Female', '0406234567808'),
(21, 'Lebo', 'Molefe', 'Ms', 'lebo.molefe@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0812345679', TRUE, '2023-02-01', 'Female', '0307145678809'),
(22, 'Daniel', 'Park', 'Mr', 'daniel.park@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0823456781', TRUE, '2023-02-01', 'Male', '0408234567810'),
(23, 'Nomsa', 'Zulu', 'Ms', 'nomsa.zulu@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0834567892', TRUE, '2022-02-01', 'Female', '0209145678811'),
(24, 'Kyle', 'Johnson', 'Mr', 'kyle.johnson@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0845678903', TRUE, '2022-02-01', 'Male', '0210234567812'),
(25, 'Ayanda', 'Ngubane', 'Ms', 'ayanda.ngubane@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0856789014', TRUE, '2022-02-01', 'Female', '0211145678813'),
(26, 'Connor', 'Murphy', 'Mr', 'connor.murphy@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0867890125', TRUE, '2021-02-01', 'Male', '0112234567814'),
(27, 'Bontle', 'Kgomo', 'Ms', 'bontle.kgomo@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0878901236', TRUE, '2021-02-01', 'Female', '0113145678815'),
(28, 'Ryan', 'Adams', 'Mr', 'ryan.adams@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0889012347', TRUE, '2023-02-01', 'Male', '0314234567816'),
(29, 'Palesa', 'Tshabalala', 'Ms', 'palesa.tshabalala@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0890123458', TRUE, '2023-02-01', 'Female', '0315145678817'),
(30, 'Oliver', 'Davies', 'Mr', 'oliver.davies@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0801234569', TRUE, '2022-02-01', 'Male', '0216234567818'),
(31, 'Thandeka', 'Mabaso', 'Ms', 'thandeka.mabaso@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0812345680', TRUE, '2022-02-01', 'Female', '0217145678819'),
(32, 'Joshua', 'Martinez', 'Mr', 'joshua.martinez@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0823456782', TRUE, '2021-02-01', 'Male', '0118234567820'),
(33, 'Noluthando', 'Sithole', 'Ms', 'noluthando.sithole@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0834567893', TRUE, '2023-02-01', 'Female', '0319145678821'),
(34, 'Ethan', 'Robinson', 'Mr', 'ethan.robinson@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0845678904', TRUE, '2023-02-01', 'Male', '0320234567822'),
(35, 'Lerato', 'Mahlangu', 'Ms', 'lerato.mahlangu@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0856789015', TRUE, '2022-02-01', 'Female', '0221145678823'),
(36, 'Nathan', 'White', 'Mr', 'nathan.white@student.academia.edu', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', '0867890126', TRUE, '2021-02-01', 'Male', '0122234567824');

-- =====================================================
-- USER ROLES DATA
-- =====================================================
INSERT INTO UserRoles (userId, userRole) VALUES
-- Admin
(1, 'ADMIN'),
-- HODs
(2, 'HOD'),
(2, 'LECTURER'),
(3, 'HOD'),
(3, 'LECTURER'),
(4, 'HOD'),
(4, 'LECTURER'),
(5, 'HOD'),
(5, 'LECTURER'),
-- Lecturers
(6, 'LECTURER'),
(7, 'LECTURER'),
(8, 'LECTURER'),
(9, 'LECTURER'),
(10, 'LECTURER'),
(11, 'LECTURER'),
(12, 'LECTURER'),
(13, 'LECTURER'),
(14, 'LECTURER'),
(15, 'LECTURER'),
-- Coordinators
(16, 'COORDINATOR'),
(16, 'LECTURER'),
(17, 'COORDINATOR'),
(17, 'LECTURER'),
(18, 'COORDINATOR'),
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
(33, 'STUDENT'),
(34, 'STUDENT'),
(35, 'STUDENT'),
(36, 'STUDENT');

-- =====================================================
-- QUALIFICATIONS DATA
-- =====================================================
INSERT INTO Qualification (qualificationId, qualificationName, qualificationCode, duration, totalCredits, departmentId) VALUES
(1, 'Bachelor of Science in Computer Science', 'BSC-CS', 3, 360, 1),
(2, 'Bachelor of Engineering in Electrical Engineering', 'BENG-EE', 4, 480, 2),
(3, 'Bachelor of Science in Civil Engineering', 'BSC-CE', 4, 480, 3),
(4, 'Bachelor of Science in Mathematics', 'BSC-MATH', 3, 360, 4),
(5, 'Bachelor of Commerce in Accounting', 'BCOM-ACC', 3, 360, 7),
(6, 'Bachelor of Arts in Psychology', 'BA-PSY', 3, 360, 10),
(7, 'Bachelor of Science in Nursing', 'BSC-NURS', 4, 480, 12);

-- =====================================================
-- STUDENT DATA
-- =====================================================
INSERT INTO Student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) VALUES
(19, 'ST2023001', 'Undergraduate', 1, 1),
(20, 'ST2023002', 'Undergraduate', 1, 1),
(21, 'ST2023003', 'Undergraduate', 1, 2),
(22, 'ST2023004', 'Undergraduate', 1, 5),
(23, 'ST2022001', 'Undergraduate', 2, 1),
(24, 'ST2022002', 'Undergraduate', 2, 1),
(25, 'ST2022003', 'Undergraduate', 2, 2),
(26, 'ST2021001', 'Undergraduate', 3, 1),
(27, 'ST2021002', 'Undergraduate', 3, 4),
(28, 'ST2023005', 'Undergraduate', 1, 6),
(29, 'ST2023006', 'Undergraduate', 1, 1),
(30, 'ST2022004', 'Undergraduate', 2, 5),
(31, 'ST2022005', 'Undergraduate', 2, 6),
(32, 'ST2021003', 'Undergraduate', 3, 1),
(33, 'ST2023007', 'Undergraduate', 1, 7),
(34, 'ST2023008', 'Undergraduate', 1, 1),
(35, 'ST2022006', 'Undergraduate', 2, 2),
(36, 'ST2021004', 'Undergraduate', 3, 5);

-- =====================================================
-- LECTURER DATA (WITH STAFF NUMBERS)
-- =====================================================
-- Staff number format: LEC-YYYY-NNN (Lecturer-Year-Number)
INSERT INTO Lecturer (lecturerId, departmentId, staffNumber) VALUES
(2, 1, 'LEC-2018-001'),  -- Prof Chen (HOD CS, also lecturer)
(3, 2, 'LEC-2019-002'),  -- Dr Mbatha (HOD EE, also lecturer)
(4, 7, 'LEC-2017-003'),  -- Prof Williams (HOD Accounting, also lecturer)
(5, 10, 'LEC-2019-004'), -- Dr Naidoo (HOD Psychology, also lecturer)
(6, 1, 'LEC-2020-005'),  -- Dr Thompson (CS)
(7, 1, 'LEC-2021-006'),  -- Ms Hassan (CS)
(8, 2, 'LEC-2019-007'),  -- Dr Van Der Merwe (EE)
(9, 7, 'LEC-2020-008'),  -- Ms Dlamini (Accounting)
(10, 4, 'LEC-2018-009'), -- Dr Kowalski (Math)
(11, 1, 'LEC-2021-010'), -- Dr Mohamed (CS)
(12, 5, 'LEC-2020-011'), -- Mr Brown (Physics)
(13, 10, 'LEC-2019-012'),-- Dr Khumalo (Psychology)
(14, 8, 'LEC-2021-013'), -- Dr Smith (Business Management)
(15, 12, 'LEC-2020-014'),-- Mr Mthembu (Nursing)
(16, 1, 'LEC-2019-015'), -- Dr Lee (CS, also coordinator)
(17, 2, 'LEC-2020-016'), -- Dr Ndlovu (EE, also coordinator)
(18, 7, 'LEC-2021-017'); -- Dr Petrova (Accounting, also coordinator)

-- =====================================================
-- COORDINATOR DATA (WITH STAFF NUMBERS)
-- =====================================================
-- Staff number format: COORD-YYYY-NNN (Coordinator-Year-Number)
INSERT INTO Coordinator (coordinatorId, departmentId, staffNumber) VALUES
(16, 1, 'COORD-2019-001'), -- Dr Lee (CS)
(17, 2, 'COORD-2020-002'), -- Dr Ndlovu (EE)
(18, 7, 'COORD-2021-003'); -- Dr Petrova (Accounting)

-- =====================================================
-- HOD DATA (WITH STAFF NUMBERS)
-- =====================================================
-- Staff number format: HOD-YYYY-NNN (HOD-Year-Number)
INSERT INTO HOD (hodId, departmentId, staffNumber) VALUES
(2, 1, 'HOD-2018-001'),  -- Prof Chen (Computer Science)
(3, 2, 'HOD-2019-002'),  -- Dr Mbatha (Electrical Engineering)
(4, 7, 'HOD-2017-003'),  -- Prof Williams (Accounting)
(5, 10, 'HOD-2019-004'); -- Dr Naidoo (Psychology)

-- =====================================================
-- MODULE DATA
-- =====================================================
INSERT INTO Module (moduleId, moduleName, moduleCode, credits, departmentId) VALUES
-- Computer Science Modules
(1, 'Introduction to Programming', 'CS101', 12, 1),
(2, 'Data Structures and Algorithms', 'CS201', 12, 1),
(3, 'Database Systems', 'CS202', 12, 1),
(4, 'Software Engineering', 'CS301', 15, 1),
(5, 'Artificial Intelligence', 'CS302', 15, 1),
(6, 'Computer Networks', 'CS303', 15, 1),
-- Electrical Engineering Modules
(7, 'Circuit Analysis', 'EE101', 12, 2),
(8, 'Digital Electronics', 'EE201', 15, 2),
(9, 'Control Systems', 'EE301', 15, 2),
-- Mathematics Modules
(10, 'Calculus I', 'MATH101', 12, 4),
(11, 'Linear Algebra', 'MATH102', 12, 4),
(12, 'Statistics', 'MATH201', 12, 4),
-- Accounting Modules
(13, 'Financial Accounting I', 'ACC101', 12, 7),
(14, 'Management Accounting', 'ACC201', 15, 7),
(15, 'Auditing', 'ACC301', 15, 7),
-- Psychology Modules
(16, 'Introduction to Psychology', 'PSY101', 12, 10),
(17, 'Cognitive Psychology', 'PSY201', 12, 10),
-- Nursing Modules
(18, 'Anatomy and Physiology', 'NURS101', 15, 12);

-- =====================================================
-- QUALIFICATION MODULE MAPPING
-- =====================================================
INSERT INTO QualificationModule (qualificationId, moduleId, academicYear, semesterNo, isCompulsory) VALUES
-- BSc Computer Science (Qualification 1)
(1, 1, 1, 1, TRUE),   -- CS101 Year 1, Sem 1
(1, 10, 1, 1, TRUE),  -- MATH101 Year 1, Sem 1
(1, 11, 1, 2, TRUE),  -- MATH102 Year 1, Sem 2
(1, 2, 2, 1, TRUE),   -- CS201 Year 2, Sem 1
(1, 3, 2, 1, TRUE),   -- CS202 Year 2, Sem 1
(1, 12, 2, 2, TRUE),  -- MATH201 Year 2, Sem 2
(1, 4, 3, 1, TRUE),   -- CS301 Year 3, Sem 1
(1, 5, 3, 1, FALSE),  -- CS302 Year 3, Sem 1 (Elective)
(1, 6, 3, 2, TRUE),   -- CS303 Year 3, Sem 2
-- BEng Electrical Engineering (Qualification 2)
(2, 7, 1, 1, TRUE),   -- EE101 Year 1, Sem 1
(2, 10, 1, 1, TRUE),  -- MATH101 Year 1, Sem 1
(2, 11, 1, 2, TRUE),  -- MATH102 Year 1, Sem 2
(2, 8, 2, 1, TRUE),   -- EE201 Year 2, Sem 1
(2, 9, 3, 1, TRUE),   -- EE301 Year 3, Sem 1
-- BCom Accounting (Qualification 5)
(5, 13, 1, 1, TRUE),  -- ACC101 Year 1, Sem 1
(5, 14, 2, 1, TRUE),  -- ACC201 Year 2, Sem 1
(5, 15, 3, 1, TRUE),  -- ACC301 Year 3, Sem 1
-- BA Psychology (Qualification 6)
(6, 16, 1, 1, TRUE),  -- PSY101 Year 1, Sem 1
(6, 17, 2, 1, TRUE),  -- PSY201 Year 2, Sem 1
-- BSc Nursing (Qualification 7)
(7, 18, 1, 1, TRUE);  -- NURS101 Year 1, Sem 1

-- =====================================================
-- STUDENT MODULE ENROLLMENTS
-- =====================================================
INSERT INTO StudentModule (studentId, moduleId) VALUES
-- First Year CS Students (19, 20, 29, 34)
(19, 1), (19, 10),
(20, 1), (20, 10),
(29, 1), (29, 10),
(34, 1), (34, 10),
-- Second Year CS Students (23, 24)
(23, 2), (23, 3), (23, 12),
(24, 2), (24, 3), (24, 12),
-- Third Year CS Students (26, 32)
(26, 4), (26, 5), (26, 6),
(32, 4), (32, 5), (32, 6),
-- First Year EE Student (21)
(21, 7), (21, 10),
-- Second Year EE Student (25, 35)
(25, 8),
(35, 8),
-- Third Year Math Student (27)
(27, 10), (27, 11), (27, 12),
-- First Year Accounting Student (22)
(22, 13),
-- Second Year Accounting Student (30)
(30, 14),
-- Third Year Accounting Student (36)
(36, 15),
-- First Year Psychology Student (28)
(28, 16),
-- Second Year Psychology Student (31)
(31, 17),
-- First Year Nursing Student (33)
(33, 18);

-- =====================================================
-- LECTURER MODULE ASSIGNMENTS
-- =====================================================
INSERT INTO LecturerModule (lecturerId, moduleId) VALUES
-- CS Modules
(2, 1),   -- Prof Chen teaches CS101
(6, 1),   -- Dr Thompson teaches CS101
(7, 2),   -- Ms Hassan teaches CS201
(11, 3),  -- Dr Mohamed teaches CS202
(16, 4),  -- Dr Lee teaches CS301
(2, 5),   -- Prof Chen teaches CS302
(6, 6),   -- Dr Thompson teaches CS303
-- EE Modules
(3, 7),   -- Dr Mbatha teaches EE101
(8, 8),   -- Dr Van Der Merwe teaches EE201
(17, 9),  -- Dr Ndlovu teaches EE301
-- Math Modules
(10, 10), -- Dr Kowalski teaches MATH101
(10, 11), -- Dr Kowalski teaches MATH102
(10, 12), -- Dr Kowalski teaches MATH201
-- Accounting Modules
(4, 13),  -- Prof Williams teaches ACC101
(9, 14),  -- Ms Dlamini teaches ACC201
(18, 15), -- Dr Petrova teaches ACC301
-- Psychology Modules
(5, 16),  -- Dr Naidoo teaches PSY101
(13, 17), -- Dr Khumalo teaches PSY201
-- Nursing Modules
(15, 18); -- Mr Mthembu teaches NURS101

-- =====================================================
-- COORDINATOR MODULE ASSIGNMENTS
-- =====================================================
INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES
(16, 1), (16, 2), (16, 3), (16, 4), (16, 5), (16, 6), -- Dr Lee coordinates all CS modules
(17, 7), (17, 8), (17, 9),                             -- Dr Ndlovu coordinates EE modules
(18, 13), (18, 14), (18, 15);                          -- Dr Petrova coordinates Accounting modules

-- =====================================================
-- ASSESSMENTS
-- =====================================================
INSERT INTO Assessment (assessmentId, assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
-- CS101 Assessments
(1, 'Assignment 1: Variables and Data Types', 100, 10.00, '2024-03-15', '2024-02-01 09:00:00', 2, 1),
(2, 'Test 1: Control Structures', 100, 15.00, '2024-04-10', '2024-02-01 09:00:00', 2, 1),
(3, 'Assignment 2: Functions', 100, 10.00, '2024-05-05', '2024-02-01 09:00:00', 6, 1),
(4, 'Final Project', 100, 25.00, '2024-06-15', '2024-02-01 09:00:00', 2, 1),
(5, 'Final Exam', 100, 40.00, '2024-06-25', '2024-02-01 09:00:00', 2, 1),

-- CS201 Assessments
(6, 'Assignment 1: Arrays and Lists', 100, 12.00, '2024-03-20', '2024-02-01 09:00:00', 7, 2),
(7, 'Test 1: Sorting Algorithms', 100, 18.00, '2024-04-15', '2024-02-01 09:00:00', 7, 2),
(8, 'Assignment 2: Trees and Graphs', 100, 15.00, '2024-05-10', '2024-02-01 09:00:00', 7, 2),
(9, 'Final Exam', 100, 55.00, '2024-06-20', '2024-02-01 09:00:00', 7, 2),

-- CS202 Assessments (Database Systems)
(10, 'Assignment 1: SQL Basics', 100, 10.00, '2024-03-18', '2024-02-01 09:00:00', 11, 3),
(11, 'Test 1: Normalization', 100, 15.00, '2024-04-12', '2024-02-01 09:00:00', 11, 3),
(12, 'Project: Database Design', 100, 25.00, '2024-05-15', '2024-02-01 09:00:00', 11, 3),
(13, 'Final Exam', 100, 50.00, '2024-06-22', '2024-02-01 09:00:00', 11, 3),

-- MATH101 Assessments
(14, 'Test 1: Limits and Derivatives', 100, 20.00, '2024-03-25', '2024-02-01 09:00:00', 10, 10),
(15, 'Assignment 1: Integration', 100, 15.00, '2024-04-20', '2024-02-01 09:00:00', 10, 10),
(16, 'Test 2: Applications', 100, 20.00, '2024-05-18', '2024-02-01 09:00:00', 10, 10),
(17, 'Final Exam', 100, 45.00, '2024-06-18', '2024-02-01 09:00:00', 10, 10),

-- ACC101 Assessments
(18, 'Test 1: Basic Accounting', 100, 20.00, '2024-03-22', '2024-02-01 09:00:00', 4, 13),
(19, 'Assignment: Financial Statements', 100, 15.00, '2024-04-25', '2024-02-01 09:00:00', 4, 13),
(20, 'Final Exam', 100, 65.00, '2024-06-19', '2024-02-01 09:00:00', 4, 13),

-- EE101 Assessments
(21, 'Lab Assignment 1', 100, 10.00, '2024-03-16', '2024-02-01 09:00:00', 3, 7),
(22, 'Test 1: Circuit Analysis', 100, 20.00, '2024-04-14', '2024-02-01 09:00:00', 3, 7),
(23, 'Lab Assignment 2', 100, 10.00, '2024-05-12', '2024-02-01 09:00:00', 3, 7),
(24, 'Final Exam', 100, 60.00, '2024-06-21', '2024-02-01 09:00:00', 3, 7);

-- =====================================================
-- CLASS SESSIONS
-- =====================================================
INSERT INTO ClassSession (sessionId, classType, createdAt, expiresAt, attendanceCode, lecturerId, moduleId) VALUES
-- CS101 Sessions
(1, 'Lecture', '2024-02-05 08:00:00', '2024-02-05 09:30:00', 'CS101L01', 2, 1),
(2, 'Lecture', '2024-02-12 08:00:00', '2024-02-12 09:30:00', 'CS101L02', 2, 1),
(3, 'Tutorial', '2024-02-07 14:00:00', '2024-02-07 15:00:00', 'CS101T01', 6, 1),
(4, 'Lecture', '2024-02-19 08:00:00', '2024-02-19 09:30:00', 'CS101L03', 2, 1),
(5, 'Tutorial', '2024-02-21 14:00:00', '2024-02-21 15:00:00', 'CS101T02', 6, 1),
(6, 'Lecture', '2024-02-26 08:00:00', '2024-02-26 09:30:00', 'CS101L04', 2, 1),
(7, 'Lecture', '2024-03-04 08:00:00', '2024-03-04 09:30:00', 'CS101L05', 2, 1),
(8, 'Tutorial', '2024-03-06 14:00:00', '2024-03-06 15:00:00', 'CS101T03', 6, 1),

-- CS201 Sessions
(9, 'Lecture', '2024-02-06 10:00:00', '2024-02-06 11:30:00', 'CS201L01', 7, 2),
(10, 'Lecture', '2024-02-13 10:00:00', '2024-02-13 11:30:00', 'CS201L02', 7, 2),
(11, 'Tutorial', '2024-02-15 15:00:00', '2024-02-15 16:00:00', 'CS201T01', 7, 2),
(12, 'Lecture', '2024-02-20 10:00:00', '2024-02-20 11:30:00', 'CS201L03', 7, 2),
(13, 'Lecture', '2024-02-27 10:00:00', '2024-02-27 11:30:00', 'CS201L04', 7, 2),

-- MATH101 Sessions
(14, 'Lecture', '2024-02-05 12:00:00', '2024-02-05 13:30:00', 'MATH101L01', 10, 10),
(15, 'Lecture', '2024-02-12 12:00:00', '2024-02-12 13:30:00', 'MATH101L02', 10, 10),
(16, 'Tutorial', '2024-02-14 16:00:00', '2024-02-14 17:00:00', 'MATH101T01', 10, 10),
(17, 'Lecture', '2024-02-19 12:00:00', '2024-02-19 13:30:00', 'MATH101L03', 10, 10),
(18, 'Tutorial', '2024-02-21 16:00:00', '2024-02-21 17:00:00', 'MATH101T02', 10, 10),

-- ACC101 Sessions
(19, 'Lecture', '2024-02-06 08:00:00', '2024-02-06 09:30:00', 'ACC101L01', 4, 13),
(20, 'Lecture', '2024-02-13 08:00:00', '2024-02-13 09:30:00', 'ACC101L02', 4, 13),
(21, 'Tutorial', '2024-02-15 14:00:00', '2024-02-15 15:00:00', 'ACC101T01', 4, 13),

-- EE101 Sessions
(22, 'Lecture', '2024-02-07 10:00:00', '2024-02-07 11:30:00', 'EE101L01', 3, 7),
(23, 'Lab', '2024-02-09 14:00:00', '2024-02-09 17:00:00', 'EE101LAB01', 3, 7),
(24, 'Lecture', '2024-02-14 10:00:00', '2024-02-14 11:30:00', 'EE101L02', 3, 7);

-- =====================================================
-- ATTENDANCE RECORDS
-- =====================================================
INSERT INTO AttendanceRecord (studentId, sessionId) VALUES
-- CS101 Attendance (Students: 19, 20, 29, 34)
(19, 1), (19, 2), (19, 3), (19, 4), (19, 5), (19, 6), (19, 7), (19, 8),
(20, 1), (20, 2), (20, 3), (20, 5), (20, 6), (20, 8), -- Missed sessions 4, 7
(29, 1), (29, 2), (29, 4), (29, 6), (29, 7), -- Missed sessions 3, 5, 8
(34, 1), (34, 3), (34, 4), (34, 5), (34, 7), -- Missed sessions 2, 6, 8

-- CS201 Attendance (Students: 23, 24)
(23, 9), (23, 10), (23, 11), (23, 12), (23, 13),
(24, 9), (24, 10), (24, 12), -- Missed sessions 11, 13

-- MATH101 Attendance (Students: 19, 20, 21, 29, 34)
(19, 14), (19, 15), (19, 16), (19, 17), (19, 18),
(20, 14), (20, 15), (20, 17), -- Missed sessions 16, 18
(21, 14), (21, 15), (21, 16), (21, 17), (21, 18),
(29, 14), (29, 16), (29, 17), -- Missed sessions 15, 18
(34, 14), (34, 15), (34, 16), -- Missed sessions 17, 18

-- ACC101 Attendance (Student: 22)
(22, 19), (22, 20), (22, 21),

-- EE101 Attendance (Student: 21)
(21, 22), (21, 23), (21, 24);

-- =====================================================
-- MARK ENTRIES
-- =====================================================
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
-- CS101 Marks (Students: 19, 20, 29, 34)
-- Student 19 (Good performance)
(85.00, TRUE, '2024-03-14 16:30:00', 19, 1),
(78.50, TRUE, '2024-04-10 10:00:00', 19, 2),
(82.00, TRUE, '2024-05-04 15:45:00', 19, 3),
(88.00, TRUE, '2024-06-14 18:20:00', 19, 4),
(80.00, TRUE, '2024-06-25 12:00:00', 19, 5),

-- Student 20 (Average performance, some missed submissions)
(72.00, TRUE, '2024-03-15 11:20:00', 20, 1),
(65.00, TRUE, '2024-04-10 10:00:00', 20, 2),
(NULL, FALSE, NULL, 20, 3), -- Missed Assignment 2
(70.00, TRUE, '2024-06-15 20:15:00', 20, 4),
(68.00, TRUE, '2024-06-25 12:00:00', 20, 5),

-- Student 29 (At-risk student)
(55.00, TRUE, '2024-03-15 23:45:00', 29, 1),
(48.00, TRUE, '2024-04-10 10:00:00', 29, 2),
(NULL, FALSE, NULL, 29, 3), -- Missed Assignment 2
(NULL, FALSE, NULL, 29, 4), -- Missed Final Project
(52.00, TRUE, '2024-06-25 12:00:00', 29, 5),

-- Student 34 (Moderate risk)
(68.00, TRUE, '2024-03-14 19:30:00', 34, 1),
(62.00, TRUE, '2024-04-10 10:00:00', 34, 2),
(65.00, TRUE, '2024-05-05 14:20:00', 34, 3),
(NULL, FALSE, NULL, 34, 4), -- Missed Final Project
(64.00, TRUE, '2024-06-25 12:00:00', 34, 5),

-- CS201 Marks (Students: 23, 24)
-- Student 23 (Excellent performance)
(92.00, TRUE, '2024-03-19 14:30:00', 23, 6),
(88.00, TRUE, '2024-04-15 10:00:00', 23, 7),
(90.00, TRUE, '2024-05-09 16:45:00', 23, 8),
(91.00, TRUE, '2024-06-20 12:00:00', 23, 9),

-- Student 24 (Good but inconsistent)
(75.00, TRUE, '2024-03-20 10:15:00', 24, 6),
(70.00, TRUE, '2024-04-15 10:00:00', 24, 7),
(NULL, FALSE, NULL, 24, 8), -- Missed assignment
(72.00, TRUE, '2024-06-20 12:00:00', 24, 9),

-- CS202 Marks (Students: 23, 24)
-- Student 23
(88.00, TRUE, '2024-03-17 15:20:00', 23, 10),
(85.00, TRUE, '2024-04-12 10:00:00', 23, 11),
(89.00, TRUE, '2024-05-14 17:30:00', 23, 12),
(87.00, TRUE, '2024-06-22 12:00:00', 23, 13),

-- Student 24
(78.00, TRUE, '2024-03-18 12:45:00', 24, 10),
(72.00, TRUE, '2024-04-12 10:00:00', 24, 11),
(75.00, TRUE, '2024-05-15 19:20:00', 24, 12),
(74.00, TRUE, '2024-06-22 12:00:00', 24, 13),

-- MATH101 Marks (Students: 19, 20, 21, 29, 34)
-- Student 19
(76.00, TRUE, '2024-03-25 10:00:00', 19, 14),
(80.00, TRUE, '2024-04-19 16:30:00', 19, 15),
(78.00, TRUE, '2024-05-18 10:00:00', 19, 16),
(79.00, TRUE, '2024-06-18 12:00:00', 19, 17),

-- Student 20
(70.00, TRUE, '2024-03-25 10:00:00', 20, 14),
(68.00, TRUE, '2024-04-20 14:20:00', 20, 15),
(65.00, TRUE, '2024-05-18 10:00:00', 20, 16),
(67.00, TRUE, '2024-06-18 12:00:00', 20, 17),

-- Student 21 (Excellent)
(90.00, TRUE, '2024-03-25 10:00:00', 21, 14),
(88.00, TRUE, '2024-04-19 15:45:00', 21, 15),
(92.00, TRUE, '2024-05-18 10:00:00', 21, 16),
(89.00, TRUE, '2024-06-18 12:00:00', 21, 17),

-- Student 29 (At-risk)
(50.00, TRUE, '2024-03-25 10:00:00', 29, 14),
(NULL, FALSE, NULL, 29, 15), -- Missed assignment
(48.00, TRUE, '2024-05-18 10:00:00', 29, 16),
(51.00, TRUE, '2024-06-18 12:00:00', 29, 17),

-- Student 34 (Moderate)
(62.00, TRUE, '2024-03-25 10:00:00', 34, 14),
(65.00, TRUE, '2024-04-20 11:30:00', 34, 15),
(60.00, TRUE, '2024-05-18 10:00:00', 34, 16),
(63.00, TRUE, '2024-06-18 12:00:00', 34, 17),

-- ACC101 Marks (Student: 22)
(82.00, TRUE, '2024-03-22 10:00:00', 22, 18),
(85.00, TRUE, '2024-04-24 18:30:00', 22, 19),
(83.00, TRUE, '2024-06-19 12:00:00', 22, 20),

-- EE101 Marks (Student: 21)
(87.00, TRUE, '2024-03-15 14:20:00', 21, 21),
(86.00, TRUE, '2024-04-14 10:00:00', 21, 22),
(88.00, TRUE, '2024-05-11 16:45:00', 21, 23),
(87.00, TRUE, '2024-06-21 12:00:00', 21, 24);

-- =====================================================
-- RISK REPORTS
-- =====================================================
INSERT INTO RiskReport (studentModuleId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt) VALUES
-- High Risk Students
(3, 'HIGH', 62.50, 40.00, 51.67, '2024-05-20 08:00:00'),  -- Student 29 in CS101
(4, 'HIGH', 50.00, 50.00, 49.50, '2024-05-20 08:00:00'),  -- Student 29 in MATH101

-- Moderate Risk Students
(2, 'MODERATE', 75.00, 80.00, 69.00, '2024-05-20 08:00:00'), -- Student 20 in CS101
(9, 'MODERATE', 66.67, 80.00, 63.25, '2024-05-20 08:00:00'), -- Student 34 in CS101
(11, 'MODERATE', 60.00, 66.67, 62.50, '2024-05-20 08:00:00'), -- Student 34 in MATH101
(7, 'MODERATE', 60.00, 75.00, 73.75, '2024-05-20 08:00:00'), -- Student 24 in CS201

-- Low Risk Students
(1, 'LOW', 100.00, 100.00, 82.70, '2024-05-20 08:00:00'),  -- Student 19 in CS101
(5, 'LOW', 100.00, 100.00, 78.25, '2024-05-20 08:00:00'),  -- Student 19 in MATH101
(6, 'LOW', 100.00, 100.00, 90.25, '2024-05-20 08:00:00'),  -- Student 23 in CS201
(10, 'LOW', 100.00, 100.00, 89.50, '2024-05-20 08:00:00'), -- Student 21 in MATH101
(12, 'LOW', 100.00, 100.00, 87.25, '2024-05-20 08:00:00'), -- Student 21 in EE101
(14, 'LOW', 100.00, 100.00, 83.33, '2024-05-20 08:00:00'); -- Student 22 in ACC101

-- =====================================================
-- INTERVENTIONS
-- =====================================================
INSERT INTO Intervention (interventionId, studentModuleId, coordinatorId, content, createdAt, status) VALUES
(1, 3, 16, 
'Student has shown concerning patterns in CS101: attendance at 62.5%, submission rate at 40%, and average mark of 51.67%. Contacted student via email to schedule a meeting to discuss challenges and provide academic support resources. Recommended tutoring sessions and study group participation.',
'2024-05-21 09:30:00', 'FOLLOW_UP_DUE'),

(2, 4, 16,
'Student enrolled in MATH101 is at high risk with 50% attendance, 50% submission rate, and 49.5% average. This is critical as MATH101 is a foundational course. Arranged meeting with student and academic advisor to create action plan. Discussed possible extension for missed assignments and connected student with peer mentor.',
'2024-05-21 10:15:00', 'ACTIVE'),

(3, 2, 16,
'Moderate risk identified in CS101. Student has 75% attendance and 80% submission rate with 69% average. Sent encouraging email highlighting improvement opportunities. Suggested attending office hours before next assessment. Will monitor progress over next two weeks.',
'2024-05-22 11:00:00', 'FOLLOW_UP_DUE'),

(4, 9, 16,
'CS101 student showing moderate risk signs with 66.67% attendance and one missed project submission. Current average is 63%. Reached out to discuss time management strategies and available support services. Student indicated work commitments affecting studies - discussed possible solutions.',
'2024-05-22 14:30:00', 'ACTIVE'),

(5, 7, 17,
'CS201 student has moderate risk profile with 60% attendance and 75% submission rate (missed one assignment). Average mark is 73.75%. Contacted student to understand reasons for absences. Student reported family issues - referred to student counseling services. Granted extension for missed work.',
'2024-05-23 09:00:00', 'ACTIVE');

-- =====================================================
-- FOLLOW-UPS
-- =====================================================
INSERT INTO FollowUp (followUpId, interventionId, content, outcome, createdAt) VALUES
(1, 1, 
'Met with student for 30-minute consultation. Student acknowledged struggling with programming concepts and time management. Enrolled in twice-weekly tutoring sessions starting next week. Student committed to attending all remaining lectures and submitting outstanding work. Will review progress in 2 weeks.',
'NO_CHANGE', '2024-05-28 13:00:00'),

(2, 3,
'Follow-up email sent to student checking on progress. Student responded positively - attended last two office hours sessions and submitted recent assignment on time with improved quality (scored 75%). Attendance has improved to 85%. Will continue monitoring but signs are encouraging.',
'IMPROVED', '2024-06-05 10:30:00'),

(3, 1,
'Second follow-up after 2 weeks of intervention. Student has attended 3 out of 4 tutoring sessions and submitted one missing assignment (scored 58%). Attendance has increased to 75%. Average mark now at 54%. Progress is modest but positive. Student reports feeling more confident with material. Recommended continuing current support plan.',
'IMPROVED', '2024-06-11 15:45:00');

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

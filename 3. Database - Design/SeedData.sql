use academia;
-- =====================================================
-- Academia Database Seed Data
-- Password for all users: Password123!
-- Bcrypt hash: $2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5
-- =====================================================

-- Disable foreign key checks for insertion
SET FOREIGN_KEY_CHECKS=0;

-- Clear existing data
TRUNCATE TABLE followup;
TRUNCATE TABLE intervention;
TRUNCATE TABLE riskreport;
TRUNCATE TABLE markentry;
TRUNCATE TABLE attendancerecord;
TRUNCATE TABLE classsession;
TRUNCATE TABLE studentmodule;
TRUNCATE TABLE assessment;
TRUNCATE TABLE coordinatormodule;
TRUNCATE TABLE lecturermodule;
TRUNCATE TABLE qualificationmodule;
TRUNCATE TABLE student;
TRUNCATE TABLE lecturer;
TRUNCATE TABLE coordinator;
TRUNCATE TABLE hod;
TRUNCATE TABLE userroles;
TRUNCATE TABLE users;
TRUNCATE TABLE module;
TRUNCATE TABLE qualification;
TRUNCATE TABLE department;
TRUNCATE TABLE faculty;

-- =====================================================
-- FACULTY DATA
-- =====================================================
INSERT INTO faculty (facultyId, facultyName) VALUES
(1, 'Faculty of Science and Technology'),
(2, 'Faculty of Business and Economics'),
(3, 'Faculty of Engineering'),
(4, 'Faculty of Humanities and Social Sciences'),
(5, 'Faculty of Health Sciences');

-- =====================================================
-- DEPARTMENT DATA
-- =====================================================
INSERT INTO department (departmentId, departmentName, facultyId) VALUES
(1, 'Computer Science', 1),
(2, 'Mathematics', 1),
(3, 'Physics', 1),
(4, 'Business Management', 2),
(5, 'Economics', 2),
(6, 'Electrical Engineering', 3),
(7, 'Mechanical Engineering', 3),
(8, 'Psychology', 4),
(9, 'Sociology', 4),
(10, 'Nursing', 5),
(11, 'Information Technology', 1),
(12, 'Accounting', 2);

-- =====================================================
-- USERS DATA (All password: Password123!)
-- =====================================================
INSERT INTO users (userId, firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, dateRegistered, gender, idNumber) VALUES
-- Admin
(1, 'Sarah', 'Administrator', 'Ms', 'admin@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234567', 1, '2024-01-15 08:00:00', 'Female', '8505150234089'),

-- HODs
(2, 'John', 'Smith', 'Prof', 'j.smith@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234568', 1, '2024-01-15 08:00:00', 'Male', '7503120345067'),
(3, 'Mary', 'Johnson', 'Dr', 'm.johnson@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234569', 1, '2024-01-15 08:00:00', 'Female', '8204250234078'),

-- Coordinators
(4, 'David', 'Williams', 'Dr', 'd.williams@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234570', 1, '2024-01-15 08:00:00', 'Male', '7908150345089'),
(5, 'Jennifer', 'Brown', 'Dr', 'j.brown@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234571', 1, '2024-01-15 08:00:00', 'Female', '8511220234067'),
(6, 'Michael', 'Davis', 'Dr', 'm.davis@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234572', 1, '2024-01-15 08:00:00', 'Male', '7706300345078'),

-- Lecturers
(7, 'Robert', 'Miller', 'Mr', 'r.miller@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234573', 1, '2024-01-15 08:00:00', 'Male', '8801150345067'),
(8, 'Patricia', 'Wilson', 'Ms', 'p.wilson@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234574', 1, '2024-01-15 08:00:00', 'Female', '9203180234089'),
(9, 'James', 'Moore', 'Dr', 'j.moore@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234575', 1, '2024-01-15 08:00:00', 'Male', '8105250345078'),
(10, 'Linda', 'Taylor', 'Dr', 'l.taylor@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234576', 1, '2024-01-15 08:00:00', 'Female', '7907150234067'),
(11, 'Thomas', 'Anderson', 'Mr', 't.anderson@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234577', 1, '2024-01-15 08:00:00', 'Male', '8609120345089'),
(12, 'Barbara', 'Thomas', 'Ms', 'b.thomas@academia.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0821234578', 1, '2024-01-15 08:00:00', 'Female', '9010250234078'),

-- Students
(13, 'Thabo', 'Mokoena', NULL, 't.mokoena@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234567', 1, '2024-02-01 08:00:00', 'Male', '0305150345067'),
(14, 'Nombuso', 'Nkosi', NULL, 'n.nkosi@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234568', 1, '2024-02-01 08:00:00', 'Female', '0408200234089'),
(15, 'Sipho', 'Dlamini', NULL, 's.dlamini@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234569', 1, '2024-02-01 08:00:00', 'Male', '0211250345078'),
(16, 'Lerato', 'Mthembu', NULL, 'l.mthembu@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234570', 1, '2024-02-01 08:00:00', 'Female', '0307100234067'),
(17, 'Bongani', 'Khumalo', NULL, 'b.khumalo@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234571', 1, '2024-02-01 08:00:00', 'Male', '0109150345089'),
(18, 'Zanele', 'Ndlovu', NULL, 'z.ndlovu@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234572', 1, '2024-02-01 08:00:00', 'Female', '0506220234078'),
(19, 'Mandla', 'Zulu', NULL, 'm.zulu@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234573', 1, '2024-02-01 08:00:00', 'Male', '0410050345067'),
(20, 'Ntombifuthi', 'Sithole', NULL, 'n.sithole@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234574', 1, '2024-02-01 08:00:00', 'Female', '0212180234089'),
(21, 'Themba', 'Mahlangu', NULL, 't.mahlangu@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234575', 1, '2024-02-01 08:00:00', 'Male', '0108270345078'),
(22, 'Precious', 'Radebe', NULL, 'p.radebe@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234576', 1, '2024-02-01 08:00:00', 'Female', '0405140234067'),
(23, 'Sello', 'Molefe', NULL, 's.molefe@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234577', 1, '2024-02-01 08:00:00', 'Male', '0309300345089'),
(24, 'Busisiwe', 'Shabalala', NULL, 'b.shabalala@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234578', 1, '2024-02-01 08:00:00', 'Female', '0507080234078'),
(25, 'Nhlanhla', 'Buthelezi', NULL, 'n.buthelezi@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234579', 1, '2024-02-01 08:00:00', 'Male', '0206120345067'),
(26, 'Nokuthula', 'Cele', NULL, 'n.cele@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234580', 1, '2024-02-01 08:00:00', 'Female', '0411250234089'),
(27, 'Musa', 'Ngubane', NULL, 'm.ngubane@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234581', 1, '2024-02-01 08:00:00', 'Male', '0110010345078'),
(28, 'Thandiwe', 'Zungu', NULL, 't.zungu@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234582', 1, '2024-02-01 08:00:00', 'Female', '0308190234067'),
(29, 'Sibusiso', 'Mazibuko', NULL, 's.mazibuko@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234583', 1, '2024-02-01 08:00:00', 'Male', '0509060345089'),
(30, 'Zinhle', 'Mkhize', NULL, 'z.mkhize@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234584', 1, '2024-02-01 08:00:00', 'Female', '0204280234078'),
(31, 'Andile', 'Gumede', NULL, 'a.gumede@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234585', 1, '2024-02-01 08:00:00', 'Male', '0407160345067'),
(32, 'Nonhlanhla', 'Ntuli', NULL, 'n.ntuli@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234586', 1, '2024-02-01 08:00:00', 'Female', '0101210234089'),
(33, 'Sanele', 'Zwane', NULL, 's.zwane@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234587', 1, '2024-02-01 08:00:00', 'Male', '0212150345078'),
(34, 'Nomfundo', 'Ngcobo', NULL, 'n.ngcobo@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234588', 1, '2024-02-01 08:00:00', 'Female', '0506030234067'),
(35, 'Thulani', 'Dube', NULL, 't.dube@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234589', 1, '2024-02-01 08:00:00', 'Male', '0310240345089'),
(36, 'Lindiwe', 'Kgomo', NULL, 'l.kgomo@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234590', 1, '2024-02-01 08:00:00', 'Female', '0408110234078'),
(37, 'Mpho', 'Masango', NULL, 'm.masango@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234591', 1, '2024-02-01 08:00:00', 'Male', '0209290345067'),
(38, 'Nokwanda', 'Khoza', NULL, 'n.khoza@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234592', 1, '2024-02-01 08:00:00', 'Female', '0411170234089'),
(39, 'Tshepo', 'Baloyi', NULL, 't.baloyi@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234593', 1, '2024-02-01 08:00:00', 'Male', '0107070345078'),
(40, 'Sindisiwe', 'Zwane', NULL, 's.zwane2@student.ac.za', '$2a$10$rQ8qI7ZjQq5Y5h5X5Z5Z5OqK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', '0731234594', 1, '2024-02-01 08:00:00', 'Female', '0305220234067');

-- =====================================================
-- USER ROLES
-- =====================================================
INSERT INTO userroles (userRoleId, userId, userRole) VALUES
(1, 1, 'ADMIN'),
(2, 2, 'HOD'),
(3, 3, 'HOD'),
(4, 4, 'COORDINATOR'),
(5, 5, 'COORDINATOR'),
(6, 6, 'COORDINATOR'),
(7, 7, 'LECTURER'),
(8, 8, 'LECTURER'),
(9, 9, 'LECTURER'),
(10, 10, 'LECTURER'),
(11, 11, 'LECTURER'),
(12, 12, 'LECTURER'),
(13, 13, 'STUDENT'),
(14, 14, 'STUDENT'),
(15, 15, 'STUDENT'),
(16, 16, 'STUDENT'),
(17, 17, 'STUDENT'),
(18, 18, 'STUDENT'),
(19, 19, 'STUDENT'),
(20, 20, 'STUDENT'),
(21, 21, 'STUDENT'),
(22, 22, 'STUDENT'),
(23, 23, 'STUDENT'),
(24, 24, 'STUDENT'),
(25, 25, 'STUDENT'),
(26, 26, 'STUDENT'),
(27, 27, 'STUDENT'),
(28, 28, 'STUDENT'),
(29, 29, 'STUDENT'),
(30, 30, 'STUDENT'),
(31, 31, 'STUDENT'),
(32, 32, 'STUDENT'),
(33, 33, 'STUDENT'),
(34, 34, 'STUDENT'),
(35, 35, 'STUDENT'),
(36, 36, 'STUDENT'),
(37, 37, 'STUDENT'),
(38, 38, 'STUDENT'),
(39, 39, 'STUDENT'),
(40, 40, 'STUDENT'),
-- Coordinators also as lecturers
(41, 4, 'LECTURER'),
(42, 5, 'LECTURER'),
(43, 6, 'LECTURER');

-- =====================================================
-- HOD DATA
-- =====================================================
INSERT INTO hod (hodId, departmentId, staffNumber) VALUES
(2, 1, 'STF2024001'),  -- John Smith - Computer Science
(3, 11, 'STF2024002'); -- Mary Johnson - IT

-- =====================================================
-- COORDINATOR DATA
-- =====================================================
INSERT INTO coordinator (coordinatorId, departmentId, staffNumber) VALUES
(4, 1, 'STF2024003'),  -- David Williams - Computer Science
(5, 1, 'STF2024004'),  -- Jennifer Brown - Computer Science
(6, 11, 'STF2024005'); -- Michael Davis - IT

-- =====================================================
-- LECTURER DATA
-- =====================================================
INSERT INTO lecturer (lecturerId, departmentId, staffNumber) VALUES
(4, 1, 'STF2024003'),   -- David Williams (also coordinator)
(5, 1, 'STF2024004'),   -- Jennifer Brown (also coordinator)
(6, 11, 'STF2024005'),  -- Michael Davis (also coordinator)
(7, 1, 'STF2024006'),   -- Robert Miller
(8, 1, 'STF2024007'),   -- Patricia Wilson
(9, 11, 'STF2024008'),  -- James Moore
(10, 11, 'STF2024009'), -- Linda Taylor
(11, 1, 'STF2024010'),  -- Thomas Anderson
(12, 11, 'STF2024011'); -- Barbara Thomas

-- =====================================================
-- QUALIFICATION DATA
-- =====================================================
INSERT INTO qualification (qualificationId, qualificationName, qualificationCode, duration, totalCredits, departmentId) VALUES
(1, 'Bachelor of Science in Computer Science', 'BSCS', 3, 360, 1),
(2, 'Bachelor of Information Technology', 'BIT', 3, 360, 11),
(3, 'Diploma in Software Development', 'DSD', 3, 360, 1),
(4, 'National Diploma in IT', 'NDIT', 3, 360, 11),
(5, 'Bachelor of Commerce in Information Systems', 'BCIS', 4, 480, 11),
(6, 'Advanced Diploma in Computer Science', 'ADCS', 1, 120, 1),
(7, 'Certificate in Programming', 'CP', 1, 120, 1);

-- =====================================================
-- MODULE DATA
-- =====================================================
INSERT INTO module (moduleId, moduleName, moduleCode, credits, departmentId) VALUES
(1, 'Programming Fundamentals', 'PRG101', 15, 1),
(2, 'Data Structures and Algorithms', 'DSA201', 15, 1),
(3, 'Database Management Systems', 'DBS301', 15, 1),
(4, 'Web Development', 'WEB201', 15, 1),
(5, 'Object-Oriented Programming', 'OOP201', 15, 1),
(6, 'Software Engineering', 'SWE301', 15, 1),
(7, 'Mobile Application Development', 'MAD301', 15, 1),
(8, 'Network Fundamentals', 'NET101', 15, 11),
(9, 'Cybersecurity Basics', 'CYB201', 15, 11),
(10, 'Cloud Computing', 'CLD301', 15, 11),
(11, 'Systems Analysis and Design', 'SAD201', 15, 11),
(12, 'IT Project Management', 'IPM301', 15, 11),
(13, 'Computer Architecture', 'CAR101', 15, 1),
(14, 'Operating Systems', 'OPS201', 15, 1),
(15, 'Artificial Intelligence', 'AIF301', 15, 1),
(16, 'Machine Learning', 'MLN301', 15, 1),
(17, 'Digital Forensics', 'DFO301', 15, 11),
(18, 'IoT Development', 'IOT301', 15, 11);

-- =====================================================
-- QUALIFICATION MODULE MAPPING
-- =====================================================
INSERT INTO qualificationmodule (qualificationModuleId, qualificationId, moduleId, academicYear, semesterNo, isCompulsory) VALUES
-- BSCS Year 1 Semester 1
(1, 1, 1, 1, 1, 1),
(2, 1, 13, 1, 1, 1),
-- BSCS Year 1 Semester 2
(3, 1, 5, 1, 2, 1),
(4, 1, 14, 1, 2, 1),
-- BSCS Year 2 Semester 1
(5, 1, 2, 2, 1, 1),
(6, 1, 4, 2, 1, 1),
-- BSCS Year 2 Semester 2
(7, 1, 3, 2, 2, 1),
(8, 1, 11, 2, 2, 1),
-- BSCS Year 3 Semester 1
(9, 1, 6, 3, 1, 1),
(10, 1, 7, 3, 1, 1),
-- BSCS Year 3 Semester 2
(11, 1, 15, 3, 2, 0),
(12, 1, 16, 3, 2, 0),

-- BIT Year 1 Semester 1
(13, 2, 8, 1, 1, 1),
(14, 2, 1, 1, 1, 1),
-- BIT Year 2 Semester 1
(15, 2, 9, 2, 1, 1),
(16, 2, 11, 2, 1, 1),
-- BIT Year 3 Semester 1
(17, 2, 10, 3, 1, 1),
(18, 2, 12, 3, 1, 1),
-- BIT Year 3 Semester 2
(19, 2, 17, 3, 2, 0),
(20, 2, 18, 3, 2, 0);

-- =====================================================
-- STUDENT DATA
-- =====================================================
INSERT INTO student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) VALUES
-- BSCS Students
(13, 'STU2024001', 'Undergraduate', 1, 1),
(14, 'STU2024002', 'Undergraduate', 1, 1),
(15, 'STU2024003', 'Undergraduate', 2, 1),
(16, 'STU2024004', 'Undergraduate', 2, 1),
(17, 'STU2024005', 'Undergraduate', 2, 1),
(18, 'STU2024006', 'Undergraduate', 3, 1),
(19, 'STU2024007', 'Undergraduate', 3, 1),
-- BIT Students
(20, 'STU2024008', 'Undergraduate', 1, 2),
(21, 'STU2024009', 'Undergraduate', 1, 2),
(22, 'STU2024010', 'Undergraduate', 2, 2),
(23, 'STU2024011', 'Undergraduate', 2, 2),
(24, 'STU2024012', 'Undergraduate', 3, 2),
(25, 'STU2024013', 'Undergraduate', 3, 2),
-- DSD Students
(26, 'STU2024014', 'Undergraduate', 1, 3),
(27, 'STU2024015', 'Undergraduate', 2, 3),
(28, 'STU2024016', 'Undergraduate', 3, 3),
-- NDIT Students
(29, 'STU2024017', 'Undergraduate', 1, 4),
(30, 'STU2024018', 'Undergraduate', 2, 4),
(31, 'STU2024019', 'Undergraduate', 3, 4),
-- BCIS Students
(32, 'STU2024020', 'Undergraduate', 1, 5),
(33, 'STU2024021', 'Undergraduate', 2, 5),
(34, 'STU2024022', 'Undergraduate', 3, 5),
(35, 'STU2024023', 'Undergraduate', 4, 5),
-- ADCS Students
(36, 'STU2024024', 'Postgraduate', 1, 6),
(37, 'STU2024025', 'Postgraduate', 1, 6),
-- CP Students
(38, 'STU2024026', 'Certificate', 1, 7),
(39, 'STU2024027', 'Certificate', 1, 7),
(40, 'STU2024028', 'Certificate', 1, 7);

-- =====================================================
-- LECTURER MODULE ASSIGNMENTS
-- =====================================================
INSERT INTO lecturermodule (lecturerModuleId, lecturerId, moduleId) VALUES
-- David Williams (Coordinator) teaches PRG101, DSA201
(1, 4, 1),
(2, 4, 2),
-- Jennifer Brown (Coordinator) teaches OOP201, WEB201
(3, 5, 5),
(4, 5, 4),
-- Michael Davis (Coordinator) teaches NET101, CLD301
(5, 6, 8),
(6, 6, 10),
-- Robert Miller teaches DBS301, SWE301
(7, 7, 3),
(8, 7, 6),
-- Patricia Wilson teaches MAD301, AIF301
(9, 8, 7),
(10, 8, 15),
-- James Moore teaches CYB201, DFO301
(11, 9, 9),
(12, 9, 17),
-- Linda Taylor teaches SAD201, IPM301
(13, 10, 11),
(14, 10, 12),
-- Thomas Anderson teaches CAR101, OPS201
(15, 11, 13),
(16, 11, 14),
-- Barbara Thomas teaches MLN301, IOT301
(17, 12, 16),
(18, 12, 18);

-- =====================================================
-- COORDINATOR MODULE ASSIGNMENTS
-- =====================================================
INSERT INTO coordinatormodule (coordinatorModuleId, coordinatorId, moduleId) VALUES
-- David Williams coordinates PRG101, DSA201, OOP201
(1, 4, 1),
(2, 4, 2),
(3, 4, 5),
-- Jennifer Brown coordinates DBS301, WEB201, SWE301
(4, 5, 3),
(5, 5, 4),
(6, 5, 6),
-- Michael Davis coordinates NET101, CYB201, CLD301
(7, 6, 8),
(8, 6, 9),
(9, 6, 10);

-- =====================================================
-- STUDENT MODULE ENROLLMENTS
-- =====================================================
INSERT INTO studentmodule (studentModuleId, studentId, moduleId) VALUES
-- Year 1 BSCS students (STU2024001-002) - Semester 1
(1, 13, 1),  -- PRG101
(2, 13, 13), -- CAR101
(3, 14, 1),  -- PRG101
(4, 14, 13), -- CAR101

-- Year 2 BSCS students (STU2024003-005) - Semester 1
(5, 15, 2),  -- DSA201
(6, 15, 4),  -- WEB201
(7, 16, 2),  -- DSA201
(8, 16, 4),  -- WEB201
(9, 17, 2),  -- DSA201
(10, 17, 4), -- WEB201

-- Year 3 BSCS students (STU2024006-007) - Semester 1
(11, 18, 6),  -- SWE301
(12, 18, 7),  -- MAD301
(13, 19, 6),  -- SWE301
(14, 19, 7),  -- MAD301

-- Year 1 BIT students (STU2024008-009) - Semester 1
(15, 20, 8),  -- NET101
(16, 20, 1),  -- PRG101
(17, 21, 8),  -- NET101
(18, 21, 1),  -- PRG101

-- Year 2 BIT students (STU2024010-011) - Semester 1
(19, 22, 9),  -- CYB201
(20, 22, 11), -- SAD201
(21, 23, 9),  -- CYB201
(22, 23, 11), -- SAD201

-- Year 3 BIT students (STU2024012-013) - Semester 1
(23, 24, 10), -- CLD301
(24, 24, 12), -- IPM301
(25, 25, 10), -- CLD301
(26, 25, 12), -- IPM301

-- Additional enrollments for comprehensive testing
(27, 26, 1),  -- DSD student in PRG101
(28, 27, 2),  -- DSD student in DSA201
(29, 28, 6),  -- DSD student in SWE301
(30, 29, 8),  -- NDIT student in NET101
(31, 30, 9),  -- NDIT student in CYB201
(32, 31, 10), -- NDIT student in CLD301
(33, 32, 8),  -- BCIS Year 1 in NET101
(34, 33, 11), -- BCIS Year 2 in SAD201
(35, 36, 2),  -- ADCS student in DSA201
(36, 37, 15); -- ADCS student in AIF301

-- =====================================================
-- ASSESSMENTS (Weightings add up to 100% per module)
-- =====================================================

-- PRG101 Assessments (Total: 100%)
INSERT INTO assessment (assessmentId, assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
(1, 'PRG101 Assignment 1: Variables and Data Types', 100, 15.00, '2024-03-15', '2024-02-01 09:00:00', 4, 1),
(2, 'PRG101 Test 1: Control Structures', 100, 20.00, '2024-04-10', '2024-02-01 09:00:00', 4, 1),
(3, 'PRG101 Assignment 2: Functions and Modules', 100, 15.00, '2024-05-08', '2024-02-01 09:00:00', 4, 1),
(4, 'PRG101 Final Exam', 100, 50.00, '2024-06-15', '2024-02-01 09:00:00', 4, 1),

-- DSA201 Assessments (Total: 100%)
(5, 'DSA201 Assignment 1: Arrays and Lists', 100, 15.00, '2024-03-20', '2024-02-01 09:00:00', 4, 2),
(6, 'DSA201 Test 1: Sorting Algorithms', 100, 20.00, '2024-04-15', '2024-02-01 09:00:00', 4, 2),
(7, 'DSA201 Assignment 2: Trees and Graphs', 100, 15.00, '2024-05-12', '2024-02-01 09:00:00', 4, 2),
(8, 'DSA201 Final Exam', 100, 50.00, '2024-06-18', '2024-02-01 09:00:00', 4, 2),

-- DBS301 Assessments (Total: 100%)
(9, 'DBS301 Assignment 1: SQL Basics', 100, 10.00, '2024-03-18', '2024-02-01 09:00:00', 7, 3),
(10, 'DBS301 Test 1: Normalization', 100, 15.00, '2024-04-12', '2024-02-01 09:00:00', 7, 3),
(11, 'DBS301 Assignment 2: Database Design Project', 100, 25.00, '2024-05-15', '2024-02-01 09:00:00', 7, 3),
(12, 'DBS301 Final Exam', 100, 50.00, '2024-06-20', '2024-02-01 09:00:00', 7, 3),

-- WEB201 Assessments (Total: 100%)
(13, 'WEB201 Assignment 1: HTML/CSS Portfolio', 100, 20.00, '2024-03-25', '2024-02-01 09:00:00', 5, 4),
(14, 'WEB201 Test 1: JavaScript Fundamentals', 100, 15.00, '2024-04-18', '2024-02-01 09:00:00', 5, 4),
(15, 'WEB201 Assignment 2: Full Stack Web App', 100, 25.00, '2024-05-20', '2024-02-01 09:00:00', 5, 4),
(16, 'WEB201 Final Exam', 100, 40.00, '2024-06-22', '2024-02-01 09:00:00', 5, 4),

-- OOP201 Assessments (Total: 100%)
(17, 'OOP201 Assignment 1: Classes and Objects', 100, 15.00, '2024-03-12', '2024-02-01 09:00:00', 5, 5),
(18, 'OOP201 Test 1: Inheritance and Polymorphism', 100, 20.00, '2024-04-08', '2024-02-01 09:00:00', 5, 5),
(19, 'OOP201 Assignment 2: Design Patterns', 100, 15.00, '2024-05-10', '2024-02-01 09:00:00', 5, 5),
(20, 'OOP201 Final Exam', 100, 50.00, '2024-06-16', '2024-02-01 09:00:00', 5, 5),

-- SWE301 Assessments (Total: 100%)
(21, 'SWE301 Assignment 1: Requirements Analysis', 100, 15.00, '2024-03-22', '2024-02-01 09:00:00', 7, 6),
(22, 'SWE301 Test 1: Software Design', 100, 20.00, '2024-04-20', '2024-02-01 09:00:00', 7, 6),
(23, 'SWE301 Group Project: SDLC Implementation', 100, 30.00, '2024-05-25', '2024-02-01 09:00:00', 7, 6),
(24, 'SWE301 Final Exam', 100, 35.00, '2024-06-25', '2024-02-01 09:00:00', 7, 6),

-- MAD301 Assessments (Total: 100%)
(25, 'MAD301 Assignment 1: Android App Prototype', 100, 20.00, '2024-03-28', '2024-02-01 09:00:00', 8, 7),
(26, 'MAD301 Test 1: Mobile UI/UX Design', 100, 15.00, '2024-04-22', '2024-02-01 09:00:00', 8, 7),
(27, 'MAD301 Assignment 2: Cross-Platform App', 100, 25.00, '2024-05-28', '2024-02-01 09:00:00', 8, 7),
(28, 'MAD301 Final Exam', 100, 40.00, '2024-06-28', '2024-02-01 09:00:00', 8, 7),

-- NET101 Assessments (Total: 100%)
(29, 'NET101 Assignment 1: Network Configuration', 100, 15.00, '2024-03-14', '2024-02-01 09:00:00', 6, 8),
(30, 'NET101 Test 1: OSI Model and Protocols', 100, 20.00, '2024-04-11', '2024-02-01 09:00:00', 6, 8),
(31, 'NET101 Assignment 2: Network Design Project', 100, 15.00, '2024-05-09', '2024-02-01 09:00:00', 6, 8),
(32, 'NET101 Final Exam', 100, 50.00, '2024-06-17', '2024-02-01 09:00:00', 6, 8),

-- CYB201 Assessments (Total: 100%)
(33, 'CYB201 Assignment 1: Security Assessment', 100, 15.00, '2024-03-19', '2024-02-01 09:00:00', 9, 9),
(34, 'CYB201 Test 1: Cryptography', 100, 20.00, '2024-04-16', '2024-02-01 09:00:00', 9, 9),
(35, 'CYB201 Assignment 2: Penetration Testing Lab', 100, 15.00, '2024-05-14', '2024-02-01 09:00:00', 9, 9),
(36, 'CYB201 Final Exam', 100, 50.00, '2024-06-19', '2024-02-01 09:00:00', 9, 9),

-- CLD301 Assessments (Total: 100%)
(37, 'CLD301 Assignment 1: AWS/Azure Deployment', 100, 20.00, '2024-03-26', '2024-02-01 09:00:00', 6, 10),
(38, 'CLD301 Test 1: Cloud Architecture', 100, 15.00, '2024-04-24', '2024-02-01 09:00:00', 6, 10),
(39, 'CLD301 Assignment 2: Microservices Project', 100, 25.00, '2024-05-22', '2024-02-01 09:00:00', 6, 10),
(40, 'CLD301 Final Exam', 100, 40.00, '2024-06-24', '2024-02-01 09:00:00', 6, 10),

-- SAD201 Assessments (Total: 100%)
(41, 'SAD201 Assignment 1: System Analysis', 100, 15.00, '2024-03-21', '2024-02-01 09:00:00', 10, 11),
(42, 'SAD201 Test 1: UML Diagrams', 100, 20.00, '2024-04-19', '2024-02-01 09:00:00', 10, 11),
(43, 'SAD201 Assignment 2: System Design Document', 100, 15.00, '2024-05-16', '2024-02-01 09:00:00', 10, 11),
(44, 'SAD201 Final Exam', 100, 50.00, '2024-06-21', '2024-02-01 09:00:00', 10, 11),

-- IPM301 Assessments (Total: 100%)
(45, 'IPM301 Assignment 1: Project Charter', 100, 15.00, '2024-03-27', '2024-02-01 09:00:00', 10, 12),
(46, 'IPM301 Test 1: Agile Methodologies', 100, 20.00, '2024-04-25', '2024-02-01 09:00:00', 10, 12),
(47, 'IPM301 Group Project: Project Plan', 100, 25.00, '2024-05-29', '2024-02-01 09:00:00', 10, 12),
(48, 'IPM301 Final Exam', 100, 40.00, '2024-06-27', '2024-02-01 09:00:00', 10, 12),

-- CAR101 Assessments (Total: 100%)
(49, 'CAR101 Assignment 1: CPU Architecture', 100, 15.00, '2024-03-13', '2024-02-01 09:00:00', 11, 13),
(50, 'CAR101 Test 1: Memory Systems', 100, 20.00, '2024-04-09', '2024-02-01 09:00:00', 11, 13),
(51, 'CAR101 Assignment 2: Assembly Programming', 100, 15.00, '2024-05-07', '2024-02-01 09:00:00', 11, 13),
(52, 'CAR101 Final Exam', 100, 50.00, '2024-06-14', '2024-02-01 09:00:00', 11, 13),

-- OPS201 Assessments (Total: 100%)
(53, 'OPS201 Assignment 1: Process Management', 100, 15.00, '2024-03-16', '2024-02-01 09:00:00', 11, 14),
(54, 'OPS201 Test 1: File Systems', 100, 20.00, '2024-04-13', '2024-02-01 09:00:00', 11, 14),
(55, 'OPS201 Assignment 2: Linux Administration', 100, 15.00, '2024-05-11', '2024-02-01 09:00:00', 11, 14),
(56, 'OPS201 Final Exam', 100, 50.00, '2024-06-18', '2024-02-01 09:00:00', 11, 14),

-- AIF301 Assessments (Total: 100%)
(57, 'AIF301 Assignment 1: Search Algorithms', 100, 15.00, '2024-03-24', '2024-02-01 09:00:00', 8, 15),
(58, 'AIF301 Test 1: Knowledge Representation', 100, 20.00, '2024-04-21', '2024-02-01 09:00:00', 8, 15),
(59, 'AIF301 Assignment 2: AI Agent Project', 100, 25.00, '2024-05-24', '2024-02-01 09:00:00', 8, 15),
(60, 'AIF301 Final Exam', 100, 40.00, '2024-06-26', '2024-02-01 09:00:00', 8, 15);

-- =====================================================
-- MARK ENTRIES (Realistic performance data)
-- =====================================================
-- PRG101 marks for students (13, 14, 26)
INSERT INTO markentry (markEntryId, mark, submission, dateSubmitted, studentId, assessmentId) VALUES
-- Student 13 (Good performer)
(1, 78.00, 1, '2024-03-14 15:30:00', 13, 1),
(2, 82.00, 1, '2024-04-10 10:15:00', 13, 2),
(3, 75.00, 1, '2024-05-07 16:20:00', 13, 3),
(4, 70.00, 1, '2024-06-15 09:00:00', 13, 4),

-- Student 14 (Struggling student - missing submissions)
(5, 45.00, 1, '2024-03-15 23:45:00', 14, 1),
(6, 0.00, 0, NULL, 14, 2), -- Did not submit
(7, 38.00, 1, '2024-05-08 17:30:00', 14, 3),
(8, 42.00, 1, '2024-06-15 09:00:00', 14, 4),

-- Student 26 (Average performer)
(9, 62.00, 1, '2024-03-15 14:20:00', 26, 1),
(10, 68.00, 1, '2024-04-10 10:45:00', 26, 2),
(11, 65.00, 1, '2024-05-08 15:10:00', 26, 3),
(12, 60.00, 1, '2024-06-15 09:00:00', 26, 4),

-- DSA201 marks for students (15, 16, 17, 27, 36)
-- Student 15 (Excellent student)
(13, 88.00, 1, '2024-03-19 14:00:00', 15, 5),
(14, 92.00, 1, '2024-04-15 10:30:00', 15, 6),
(15, 85.00, 1, '2024-05-11 16:45:00', 15, 7),
(16, 90.00, 1, '2024-06-18 09:00:00', 15, 8),

-- Student 16 (Good performer)
(17, 74.00, 1, '2024-03-20 13:30:00', 16, 5),
(18, 78.00, 1, '2024-04-15 11:00:00', 16, 6),
(19, 72.00, 1, '2024-05-12 15:20:00', 16, 7),
(20, 76.00, 1, '2024-06-18 09:00:00', 16, 8),

-- Student 17 (At-risk student)
(21, 50.00, 1, '2024-03-20 23:50:00', 17, 5),
(22, 48.00, 1, '2024-04-15 10:20:00', 17, 6),
(23, 0.00, 0, NULL, 17, 7), -- Did not submit
(24, 45.00, 1, '2024-06-18 09:00:00', 17, 8),

-- Student 27 (Average)
(25, 65.00, 1, '2024-03-19 16:10:00', 27, 5),
(26, 70.00, 1, '2024-04-15 10:50:00', 27, 6),
(27, 68.00, 1, '2024-05-12 14:30:00', 27, 7),
(28, 67.00, 1, '2024-06-18 09:00:00', 27, 8),

-- Student 36 (ADCS - High performer)
(29, 90.00, 1, '2024-03-19 12:00:00', 36, 5),
(30, 95.00, 1, '2024-04-15 10:00:00', 36, 6),
(31, 92.00, 1, '2024-05-11 14:00:00', 36, 7),
(32, 94.00, 1, '2024-06-18 09:00:00', 36, 8),

-- WEB201 marks for students (15, 16, 17)
-- Student 15
(33, 86.00, 1, '2024-03-24 15:00:00', 15, 13),
(34, 88.00, 1, '2024-04-18 11:30:00', 15, 14),
(35, 84.00, 1, '2024-05-19 17:00:00', 15, 15),
(36, 87.00, 1, '2024-06-22 09:00:00', 15, 16),

-- Student 16
(37, 70.00, 1, '2024-03-25 14:30:00', 16, 13),
(38, 75.00, 1, '2024-04-18 11:45:00', 16, 14),
(39, 73.00, 1, '2024-05-20 16:30:00', 16, 15),
(40, 72.00, 1, '2024-06-22 09:00:00', 16, 16),

-- Student 17 (continuing to struggle)
(41, 52.00, 1, '2024-03-25 23:45:00', 17, 13),
(42, 0.00, 0, NULL, 17, 14), -- Did not submit
(43, 48.00, 1, '2024-05-20 23:55:00', 17, 15),
(44, 50.00, 1, '2024-06-22 09:00:00', 17, 16),

-- SWE301 marks for students (18, 19, 28)
-- Student 18 (Good performer)
(45, 76.00, 1, '2024-03-21 14:45:00', 18, 21),
(46, 80.00, 1, '2024-04-20 11:00:00', 18, 22),
(47, 78.00, 1, '2024-05-24 16:30:00', 18, 23),
(48, 75.00, 1, '2024-06-25 09:00:00', 18, 24),

-- Student 19 (Excellent)
(49, 85.00, 1, '2024-03-21 13:30:00', 19, 21),
(50, 90.00, 1, '2024-04-20 10:30:00', 19, 22),
(51, 88.00, 1, '2024-05-24 15:00:00', 19, 23),
(52, 87.00, 1, '2024-06-25 09:00:00', 19, 24),

-- Student 28 (Average)
(53, 64.00, 1, '2024-03-22 15:20:00', 28, 21),
(54, 68.00, 1, '2024-04-20 11:30:00', 28, 22),
(55, 66.00, 1, '2024-05-25 17:00:00', 28, 23),
(56, 65.00, 1, '2024-06-25 09:00:00', 28, 24),

-- MAD301 marks for students (18, 19)
-- Student 18
(57, 74.00, 1, '2024-03-27 15:00:00', 18, 25),
(58, 77.00, 1, '2024-04-22 11:15:00', 18, 26),
(59, 76.00, 1, '2024-05-27 16:45:00', 18, 27),
(60, 75.00, 1, '2024-06-28 09:00:00', 18, 28),

-- Student 19
(61, 83.00, 1, '2024-03-27 14:00:00', 19, 25),
(62, 88.00, 1, '2024-04-22 10:45:00', 19, 26),
(63, 85.00, 1, '2024-05-27 15:30:00', 19, 27),
(64, 86.00, 1, '2024-06-28 09:00:00', 19, 28),

-- NET101 marks for students (20, 21, 29, 32)
-- Student 20 (Good)
(65, 72.00, 1, '2024-03-13 14:30:00', 20, 29),
(66, 76.00, 1, '2024-04-11 10:45:00', 20, 30),
(67, 74.00, 1, '2024-05-08 16:00:00', 20, 31),
(68, 73.00, 1, '2024-06-17 09:00:00', 20, 32),

-- Student 21 (Struggling)
(69, 48.00, 1, '2024-03-14 23:30:00', 21, 29),
(70, 52.00, 1, '2024-04-11 11:00:00', 21, 30),
(71, 0.00, 0, NULL, 21, 31), -- Did not submit
(72, 46.00, 1, '2024-06-17 09:00:00', 21, 32),

-- Student 29 (Average)
(73, 66.00, 1, '2024-03-14 15:00:00', 29, 29),
(74, 69.00, 1, '2024-04-11 10:30:00', 29, 30),
(75, 67.00, 1, '2024-05-09 15:30:00', 29, 31),
(76, 68.00, 1, '2024-06-17 09:00:00', 29, 32),

-- Student 32 (Good)
(77, 75.00, 1, '2024-03-13 13:45:00', 32, 29),
(78, 78.00, 1, '2024-04-11 10:15:00', 32, 30),
(79, 76.00, 1, '2024-05-08 15:00:00', 32, 31),
(80, 77.00, 1, '2024-06-17 09:00:00', 32, 32),

-- CYB201 marks for students (22, 23, 30)
-- Student 22 (Good)
(81, 77.00, 1, '2024-03-18 14:15:00', 22, 33),
(82, 80.00, 1, '2024-04-16 10:30:00', 22, 34),
(83, 78.00, 1, '2024-05-13 16:15:00', 22, 35),
(84, 79.00, 1, '2024-06-19 09:00:00', 22, 36),

-- Student 23 (Average)
(85, 63.00, 1, '2024-03-19 15:30:00', 23, 33),
(86, 67.00, 1, '2024-04-16 11:00:00', 23, 34),
(87, 65.00, 1, '2024-05-14 16:45:00', 23, 35),
(88, 66.00, 1, '2024-06-19 09:00:00', 23, 36),

-- Student 30 (At-risk)
(89, 51.00, 1, '2024-03-19 23:40:00', 30, 33),
(90, 0.00, 0, NULL, 30, 34), -- Did not submit
(91, 49.00, 1, '2024-05-14 23:50:00', 30, 35),
(92, 47.00, 1, '2024-06-19 09:00:00', 30, 36),

-- CLD301 marks for students (24, 25, 31)
-- Student 24 (Excellent)
(93, 84.00, 1, '2024-03-25 13:30:00', 24, 37),
(94, 88.00, 1, '2024-04-24 10:15:00', 24, 38),
(95, 86.00, 1, '2024-05-21 15:45:00', 24, 39),
(96, 87.00, 1, '2024-06-24 09:00:00', 24, 40),

-- Student 25 (Good)
(97, 73.00, 1, '2024-03-26 14:00:00', 25, 37),
(98, 76.00, 1, '2024-04-24 10:45:00', 25, 38),
(99, 75.00, 1, '2024-05-22 16:15:00', 25, 39),
(100, 74.00, 1, '2024-06-24 09:00:00', 25, 40),

-- Student 31 (Average)
(101, 64.00, 1, '2024-03-26 15:30:00', 31, 37),
(102, 68.00, 1, '2024-04-24 11:15:00', 31, 38),
(103, 66.00, 1, '2024-05-22 17:00:00', 31, 39),
(104, 67.00, 1, '2024-06-24 09:00:00', 31, 40),

-- SAD201 marks for students (22, 23, 33)
-- Student 22
(105, 75.00, 1, '2024-03-20 14:30:00', 22, 41),
(106, 79.00, 1, '2024-04-19 10:45:00', 22, 42),
(107, 77.00, 1, '2024-05-15 16:30:00', 22, 43),
(108, 78.00, 1, '2024-06-21 09:00:00', 22, 44),

-- Student 23
(109, 62.00, 1, '2024-03-21 15:00:00', 23, 41),
(110, 66.00, 1, '2024-04-19 11:15:00', 23, 42),
(111, 64.00, 1, '2024-05-16 17:00:00', 23, 43),
(112, 65.00, 1, '2024-06-21 09:00:00', 23, 44),

-- Student 33 (Good)
(113, 74.00, 1, '2024-03-20 13:45:00', 33, 41),
(114, 77.00, 1, '2024-04-19 10:30:00', 33, 42),
(115, 76.00, 1, '2024-05-15 15:45:00', 33, 43),
(116, 75.00, 1, '2024-06-21 09:00:00', 33, 44),

-- IPM301 marks for students (24, 25)
-- Student 24
(117, 82.00, 1, '2024-03-26 14:15:00', 24, 45),
(118, 86.00, 1, '2024-04-25 10:30:00', 24, 46),
(119, 84.00, 1, '2024-05-28 16:00:00', 24, 47),
(120, 85.00, 1, '2024-06-27 09:00:00', 24, 48),

-- Student 25
(121, 71.00, 1, '2024-03-27 14:45:00', 25, 45),
(122, 74.00, 1, '2024-04-25 11:00:00', 25, 46),
(123, 73.00, 1, '2024-05-29 16:30:00', 25, 47),
(124, 72.00, 1, '2024-06-27 09:00:00', 25, 48),

-- CAR101 marks for students (13, 14)
-- Student 13
(125, 76.00, 1, '2024-03-12 14:30:00', 13, 49),
(126, 80.00, 1, '2024-04-09 10:30:00', 13, 50),
(127, 78.00, 1, '2024-05-06 16:00:00', 13, 51),
(128, 77.00, 1, '2024-06-14 09:00:00', 13, 52),

-- Student 14 (Struggling)
(129, 42.00, 1, '2024-03-13 23:30:00', 14, 49),
(130, 0.00, 0, NULL, 14, 50), -- Did not submit
(131, 40.00, 1, '2024-05-07 23:45:00', 14, 51),
(132, 44.00, 1, '2024-06-14 09:00:00', 14, 52),

-- AIF301 marks for student 37 (ADCS student - High performer)
(133, 92.00, 1, '2024-03-23 13:00:00', 37, 57),
(134, 95.00, 1, '2024-04-21 10:00:00', 37, 58),
(135, 93.00, 1, '2024-05-23 15:00:00', 37, 59),
(136, 94.00, 1, '2024-06-26 09:00:00', 37, 60);

-- =====================================================
-- CLASS SESSIONS
-- =====================================================
INSERT INTO classsession (sessionId, classType, createdAt, expiresAt, attendanceCode, lecturerId, moduleId) VALUES
-- PRG101 Sessions (David Williams)
(1, 'Lecture', '2024-02-05 08:00:00', '2024-02-05 09:00:00', 'PRG001', 4, 1),
(2, 'Tutorial', '2024-02-12 10:00:00', '2024-02-12 11:00:00', 'PRG002', 4, 1),
(3, 'Lecture', '2024-02-19 08:00:00', '2024-02-19 09:00:00', 'PRG003', 4, 1),
(4, 'Lab', '2024-02-26 14:00:00', '2024-02-26 16:00:00', 'PRG004', 4, 1),

-- DSA201 Sessions (David Williams)
(5, 'Lecture', '2024-02-06 09:00:00', '2024-02-06 10:00:00', 'DSA001', 4, 2),
(6, 'Tutorial', '2024-02-13 11:00:00', '2024-02-13 12:00:00', 'DSA002', 4, 2),
(7, 'Lecture', '2024-02-20 09:00:00', '2024-02-20 10:00:00', 'DSA003', 4, 2),
(8, 'Lab', '2024-02-27 15:00:00', '2024-02-27 17:00:00', 'DSA004', 4, 2),

-- WEB201 Sessions (Jennifer Brown)
(9, 'Lecture', '2024-02-07 10:00:00', '2024-02-07 11:00:00', 'WEB001', 5, 4),
(10, 'Tutorial', '2024-02-14 13:00:00', '2024-02-14 14:00:00', 'WEB002', 5, 4),
(11, 'Lecture', '2024-02-21 10:00:00', '2024-02-21 11:00:00', 'WEB003', 5, 4),
(12, 'Lab', '2024-02-28 14:00:00', '2024-02-28 16:00:00', 'WEB004', 5, 4),

-- SWE301 Sessions (Robert Miller)
(13, 'Lecture', '2024-02-08 08:00:00', '2024-02-08 09:00:00', 'SWE001', 7, 6),
(14, 'Tutorial', '2024-02-15 10:00:00', '2024-02-15 11:00:00', 'SWE002', 7, 6),
(15, 'Lecture', '2024-02-22 08:00:00', '2024-02-22 09:00:00', 'SWE003', 7, 6),

-- NET101 Sessions (Michael Davis)
(16, 'Lecture', '2024-02-05 11:00:00', '2024-02-05 12:00:00', 'NET001', 6, 8),
(17, 'Tutorial', '2024-02-12 14:00:00', '2024-02-12 15:00:00', 'NET002', 6, 8),
(18, 'Lecture', '2024-02-19 11:00:00', '2024-02-19 12:00:00', 'NET003', 6, 8),
(19, 'Lab', '2024-02-26 15:00:00', '2024-02-26 17:00:00', 'NET004', 6, 8),

-- CYB201 Sessions (James Moore)
(20, 'Lecture', '2024-02-06 13:00:00', '2024-02-06 14:00:00', 'CYB001', 9, 9),
(21, 'Tutorial', '2024-02-13 15:00:00', '2024-02-13 16:00:00', 'CYB002', 9, 9),
(22, 'Lecture', '2024-02-20 13:00:00', '2024-02-20 14:00:00', 'CYB003', 9, 9),

-- CLD301 Sessions (Michael Davis)
(23, 'Lecture', '2024-02-07 09:00:00', '2024-02-07 10:00:00', 'CLD001', 6, 10),
(24, 'Tutorial', '2024-02-14 11:00:00', '2024-02-14 12:00:00', 'CLD002', 6, 10),
(25, 'Lecture', '2024-02-21 09:00:00', '2024-02-21 10:00:00', 'CLD003', 6, 10),

-- SAD201 Sessions (Linda Taylor)
(26, 'Lecture', '2024-02-08 10:00:00', '2024-02-08 11:00:00', 'SAD001', 10, 11),
(27, 'Tutorial', '2024-02-15 13:00:00', '2024-02-15 14:00:00', 'SAD002', 10, 11),

-- IPM301 Sessions (Linda Taylor)
(28, 'Lecture', '2024-02-09 11:00:00', '2024-02-09 12:00:00', 'IPM001', 10, 12),
(29, 'Tutorial', '2024-02-16 14:00:00', '2024-02-16 15:00:00', 'IPM002', 10, 12);

-- =====================================================
-- ATTENDANCE RECORDS
-- =====================================================
INSERT INTO attendancerecord (attendanceRecordId, studentId, sessionId) VALUES
-- PRG101 Session 1 (Good attendance)
(1, 13, 1),
(2, 14, 1),
(3, 26, 1),

-- PRG101 Session 2 (Student 14 absent)
(4, 13, 2),
(5, 26, 2),

-- PRG101 Session 3 (All present)
(6, 13, 3),
(7, 14, 3),
(8, 26, 3),

-- PRG101 Session 4 (Student 14 absent again)
(9, 13, 4),
(10, 26, 4),

-- DSA201 Session 1 (Good attendance)
(11, 15, 5),
(12, 16, 5),
(13, 17, 5),
(14, 27, 5),
(15, 36, 5),

-- DSA201 Session 2 (Student 17 absent)
(16, 15, 6),
(17, 16, 6),
(18, 27, 6),
(19, 36, 6),

-- DSA201 Session 3 (All present)
(20, 15, 7),
(21, 16, 7),
(22, 17, 7),
(23, 27, 7),
(24, 36, 7),

-- DSA201 Session 4 (Student 17 absent again)
(25, 15, 8),
(26, 16, 8),
(27, 27, 8),
(28, 36, 8),

-- WEB201 Sessions
(29, 15, 9),
(30, 16, 9),
(31, 17, 9),
(32, 15, 10),
(33, 16, 10),
-- Student 17 absent from session 10
(34, 15, 11),
(35, 16, 11),
(36, 17, 11),
(37, 15, 12),
(38, 16, 12),
-- Student 17 absent from session 12

-- NET101 Sessions
(39, 20, 16),
(40, 21, 16),
(41, 29, 16),
(42, 32, 16),
(43, 20, 17),
-- Student 21 absent from session 17
(44, 29, 17),
(45, 32, 17),
(46, 20, 18),
(47, 21, 18),
(48, 29, 18),
(49, 32, 18),
(50, 20, 19),
-- Student 21 absent from session 19
(51, 29, 19),
(52, 32, 19),

-- CYB201 Sessions
(53, 22, 20),
(54, 23, 20),
(55, 30, 20),
(56, 22, 21),
(57, 23, 21),
-- Student 30 absent from session 21
(58, 22, 22),
(59, 23, 22),
-- Student 30 absent from session 22 again

-- CLD301 Sessions
(60, 24, 23),
(61, 25, 23),
(62, 31, 23),
(63, 24, 24),
(64, 25, 24),
(65, 31, 24),
(66, 24, 25),
(67, 25, 25),
(68, 31, 25);

-- =====================================================
-- RISK REPORTS
-- =====================================================
INSERT INTO riskreport (riskReportId, studentModuleId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt) VALUES
-- At-risk students
(1, 4, 'HIGH', 50.00, 50.00, 31.25, '2024-05-15 10:00:00'),     -- Student 14 in CAR101
(2, 3, 'HIGH', 50.00, 75.00, 41.25, '2024-05-15 10:05:00'),     -- Student 14 in PRG101
(3, 10, 'HIGH', 50.00, 75.00, 47.67, '2024-05-15 10:10:00'),    -- Student 17 in WEB201
(4, 9, 'HIGH', 50.00, 75.00, 48.00, '2024-05-15 10:15:00'),     -- Student 17 in DSA201
(5, 18, 'MODERATE', 50.00, 75.00, 48.67, '2024-05-15 10:20:00'), -- Student 21 in PRG101
(6, 16, 'MODERATE', 50.00, 75.00, 49.00, '2024-05-15 10:25:00'), -- Student 21 in NET101
(7, 20, 'MODERATE', 66.67, 75.00, 49.00, '2024-05-15 10:30:00'), -- Student 30 in CYB201

-- Moderate risk students
(8, 28, 'MODERATE', 100.00, 100.00, 63.67, '2024-05-15 10:35:00'), -- Student 26 in PRG101
(9, 25, 'MODERATE', 100.00, 100.00, 67.67, '2024-05-15 10:40:00'), -- Student 27 in DSA201
(10, 22, 'MODERATE', 100.00, 100.00, 64.00, '2024-05-15 10:45:00'), -- Student 23 in SAD201

-- Low risk students (good performers)
(11, 5, 'LOW', 100.00, 100.00, 88.33, '2024-05-15 10:50:00'),  -- Student 15 in DSA201
(12, 11, 'LOW', 100.00, 100.00, 87.33, '2024-05-15 10:55:00'); -- Student 18 in SWE301

-- =====================================================
-- INTERVENTIONS
-- =====================================================
INSERT INTO intervention (interventionId, studentModuleId, coordinatorId, content, createdAt, status) VALUES
-- Interventions for at-risk students
(1, 3, 4, 'Student showing poor attendance (50%) and missed Test 1. Arranged meeting to discuss challenges and provide study support resources. Referred to academic support center for tutoring.', '2024-04-15 14:00:00', 'FOLLOW_UP_DUE'),

(2, 9, 4, 'Student has 50% attendance rate and failed to submit Assignment 2. Met with student who indicated personal difficulties. Agreed on catch-up plan and extended deadlines where possible. Monitoring progress closely.', '2024-05-14 10:30:00', 'ACTIVE'),

(3, 16, 6, 'Poor attendance pattern (50%) and missed Assignment 2. Student expressed difficulty understanding networking concepts. Arranged peer tutoring and additional lab sessions. Provided supplementary learning materials.', '2024-05-09 15:00:00', 'FOLLOW_UP_DUE'),

(4, 20, 6, 'Attendance issues (66.67%) and low test scores. Student missed multiple tutorial sessions. Discussed time management and study techniques. Set up weekly check-ins with tutor.', '2024-05-14 11:00:00', 'ACTIVE'),

(5, 28, 4, 'Student performance borderline. Averaging 63% with consistent but moderate performance. Provided guidance on improving coding practices and problem-solving approaches. Recommended additional practice exercises.', '2024-05-10 13:00:00', 'CLOSED');

-- =====================================================
-- FOLLOW-UPS
-- =====================================================
INSERT INTO followup (followUpId, interventionId, content, outcome, createdAt) VALUES
(1, 1, 'Follow-up meeting held. Student attended tutoring sessions and showed improved engagement. Attendance improved in recent weeks. Completed catch-up assignments with passing grades.', 'IMPROVED', '2024-05-20 14:00:00'),

(2, 3, 'Student attended two extra lab sessions and peer tutoring. Showed better understanding of networking fundamentals. However, still struggling with advanced concepts. Need continued support.', 'NO_CHANGE', '2024-05-23 10:00:00'),

(3, 5, 'Student successfully completed recommended exercises and showed improvement in coding assignments. Final assessment performance was satisfactory. Student ready to proceed without further intervention.', 'IMPROVED', '2024-06-05 11:00:00');

-- =====================================================
-- Re-enable foreign key checks
-- =====================================================
SET FOREIGN_KEY_CHECKS=1;
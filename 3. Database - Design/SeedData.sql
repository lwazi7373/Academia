USE Academia;

-- Insert Faculties
INSERT INTO Faculty (facultyName) VALUES
('Faculty of Engineering and the Built Environment'),
('Faculty of Science'),
('Faculty of Commerce, Law and Management'),
('Faculty of Health Sciences'),
('Faculty of Humanities');

-- Insert Departments
INSERT INTO Department (departmentName, facultyId) VALUES
('Computer Science', 1),
('Electrical Engineering', 1),
('Civil Engineering', 1),
('Mathematics', 2),
('Physics', 2),
('Chemistry', 2),
('Accounting', 3),
('Business Management', 3),
('Economics', 3),
('Nursing', 4);

-- Insert Qualifications
INSERT INTO Qualification (qualificationName, qualificationCode, duration, totalCredits, departmentId) VALUES
('Bachelor of Science in Computer Science', 'BSC-CS', 3, 360, 1),
('Bachelor of Engineering in Electrical Engineering', 'BENG-EE', 4, 480, 2),
('Bachelor of Science in Civil Engineering', 'BSC-CE', 4, 480, 3),
('Bachelor of Science in Mathematics', 'BSC-MATH', 3, 360, 4),
('Bachelor of Commerce in Accounting', 'BCOM-ACC', 3, 360, 7),
('Bachelor of Business Administration', 'BBA', 3, 360, 8),
('Bachelor of Science in Nursing', 'BSC-NURS', 4, 480, 10);

-- Insert Users (Admin, HODs, Coordinators, Lecturers, Students)
INSERT INTO Users (firstName, lastName, title, emailAddress, userPassword, contactNo, isActive, userRole, dateRegistered, gender, idNumber) VALUES
-- Admin
('Sarah', 'Johnson', 'Dr', 'sarah.johnson@university.ac.za', '$2y$10$hashedpassword1', '0123456789', TRUE, 'ADMIN', '2020-01-15', 'Female', '8505150123456'),

-- HODs
('Michael', 'Chen', 'Prof', 'michael.chen@university.ac.za', '$2y$10$hashedpassword2', '0123456790', TRUE, 'HOD', '2019-03-01', 'Male', '7803201234567'),
('Linda', 'Williams', 'Prof', 'linda.williams@university.ac.za', '$2y$10$hashedpassword3', '0123456791', TRUE, 'HOD', '2018-07-15', 'Female', '7512151234568'),
('David', 'Brown', 'Dr', 'david.brown@university.ac.za', '$2y$10$hashedpassword4', '0123456792', TRUE, 'HOD', '2019-09-01', 'Male', '8209011234569'),

-- Coordinators
('Jennifer', 'Martinez', 'Dr', 'jennifer.martinez@university.ac.za', '$2y$10$hashedpassword5', '0123456793', TRUE, 'COORDINATOR', '2020-02-10', 'Female', '8607101234570'),
('Robert', 'Taylor', 'Dr', 'robert.taylor@university.ac.za', '$2y$10$hashedpassword6', '0123456794', TRUE, 'COORDINATOR', '2020-03-15', 'Male', '8111151234571'),
('Patricia', 'Anderson', 'Dr', 'patricia.anderson@university.ac.za', '$2y$10$hashedpassword7', '0123456795', TRUE, 'COORDINATOR', '2020-04-20', 'Female', '8404201234572'),

-- Lecturers
('James', 'Wilson', 'Dr', 'james.wilson@university.ac.za', '$2y$10$hashedpassword8', '0123456796', TRUE, 'LECTURER', '2021-01-05', 'Male', '8501051234573'),
('Mary', 'Moore', 'Dr', 'mary.moore@university.ac.za', '$2y$10$hashedpassword9', '0123456797', TRUE, 'LECTURER', '2021-02-10', 'Female', '8702101234574'),
('John', 'Jackson', 'Mr', 'john.jackson@university.ac.za', '$2y$10$hashedpassword10', '0123456798', TRUE, 'LECTURER', '2021-03-15', 'Male', '9003151234575'),
('Elizabeth', 'White', 'Dr', 'elizabeth.white@university.ac.za', '$2y$10$hashedpassword11', '0123456799', TRUE, 'LECTURER', '2021-04-20', 'Female', '8604201234576'),
('William', 'Harris', 'Mr', 'william.harris@university.ac.za', '$2y$10$hashedpassword12', '0123456800', TRUE, 'LECTURER', '2021-05-25', 'Male', '8905251234577'),
('Susan', 'Martin', 'Dr', 'susan.martin@university.ac.za', '$2y$10$hashedpassword13', '0123456801', TRUE, 'LECTURER', '2021-06-30', 'Female', '8506301234578'),
('Richard', 'Thompson', 'Mr', 'richard.thompson@university.ac.za', '$2y$10$hashedpassword14', '0123456802', TRUE, 'LECTURER', '2021-07-05', 'Male', '9107051234579'),
('Karen', 'Garcia', 'Dr', 'karen.garcia@university.ac.za', '$2y$10$hashedpassword15', '0123456803', TRUE, 'LECTURER', '2021-08-10', 'Female', '8708101234580'),

-- Students (30 students)
('Emma', 'Davis', NULL, 'emma.davis@student.university.ac.za', '$2y$10$hashedpassword16', '0723456789', TRUE, 'STUDENT', '2023-02-01', 'Female', '0302010123456'),
('Noah', 'Rodriguez', NULL, 'noah.rodriguez@student.university.ac.za', '$2y$10$hashedpassword17', '0723456790', TRUE, 'STUDENT', '2023-02-01', 'Male', '0301150234567'),
('Olivia', 'Martinez', NULL, 'olivia.martinez@student.university.ac.za', '$2y$10$hashedpassword18', '0723456791', TRUE, 'STUDENT', '2023-02-01', 'Female', '0303200345678'),
('Liam', 'Hernandez', NULL, 'liam.hernandez@student.university.ac.za', '$2y$10$hashedpassword19', '0723456792', TRUE, 'STUDENT', '2023-02-01', 'Male', '0304050456789'),
('Ava', 'Lopez', NULL, 'ava.lopez@student.university.ac.za', '$2y$10$hashedpassword20', '0723456793', TRUE, 'STUDENT', '2023-02-01', 'Female', '0305100567890'),
('Ethan', 'Gonzalez', NULL, 'ethan.gonzalez@student.university.ac.za', '$2y$10$hashedpassword21', '0723456794', TRUE, 'STUDENT', '2023-02-01', 'Male', '0306150678901'),
('Sophia', 'Wilson', NULL, 'sophia.wilson@student.university.ac.za', '$2y$10$hashedpassword22', '0723456795', TRUE, 'STUDENT', '2023-02-01', 'Female', '0307200789012'),
('Mason', 'Anderson', NULL, 'mason.anderson@student.university.ac.za', '$2y$10$hashedpassword23', '0723456796', TRUE, 'STUDENT', '2023-02-01', 'Male', '0308050890123'),
('Isabella', 'Thomas', NULL, 'isabella.thomas@student.university.ac.za', '$2y$10$hashedpassword24', '0723456797', TRUE, 'STUDENT', '2023-02-01', 'Female', '0309100901234'),
('Lucas', 'Taylor', NULL, 'lucas.taylor@student.university.ac.za', '$2y$10$hashedpassword25', '0723456798', TRUE, 'STUDENT', '2023-02-01', 'Male', '0310151012345'),
('Mia', 'Moore', NULL, 'mia.moore@student.university.ac.za', '$2y$10$hashedpassword26', '0723456799', TRUE, 'STUDENT', '2022-02-01', 'Female', '0202011123456'),
('Alexander', 'Jackson', NULL, 'alexander.jackson@student.university.ac.za', '$2y$10$hashedpassword27', '0723456800', TRUE, 'STUDENT', '2022-02-01', 'Male', '0201151234567'),
('Charlotte', 'Martin', NULL, 'charlotte.martin@student.university.ac.za', '$2y$10$hashedpassword28', '0723456801', TRUE, 'STUDENT', '2022-02-01', 'Female', '0203201345678'),
('Benjamin', 'Lee', NULL, 'benjamin.lee@student.university.ac.za', '$2y$10$hashedpassword29', '0723456802', TRUE, 'STUDENT', '2022-02-01', 'Male', '0204051456789'),
('Amelia', 'Perez', NULL, 'amelia.perez@student.university.ac.za', '$2y$10$hashedpassword30', '0723456803', TRUE, 'STUDENT', '2022-02-01', 'Female', '0205101567890'),
('Henry', 'White', NULL, 'henry.white@student.university.ac.za', '$2y$10$hashedpassword31', '0723456804', TRUE, 'STUDENT', '2022-02-01', 'Male', '0206151678901'),
('Evelyn', 'Harris', NULL, 'evelyn.harris@student.university.ac.za', '$2y$10$hashedpassword32', '0723456805', TRUE, 'STUDENT', '2022-02-01', 'Female', '0207201789012'),
('Sebastian', 'Clark', NULL, 'sebastian.clark@student.university.ac.za', '$2y$10$hashedpassword33', '0723456806', TRUE, 'STUDENT', '2022-02-01', 'Male', '0208051890123'),
('Harper', 'Lewis', NULL, 'harper.lewis@student.university.ac.za', '$2y$10$hashedpassword34', '0723456807', TRUE, 'STUDENT', '2022-02-01', 'Female', '0209101901234'),
('Michael', 'Robinson', NULL, 'michael.robinson@student.university.ac.za', '$2y$10$hashedpassword35', '0723456808', TRUE, 'STUDENT', '2022-02-01', 'Male', '0210152012345'),
('Abigail', 'Walker', NULL, 'abigail.walker@student.university.ac.za', '$2y$10$hashedpassword36', '0723456809', TRUE, 'STUDENT', '2021-02-01', 'Female', '0102012123456'),
('Daniel', 'Hall', NULL, 'daniel.hall@student.university.ac.za', '$2y$10$hashedpassword37', '0723456810', TRUE, 'STUDENT', '2021-02-01', 'Male', '0101152234567'),
('Emily', 'Allen', NULL, 'emily.allen@student.university.ac.za', '$2y$10$hashedpassword38', '0723456811', TRUE, 'STUDENT', '2021-02-01', 'Female', '0103202345678'),
('Matthew', 'Young', NULL, 'matthew.young@student.university.ac.za', '$2y$10$hashedpassword39', '0723456812', TRUE, 'STUDENT', '2021-02-01', 'Male', '0104052456789'),
('Elizabeth', 'King', NULL, 'elizabeth.king@student.university.ac.za', '$2y$10$hashedpassword40', '0723456813', TRUE, 'STUDENT', '2021-02-01', 'Female', '0105102567890'),
('Joseph', 'Wright', NULL, 'joseph.wright@student.university.ac.za', '$2y$10$hashedpassword41', '0723456814', TRUE, 'STUDENT', '2021-02-01', 'Male', '0106152678901'),
('Sofia', 'Lopez', NULL, 'sofia.lopez@student.university.ac.za', '$2y$10$hashedpassword42', '0723456815', TRUE, 'STUDENT', '2021-02-01', 'Female', '0107202789012'),
('David', 'Hill', NULL, 'david.hill@student.university.ac.za', '$2y$10$hashedpassword43', '0723456816', TRUE, 'STUDENT', '2021-02-01', 'Male', '0108052890123'),
('Avery', 'Scott', NULL, 'avery.scott@student.university.ac.za', '$2y$10$hashedpassword44', '0723456817', TRUE, 'STUDENT', '2021-02-01', 'Female', '0109102901234'),
('Samuel', 'Green', NULL, 'samuel.green@student.university.ac.za', '$2y$10$hashedpassword45', '0723456818', TRUE, 'STUDENT', '2021-02-01', 'Male', '0110153012345');

-- Insert Students (linking to Users)
INSERT INTO Student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) VALUES
(16, 'STU2023001', 'Undergraduate', 1, 1),
(17, 'STU2023002', 'Undergraduate', 1, 1),
(18, 'STU2023003', 'Undergraduate', 1, 2),
(19, 'STU2023004', 'Undergraduate', 1, 1),
(20, 'STU2023005', 'Undergraduate', 1, 3),
(21, 'STU2023006', 'Undergraduate', 1, 1),
(22, 'STU2023007', 'Undergraduate', 1, 5),
(23, 'STU2023008', 'Undergraduate', 1, 6),
(24, 'STU2023009', 'Undergraduate', 1, 1),
(25, 'STU2023010', 'Undergraduate', 1, 1),
(26, 'STU2022001', 'Undergraduate', 2, 1),
(27, 'STU2022002', 'Undergraduate', 2, 1),
(28, 'STU2022003', 'Undergraduate', 2, 2),
(29, 'STU2022004', 'Undergraduate', 2, 1),
(30, 'STU2022005', 'Undergraduate', 2, 3),
(31, 'STU2022006', 'Undergraduate', 2, 1),
(32, 'STU2022007', 'Undergraduate', 2, 5),
(33, 'STU2022008', 'Undergraduate', 2, 6),
(34, 'STU2022009', 'Undergraduate', 2, 1),
(35, 'STU2022010', 'Undergraduate', 2, 1),
(36, 'STU2021001', 'Undergraduate', 3, 1),
(37, 'STU2021002', 'Undergraduate', 3, 1),
(38, 'STU2021003', 'Undergraduate', 3, 2),
(39, 'STU2021004', 'Undergraduate', 3, 1),
(40, 'STU2021005', 'Undergraduate', 3, 3),
(41, 'STU2021006', 'Undergraduate', 3, 1),
(42, 'STU2021007', 'Undergraduate', 3, 5),
(43, 'STU2021008', 'Undergraduate', 3, 6),
(44, 'STU2021009', 'Undergraduate', 3, 1),
(45, 'STU2021010', 'Undergraduate', 3, 1);

-- Insert Lecturers (linking to Users)
INSERT INTO Lecturer (lecturerId, departmentId) VALUES
(8, 1),   -- James Wilson - Computer Science
(9, 1),   -- Mary Moore - Computer Science
(10, 2),  -- John Jackson - Electrical Engineering
(11, 2),  -- Elizabeth White - Electrical Engineering
(12, 3),  -- William Harris - Civil Engineering
(13, 4),  -- Susan Martin - Mathematics
(14, 7),  -- Richard Thompson - Accounting
(15, 8);  -- Karen Garcia - Business Management

-- Insert Coordinators (linking to Users)
INSERT INTO Coordinator (coordinatorId, departmentId) VALUES
(5, 1),   -- Jennifer Martinez - Computer Science
(6, 2),   -- Robert Taylor - Electrical Engineering
(7, 7);   -- Patricia Anderson - Accounting

-- Insert HODs (linking to Users)
INSERT INTO HOD (hodId, departmentId) VALUES
(2, 1),   -- Michael Chen - Computer Science
(3, 2),   -- Linda Williams - Electrical Engineering
(4, 7);   -- David Brown - Accounting

-- Insert Modules
INSERT INTO Module (moduleName, moduleCode, credits, departmentId) VALUES
-- Computer Science Modules
('Introduction to Programming', 'CSC1001', 12, 1),
('Data Structures and Algorithms', 'CSC1002', 12, 1),
('Database Systems', 'CSC2001', 15, 1),
('Web Development', 'CSC2002', 15, 1),
('Software Engineering', 'CSC3001', 18, 1),
('Artificial Intelligence', 'CSC3002', 18, 1),
-- Electrical Engineering Modules
('Circuit Theory', 'ELE1001', 12, 2),
('Digital Electronics', 'ELE1002', 12, 2),
('Power Systems', 'ELE2001', 15, 2),
('Control Systems', 'ELE2002', 15, 2),
-- Civil Engineering Modules
('Structural Analysis', 'CIV1001', 12, 3),
('Fluid Mechanics', 'CIV2001', 15, 3),
-- Mathematics Modules
('Calculus I', 'MAT1001', 12, 4),
('Linear Algebra', 'MAT1002', 12, 4),
-- Accounting Modules
('Financial Accounting', 'ACC1001', 12, 7),
('Management Accounting', 'ACC2001', 15, 7),
-- Business Management Modules
('Business Management Principles', 'BUS1001', 12, 8),
('Marketing Management', 'BUS2001', 15, 8);

-- Insert LecturerModule relationships
INSERT INTO LecturerModule (lecturerId, moduleId) VALUES
(8, 1),   -- James Wilson - Introduction to Programming
(8, 2),   -- James Wilson - Data Structures
(9, 3),   -- Mary Moore - Database Systems
(9, 4),   -- Mary Moore - Web Development
(8, 5),   -- James Wilson - Software Engineering
(9, 6),   -- Mary Moore - Artificial Intelligence
(10, 7),  -- John Jackson - Circuit Theory
(11, 8),  -- Elizabeth White - Digital Electronics
(10, 9),  -- John Jackson - Power Systems
(11, 10), -- Elizabeth White - Control Systems
(12, 11), -- William Harris - Structural Analysis
(12, 12), -- William Harris - Fluid Mechanics
(13, 13), -- Susan Martin - Calculus I
(13, 14), -- Susan Martin - Linear Algebra
(14, 15), -- Richard Thompson - Financial Accounting
(14, 16), -- Richard Thompson - Management Accounting
(15, 17), -- Karen Garcia - Business Management Principles
(15, 18); -- Karen Garcia - Marketing Management

-- Insert CoordinatorModule relationships
INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), -- Jennifer coordinates all CS modules
(6, 7), (6, 8), (6, 9), (6, 10), -- Robert coordinates all EE modules
(7, 15), (7, 16); -- Patricia coordinates Accounting modules

-- Insert QualificationModule relationships
INSERT INTO QualificationModule (qualificationId, moduleId, academicYear, semesterNo, isCompulsory) VALUES
-- BSc Computer Science (qualificationId = 1)
(1, 1, 1, 1, TRUE),   -- Introduction to Programming - Year 1, Sem 1
(1, 13, 1, 1, TRUE),  -- Calculus I - Year 1, Sem 1
(1, 2, 1, 2, TRUE),   -- Data Structures - Year 1, Sem 2
(1, 14, 1, 2, TRUE),  -- Linear Algebra - Year 1, Sem 2
(1, 3, 2, 1, TRUE),   -- Database Systems - Year 2, Sem 1
(1, 4, 2, 2, TRUE),   -- Web Development - Year 2, Sem 2
(1, 5, 3, 1, TRUE),   -- Software Engineering - Year 3, Sem 1
(1, 6, 3, 2, TRUE),   -- Artificial Intelligence - Year 3, Sem 2
-- BEng Electrical Engineering (qualificationId = 2)
(2, 7, 1, 1, TRUE),   -- Circuit Theory - Year 1, Sem 1
(2, 13, 1, 1, TRUE),  -- Calculus I - Year 1, Sem 1
(2, 8, 1, 2, TRUE),   -- Digital Electronics - Year 1, Sem 2
(2, 9, 2, 1, TRUE),   -- Power Systems - Year 2, Sem 1
(2, 10, 2, 2, TRUE),  -- Control Systems - Year 2, Sem 2
-- BSc Civil Engineering (qualificationId = 3)
(3, 11, 1, 1, TRUE),  -- Structural Analysis - Year 1, Sem 1
(3, 13, 1, 1, TRUE),  -- Calculus I - Year 1, Sem 1
(3, 12, 2, 1, TRUE),  -- Fluid Mechanics - Year 2, Sem 1
-- BCom Accounting (qualificationId = 5)
(5, 15, 1, 1, TRUE),  -- Financial Accounting - Year 1, Sem 1
(5, 16, 2, 1, TRUE),  -- Management Accounting - Year 2, Sem 1
-- BBA (qualificationId = 6)
(6, 17, 1, 1, TRUE),  -- Business Management Principles - Year 1, Sem 1
(6, 18, 2, 1, TRUE);  -- Marketing Management - Year 2, Sem 1

-- Insert StudentModule relationships (students enrolled in modules)
INSERT INTO StudentModule (studentId, moduleId) VALUES
-- Year 1 Students (2023 intake) - enrolled in first year modules
(16, 1), (16, 13), -- Emma
(17, 1), (17, 13), -- Noah
(19, 1), (19, 13), -- Liam
(21, 1), (21, 13), -- Ethan
(24, 1), (24, 13), -- Isabella
(25, 1), (25, 13), -- Lucas
(18, 7), (18, 13), -- Olivia - Electrical Engineering
(20, 11), (20, 13), -- Ava - Civil Engineering
(22, 15), -- Sophia - Accounting
(23, 17), -- Mason - Business Management
-- Year 2 Students (2022 intake) - enrolled in second year modules
(26, 3), -- Mia - Database Systems
(27, 3), -- Alexander
(29, 3), -- Benjamin
(31, 3), -- Henry
(34, 3), -- Harper
(35, 3), -- Michael
(28, 9), -- Charlotte - Power Systems (EE)
(30, 12), -- Amelia - Fluid Mechanics (Civil)
(32, 16), -- Evelyn - Management Accounting
(33, 18), -- Sebastian - Marketing Management
-- Year 3 Students (2021 intake) - enrolled in third year modules
(36, 5), -- Abigail - Software Engineering
(37, 5), -- Daniel
(39, 5), -- Matthew
(41, 5), -- Joseph
(44, 5), -- Avery
(45, 5); -- Samuel

-- Insert Assessments
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, dateCreated, lecturerId, moduleId) VALUES
-- Introduction to Programming (Module 1)
('Assignment 1: Basic Syntax', 100, 0.10, '2024-03-15', '2024-02-01', 8, 1),
('Test 1: Control Structures', 100, 0.15, '2024-04-10', '2024-02-01', 8, 1),
('Assignment 2: Functions', 100, 0.15, '2024-05-01', '2024-02-01', 8, 1),
('Final Exam', 100, 0.60, '2024-06-15', '2024-02-01', 8, 1),
-- Database Systems (Module 3)
('Assignment 1: ER Diagrams', 100, 0.15, '2024-03-20', '2024-02-01', 9, 3),
('Test 1: SQL Queries', 100, 0.20, '2024-04-15', '2024-02-01', 9, 3),
('Project: Database Design', 100, 0.25, '2024-05-20', '2024-02-01', 9, 3),
('Final Exam', 100, 0.40, '2024-06-18', '2024-02-01', 9, 3),
-- Software Engineering (Module 5)
('Assignment 1: Requirements Analysis', 100, 0.15, '2024-03-25', '2024-02-01', 8, 5),
('Test 1: Design Patterns', 100, 0.15, '2024-04-20', '2024-02-01', 8, 5),
('Group Project', 100, 0.30, '2024-05-25', '2024-02-01', 8, 5),
('Final Exam', 100, 0.40, '2024-06-20', '2024-02-01', 8, 5),
-- Circuit Theory (Module 7)
('Assignment 1', 100, 0.15, '2024-03-18', '2024-02-01', 10, 7),
('Test 1', 100, 0.20, '2024-04-12', '2024-02-01', 10, 7),
('Lab Report', 100, 0.15, '2024-05-10', '2024-02-01', 10, 7),
('Final Exam', 100, 0.50, '2024-06-16', '2024-02-01', 10, 7),
-- Power Systems (Module 9)
('Assignment 1', 100, 0.15, '2024-03-22', '2024-02-01', 10, 9),
('Test 1', 100, 0.20, '2024-04-18', '2024-02-01', 10, 9),
('Project', 100, 0.25, '2024-05-22', '2024-02-01', 10, 9),
('Final Exam', 100, 0.40, '2024-06-22', '2024-02-01', 10, 9);

-- Insert Class Sessions
INSERT INTO ClassSession (classType, startTime, EndTime, dateCreated, lecturerId, moduleId) VALUES
-- Introduction to Programming sessions
('Lecture', '08:00:00', '10:00:00', '2024-02-05', 8, 1),
('Lecture', '08:00:00', '10:00:00', '2024-02-12', 8, 1),
('Lab', '14:00:00', '16:00:00', '2024-02-06', 8, 1),
('Lecture', '08:00:00', '10:00:00', '2024-02-19', 8, 1),
('Lab', '14:00:00', '16:00:00', '2024-02-20', 8, 1),
-- Database Systems sessions
('Lecture', '10:00:00', '12:00:00', '2024-02-05', 9, 3),
('Lecture', '10:00:00', '12:00:00', '2024-02-12', 9, 3),
('Lab', '14:00:00', '17:00:00', '2024-02-07', 9, 3),
('Lecture', '10:00:00', '12:00:00', '2024-02-19', 9, 3),
('Lab', '14:00:00', '17:00:00', '2024-02-21', 9, 3),
-- Software Engineering sessions
('Lecture', '13:00:00', '15:00:00', '2024-02-06', 8, 5),
('Lecture', '13:00:00', '15:00:00', '2024-02-13', 8, 5),
('Workshop', '15:00:00', '17:00:00', '2024-02-08', 8, 5),
('Lecture', '13:00:00', '15:00:00', '2024-02-20', 8, 5),
-- Circuit Theory sessions
('Lecture', '09:00:00', '11:00:00', '2024-02-05', 10, 7),
('Lecture', '09:00:00', '11:00:00', '2024-02-12', 10, 7),
('Lab', '14:00:00', '16:00:00', '2024-02-08', 10, 7),
('Lecture', '09:00:00', '11:00:00', '2024-02-19', 10, 7);

-- Insert Attendance Records (varied attendance patterns)
INSERT INTO AttendanceRecord (StudentId, sessionId) VALUES
-- Good attendance students (Introduction to Programming)
(16, 1), (16, 2), (16, 3), (16, 4), (16, 5), -- Emma - 100% attendance
(17, 1), (17, 2), (17, 3), (17, 4), (17, 5), -- Noah - 100% attendance
(19, 1), (19, 2), (19, 3), (19, 4), -- Liam - 80% attendance (missed 1)
(21, 1), (21, 2), (21, 3), (21, 4), (21, 5), -- Ethan - 100% attendance
-- Poor attendance students (at-risk)
(24, 1), (24, 3), -- Isabella - 40% attendance (missed 3 sessions)
(25, 1), (25, 2), -- Lucas - 40% attendance (missed 3 sessions)
-- Database Systems attendance (Year 2 students)
(26, 6), (26, 7), (26, 8), (26, 9), (26, 10), -- Mia - 100% attendance
(27, 6), (27, 7), (27, 8), (27, 9), (27, 10), -- Alexander - 100% attendance
(29, 6), (29, 7), (29, 9), -- Benjamin - 60% attendance
(31, 6), (31, 7), (31, 8), (31, 9), (31, 10), -- Henry - 100% attendance
(34, 6), (34, 8), -- Harper - 40% attendance (at-risk)
(35, 6), (35, 7), (35, 9), (35, 10), -- Michael - 80% attendance
-- Software Engineering attendance (Year 3 students)
(36, 11), (36, 12), (36, 13), (36, 14), -- Abigail - 100% attendance
(37, 11), (37, 12), (37, 13), (37, 14), -- Daniel - 100% attendance
(39, 11), (39, 13), -- Matthew - 50% attendance (at-risk)
(41, 11), (41, 12), (41, 13), (41, 14), -- Joseph - 100% attendance
(44, 11), (44, 12), (44, 14), -- Avery - 75% attendance
(45, 11), (45, 12), (45, 13), -- Samuel - 75% attendance
-- Circuit Theory attendance (EE students)
(18, 15), (18, 16), (18, 17), (18, 18); -- Olivia - 100% attendance

-- Insert Mark Entries (varied performance)
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
-- Introduction to Programming - Assignment 1 (assessmentId = 1)
(85, TRUE, '2024-03-14', 16, 1), -- Emma - Good
(78, TRUE, '2024-03-15', 17, 1), -- Noah - Good
(65, TRUE, '2024-03-15', 19, 1), -- Liam - Average
(72, TRUE, '2024-03-14', 21, 1), -- Ethan - Good
(45, TRUE, '2024-03-16', 24, 1), -- Isabella - Poor (at-risk)
(NULL, FALSE, '2024-03-16', 25, 1), -- Lucas - No submission (at-risk)
-- Introduction to Programming - Test 1 (assessmentId = 2)
(82, TRUE, '2024-04-10', 16, 2), -- Emma
(75, TRUE, '2024-04-10', 17, 2), -- Noah
(58, TRUE, '2024-04-10', 19, 2), -- Liam
(70, TRUE, '2024-04-10', 21, 2), -- Ethan
(38, TRUE, '2024-04-10', 24, 2), -- Isabella - Failing
(42, TRUE, '2024-04-10', 25, 2), -- Lucas - Poor
-- Introduction to Programming - Assignment 2 (assessmentId = 3)
(88, TRUE, '2024-05-01', 16, 3), -- Emma
(80, TRUE, '2024-05-01', 17, 3), -- Noah
(62, TRUE, '2024-05-01', 19, 3), -- Liam
(75, TRUE, '2024-05-01', 21, 3), -- Ethan
(NULL, FALSE, '2024-05-01', 24, 3), -- Isabella - No submission
(48, TRUE, '2024-05-02', 25, 3), -- Lucas - Poor, late
-- Database Systems - Assignment 1 (assessmentId = 5)
(90, TRUE, '2024-03-20', 26, 5), -- Mia - Excellent
(82, TRUE, '2024-03-20', 27, 5), -- Alexander - Good
(55, TRUE, '2024-03-20', 29, 5), -- Benjamin - Below average
(78, TRUE, '2024-03-20', 31, 5), -- Henry - Good
(40, TRUE, '2024-03-21', 34, 5), -- Harper - Poor (at-risk)
(68, TRUE, '2024-03-20', 35, 5), -- Michael - Average
-- Database Systems - Test 1 (assessmentId = 6)
(88, TRUE, '2024-04-15', 26, 6), -- Mia
(79, TRUE, '2024-04-15', 27, 6), -- Alexander
(52, TRUE, '2024-04-15', 29, 6), -- Benjamin
(76, TRUE, '2024-04-15', 31, 6), -- Henry
(35, TRUE, '2024-04-15', 34, 6), -- Harper - Failing
(65, TRUE, '2024-04-15', 35, 6), -- Michael
-- Database Systems - Project (assessmentId = 7)
(92, TRUE, '2024-05-20', 26, 7), -- Mia
(85, TRUE, '2024-05-20', 27, 7), -- Alexander
(58, TRUE, '2024-05-20', 29, 7), -- Benjamin
(80, TRUE, '2024-05-20', 31, 7), -- Henry
(NULL, FALSE, '2024-05-20', 34, 7), -- Harper - No submission
(70, TRUE, '2024-05-20', 35, 7), -- Michael
-- Software Engineering - Assignment 1 (assessmentId = 9)
(85, TRUE, '2024-03-25', 36, 9), -- Abigail
(88, TRUE, '2024-03-25', 37, 9), -- Daniel
(50, TRUE, '2024-03-26', 39, 9), -- Matthew - Poor (at-risk)
(78, TRUE, '2024-03-25', 41, 9), -- Joseph
(72, TRUE, '2024-03-25', 44, 9), -- Avery
(75, TRUE, '2024-03-25', 45, 9), -- Samuel
-- Software Engineering - Test 1 (assessmentId = 10)
(82, TRUE, '2024-04-20', 36, 10), -- Abigail
(86, TRUE, '2024-04-20', 37, 10), -- Daniel
(45, TRUE, '2024-04-20', 39, 10), -- Matthew - Failing
(75, TRUE, '2024-04-20', 41, 10), -- Joseph
(68, TRUE, '2024-04-20', 44, 10), -- Avery
(72, TRUE, '2024-04-20', 45, 10), -- Samuel
-- Software Engineering - Group Project (assessmentId = 11)
(88, TRUE, '2024-05-25', 36, 11), -- Abigail
(90, TRUE, '2024-05-25', 37, 11), -- Daniel
(NULL, FALSE, '2024-05-25', 39, 11), -- Matthew - No submission
(80, TRUE, '2024-05-25', 41, 11), -- Joseph
(75, TRUE, '2024-05-25', 44, 11), -- Avery
(78, TRUE, '2024-05-25', 45, 11), -- Samuel
-- Circuit Theory - Assignment 1 (assessmentId = 13)
(80, TRUE, '2024-03-18', 18, 13), -- Olivia - Good
-- Circuit Theory - Test 1 (assessmentId = 14)
(76, TRUE, '2024-04-12', 18, 14); -- Olivia

-- Insert Risk Reports
INSERT INTO RiskReport (studentModuleId, riskLevel, attendanceRate, submissionRate, averageMark, dateCalculated) VALUES
-- HIGH RISK students
(9, 'HIGH', 40.00, 33.33, 41.50, '2024-05-15'), -- Isabella (studentId 24) - Module 1
(10, 'HIGH', 40.00, 66.67, 45.00, '2024-05-15'), -- Lucas (studentId 25) - Module 1
(15, 'HIGH', 40.00, 66.67, 37.50, '2024-05-20'), -- Harper (studentId 34) - Module 3
(21, 'HIGH', 50.00, 66.67, 47.50, '2024-05-25'), -- Matthew (studentId 39) - Module 5
-- MODERATE RISK students
(4, 'MODERATE', 80.00, 100.00, 61.67, '2024-05-15'), -- Liam (studentId 19) - Module 1
(13, 'MODERATE', 60.00, 100.00, 55.00, '2024-05-20'), -- Benjamin (studentId 29) - Module 3
-- LOW RISK students (good performance)
(1, 'LOW', 100.00, 100.00, 85.00, '2024-05-15'), -- Emma (studentId 16) - Module 1
(2, 'LOW', 100.00, 100.00, 77.67, '2024-05-15'), -- Noah (studentId 17) - Module 1
(3, 'LOW', 100.00, 100.00, 72.33, '2024-05-15'), -- Ethan (studentId 21) - Module 1
(11, 'LOW', 100.00, 100.00, 90.00, '2024-05-20'), -- Mia (studentId 26) - Module 3
(12, 'LOW', 100.00, 100.00, 82.00, '2024-05-20'), -- Alexander (studentId 27) - Module 3
(14, 'LOW', 100.00, 100.00, 78.00, '2024-05-20'), -- Henry (studentId 31) - Module 3
(19, 'LOW', 100.00, 100.00, 85.00, '2024-05-25'), -- Abigail (studentId 36) - Module 5
(20, 'LOW', 100.00, 100.00, 88.00, '2024-05-25'); -- Daniel (studentId 37) - Module 5

-- Insert Interventions (for at-risk students)
INSERT INTO Intervention (studentModuleId, coordinatorId, content, dateCreated, status) VALUES
-- Interventions for HIGH RISK students
(9, 5, 'Student Isabella has shown poor attendance (40%) and is failing assessments with an average of 41.5%. Immediate intervention required. Scheduled one-on-one meeting to discuss challenges and create action plan. Recommended tutoring sessions and study group participation.', '2024-05-16', 'FOLLOW_UP_DUE'),
(10, 5, 'Student Lucas has very poor performance with 40% attendance and missed submissions. Average mark of 45%. Met with student to identify barriers to success. Discussed time management and referred to student counseling services. Set up weekly check-ins.', '2024-05-16', 'ACTIVE'),
(15, 5, 'Student Harper in Database Systems showing critical issues - 40% attendance, missed major project submission, failing with 37.5% average. Urgent intervention scheduled. Parents contacted with student consent. Academic probation warning issued.', '2024-05-21', 'ACTIVE'),
(21, 5, 'Student Matthew in Software Engineering - 50% attendance, failed test, missed group project. Average 47.5%. Serious academic concerns. Meeting held to discuss possible course withdrawal or extension. Referred to academic advisor and student wellness.', '2024-05-26', 'FOLLOW_UP_DUE'),
-- Interventions for MODERATE RISK students
(4, 5, 'Student Liam showing signs of struggle with 61.67% average despite 80% attendance. Proactive intervention to prevent further decline. Recommended additional tutorial sessions and peer study groups. Will monitor progress closely.', '2024-05-17', 'CLOSED'),
(13, 5, 'Student Benjamin has moderate risk indicators - 60% attendance and 55% average in Database Systems. Met with student to address attendance issues. Created attendance improvement plan and connected with peer mentor. Follow-up scheduled.', '2024-05-22', 'FOLLOW_UP_DUE');

-- Insert Follow-ups
INSERT INTO FollowUp (interventionId, content, outcome, dateCreated) VALUES
-- Follow-up for Isabella
(1, 'Met with Isabella for second session. She has attended 2 additional tutoring sessions and submitted pending work. Attendance improved to 60% over past two weeks. Test performance shows improvement with score of 55%. Student reports better understanding of material and improved time management.', 'IMPROVED', '2024-05-30'),
-- Follow-up for Matthew  
(4, 'Follow-up meeting with Matthew revealed personal issues affecting academic performance. Student has engaged with counseling services. However, academic performance has not improved significantly. Discussed options including taking leave of absence or repeating the module next semester. No recent submissions.', 'NO_CHANGE', '2024-06-05'),
-- Follow-up for Benjamin
(6, 'Benjamin has shown good response to intervention. Attendance improved to 80% and recent quiz score was 68%. Student actively participating in peer study group. Will continue monitoring but risk level appears to be decreasing. Positive engagement with support structures.', 'IMPROVED', '2024-06-01'),
-- Additional follow-up for Liam (intervention already closed)
(5, 'Liam completed additional tutorial sessions and showed improvement in understanding. Recent assignment score of 70%. Student now confident with material. Intervention successfully closed. Student encouraged to continue good study habits.', 'IMPROVED', '2024-05-25');
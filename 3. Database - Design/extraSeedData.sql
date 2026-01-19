-- ============================================
-- FUTURE ASSESSMENTS FOR 2026 SEMESTER 1
-- Current Date: January 19, 2026
-- These assessments have future due dates to support the getUpcomingAssessments function
-- ============================================

USE Academia;

-- First, let's add the 2026 Semester 1 period if needed (update it to active)
UPDATE academicPeriod 
SET isActive = FALSE 
WHERE periodId = 4;

UPDATE academicPeriod 
SET isActive = TRUE 
WHERE periodId = 5;

-- ============================================
-- FUTURE ASSESSMENTS - Module 1: Programming Fundamentals (CSC101)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 15.00, '2026-02-20', '2026-02-01 10:00:00', 11, 1),
('Test 1', 100, 20.00, '2026-03-15', '2026-02-01 10:00:00', 11, 1),
('Assignment 2', 100, 15.00, '2026-04-10', '2026-02-01 10:00:00', 11, 1),
('Practical Project', 100, 20.00, '2026-05-05', '2026-02-01 10:00:00', 11, 1),
('Final Exam', 100, 30.00, '2026-06-15', '2026-02-01 10:00:00', 11, 1);

-- ============================================
-- FUTURE ASSESSMENTS - Module 2: Data Structures (CSC201)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Practical 1', 100, 20.00, '2026-02-25', '2026-02-01 10:00:00', 11, 2),
('Test 1', 100, 15.00, '2026-03-20', '2026-02-01 10:00:00', 11, 2),
('Practical 2', 100, 20.00, '2026-04-15', '2026-02-01 10:00:00', 11, 2),
('Project', 100, 15.00, '2026-05-10', '2026-02-01 10:00:00', 11, 2),
('Final Exam', 100, 30.00, '2026-06-18', '2026-02-01 10:00:00', 11, 2);

-- ============================================
-- FUTURE ASSESSMENTS - Module 3: Database Systems (CSC202)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 15.00, '2026-02-22', '2026-02-01 10:00:00', 12, 3),
('Test 1', 100, 20.00, '2026-03-18', '2026-02-01 10:00:00', 12, 3),
('Database Project', 100, 25.00, '2026-04-25', '2026-02-01 10:00:00', 12, 3),
('Final Exam', 100, 40.00, '2026-06-17', '2026-02-01 10:00:00', 12, 3);

-- ============================================
-- FUTURE ASSESSMENTS - Module 4: Software Engineering (CSC301)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Sprint 1', 100, 20.00, '2026-03-01', '2026-02-01 10:00:00', 12, 4),
('Sprint 2', 100, 20.00, '2026-04-01', '2026-02-01 10:00:00', 12, 4),
('Sprint 3', 100, 20.00, '2026-05-01', '2026-02-01 10:00:00', 12, 4),
('Final Exam', 100, 40.00, '2026-06-19', '2026-02-01 10:00:00', 12, 4);

-- ============================================
-- FUTURE ASSESSMENTS - Module 6: Calculus I (MAT101)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 25.00, '2026-02-28', '2026-02-01 10:00:00', 13, 6),
('Test 2', 100, 25.00, '2026-03-28', '2026-02-01 10:00:00', 13, 6),
('Final Exam', 100, 50.00, '2026-06-12', '2026-02-01 10:00:00', 13, 6);

-- ============================================
-- FUTURE ASSESSMENTS - Module 7: Linear Algebra (MAT102)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 20.00, '2026-02-24', '2026-02-01 10:00:00', 14, 7),
('Test 1', 100, 30.00, '2026-03-25', '2026-02-01 10:00:00', 14, 7),
('Final Exam', 100, 50.00, '2026-06-13', '2026-02-01 10:00:00', 14, 7);

-- ============================================
-- FUTURE ASSESSMENTS - Module 8: Statistics (MAT201)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 15.00, '2026-02-26', '2026-02-01 10:00:00', 13, 8),
('Test 1', 100, 20.00, '2026-03-22', '2026-02-01 10:00:00', 13, 8),
('Assignment 2', 100, 15.00, '2026-04-20', '2026-02-01 10:00:00', 13, 8),
('Final Exam', 100, 50.00, '2026-06-20', '2026-02-01 10:00:00', 13, 8);

-- ============================================
-- FUTURE ASSESSMENTS - Module 9: Abstract Algebra (MAT301)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 25.00, '2026-03-05', '2026-02-01 10:00:00', 14, 9),
('Test 2', 100, 25.00, '2026-04-05', '2026-02-01 10:00:00', 14, 9),
('Final Exam', 100, 50.00, '2026-06-21', '2026-02-01 10:00:00', 14, 9);

-- ============================================
-- FUTURE ASSESSMENTS - Module 10: Financial Accounting I (ACC101)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 20.00, '2026-02-27', '2026-02-01 10:00:00', 15, 10),
('Assignment', 100, 15.00, '2026-03-24', '2026-02-01 10:00:00', 15, 10),
('Test 2', 100, 20.00, '2026-04-22', '2026-02-01 10:00:00', 15, 10),
('Final Exam', 100, 45.00, '2026-06-22', '2026-02-01 10:00:00', 15, 10);

-- ============================================
-- FUTURE ASSESSMENTS - Module 11: Management Accounting (ACC201)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Case Study 1', 100, 25.00, '2026-03-08', '2026-02-01 10:00:00', 15, 11),
('Test 1', 100, 25.00, '2026-04-08', '2026-02-01 10:00:00', 15, 11),
('Final Exam', 100, 50.00, '2026-06-23', '2026-02-01 10:00:00', 15, 11);

-- ============================================
-- FUTURE ASSESSMENTS - Module 12: Taxation (ACC202)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Assignment 1', 100, 20.00, '2026-03-02', '2026-02-01 10:00:00', 16, 12),
('Test 1', 100, 30.00, '2026-04-02', '2026-02-01 10:00:00', 16, 12),
('Final Exam', 100, 50.00, '2026-06-24', '2026-02-01 10:00:00', 16, 12);

-- ============================================
-- FUTURE ASSESSMENTS - Module 13: Auditing (ACC301)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Case Study', 100, 30.00, '2026-03-12', '2026-02-01 10:00:00', 16, 13),
('Test 1', 100, 20.00, '2026-04-12', '2026-02-01 10:00:00', 16, 13),
('Final Exam', 100, 50.00, '2026-06-25', '2026-02-01 10:00:00', 16, 13);

-- ============================================
-- FUTURE ASSESSMENTS - Module 14: Anatomy and Physiology (NUR101)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 20.00, '2026-02-23', '2026-02-01 10:00:00', 17, 14),
('Practical Assessment', 100, 30.00, '2026-03-21', '2026-02-01 10:00:00', 17, 14),
('Final Exam', 100, 50.00, '2026-06-11', '2026-02-01 10:00:00', 17, 14);

-- ============================================
-- FUTURE ASSESSMENTS - Module 15: Fundamentals of Nursing (NUR102)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Skills Assessment', 100, 25.00, '2026-03-04', '2026-02-01 10:00:00', 17, 15),
('Test 1', 100, 25.00, '2026-04-03', '2026-02-01 10:00:00', 17, 15),
('Final Exam', 100, 50.00, '2026-06-26', '2026-02-01 10:00:00', 17, 15);

-- ============================================
-- FUTURE ASSESSMENTS - Module 16: Pharmacology (NUR201)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Test 1', 100, 25.00, '2026-03-03', '2026-02-01 10:00:00', 18, 16),
('Test 2', 100, 25.00, '2026-04-04', '2026-02-01 10:00:00', 18, 16),
('Final Exam', 100, 50.00, '2026-06-27', '2026-02-01 10:00:00', 18, 16);

-- ============================================
-- FUTURE ASSESSMENTS - Module 17: Clinical Practice (NUR301)
-- ============================================
INSERT INTO Assessment (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId) VALUES
('Clinical Portfolio', 100, 40.00, '2026-05-08', '2026-02-01 10:00:00', 18, 17),
('OSCE Exam', 100, 30.00, '2026-05-20', '2026-02-01 10:00:00', 18, 17),
('Final Exam', 100, 30.00, '2026-06-28', '2026-02-01 10:00:00', 18, 17);

-- ============================================
-- SAMPLE MARK ENTRIES FOR SOME COMPLETED ASSESSMENTS
-- (To show some students have already submitted early assessments)
-- ============================================

-- Student 22 (Zanele) - Module 1 - Assignment 1 completed
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(68.00, TRUE, '2026-02-20 15:30:00', 22, 59);

-- Student 20 (Lerato) - Module 2 - Practical 1 completed
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(75.00, TRUE, '2026-02-25 14:00:00', 20, 64);

-- Student 21 (Thabo) - Module 2 & 3 - Early submissions
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(82.00, TRUE, '2026-02-24 12:00:00', 21, 64),
(78.00, TRUE, '2026-02-22 13:00:00', 21, 68);

-- Student 24 (Precious) - Module 8 - Assignment 1 completed
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(90.00, TRUE, '2026-02-26 11:00:00', 24, 80);

-- Student 32 (Ayanda) - Module 14 - Test 1 completed
INSERT INTO MarkEntry (mark, submission, dateSubmitted, studentId, assessmentId) VALUES
(85.00, TRUE, '2026-02-23 14:30:00', 32, 92);

-- ============================================
-- VERIFICATION QUERY
-- Test the getUpcomingAssessments function with this query
-- ============================================

-- Example: Get upcoming assessments for Zanele (studentId = 22)
/*
SELECT 
    a.assessmentId,
    a.assessmentName,
    a.totalMark,
    a.weighting,
    a.dueDate,
    m.moduleId,
    m.moduleName,
    m.moduleCode,
    me.mark AS studentMark,
    me.submission,
    me.dateSubmitted,
    DATEDIFF(a.dueDate, CURDATE()) AS daysUntilDue
FROM Assessment a
INNER JOIN Module m ON a.moduleId = m.moduleId
INNER JOIN StudentModule sm ON m.moduleId = sm.moduleId
LEFT JOIN MarkEntry me ON a.assessmentId = me.assessmentId 
    AND me.studentId = 22
WHERE sm.studentId = 22
    AND a.dueDate >= CURDATE()
ORDER BY a.dueDate ASC
LIMIT 3;
*/
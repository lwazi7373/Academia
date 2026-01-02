const connectDB = require("../db/connect");

const calculateRiskForStudentModule = async (
  studentId,
  moduleId,
  studentModuleId,
  period
) => {
  const { periodId, startDate, endDate } = period;

  // Attendance
  const [[attendance]] = await connectDB.execute(
    `
    SELECT 
      (COUNT(ar.attendanceRecordId) / NULLIF(COUNT(cs.sessionId), 0)) * 100 
      AS attendanceRate
    FROM ClassSession cs
    LEFT JOIN AttendanceRecord ar 
      ON ar.sessionId = cs.sessionId 
      AND ar.studentId = ?
    WHERE cs.moduleId = ?
      AND cs.createdAt BETWEEN ? AND ?
    `,
    [studentId, moduleId, startDate, endDate]
  );

  // Submission
  const [[submission]] = await connectDB.execute(
    `
    SELECT 
      (COUNT(CASE WHEN me.submission = TRUE THEN 1 END) / NULLIF(COUNT(*), 0)) * 100 
      AS submissionRate
    FROM MarkEntry me
    JOIN Assessment a ON a.assessmentId = me.assessmentId
    WHERE me.studentId = ?
      AND a.moduleId = ?
      AND a.createdAt BETWEEN ? AND ?
    `,
    [studentId, moduleId, startDate, endDate]
  );

  // Marks
  const [[marks]] = await connectDB.execute(
    `
    SELECT 
      SUM((me.mark / a.totalMark) * a.weighting) AS averageMark
    FROM MarkEntry me
    JOIN Assessment a ON a.assessmentId = me.assessmentId
    WHERE me.studentId = ?
      AND a.moduleId = ?
      AND a.createdAt BETWEEN ? AND ?
    `,
    [studentId, moduleId, startDate, endDate]
  );

  const attendanceRate = attendance.attendanceRate || 0;
  const submissionRate = submission.submissionRate || 0;
  const averageMark = marks.averageMark || 0;

  // Attendance and submission are worth 30% and mark is worth 40%
  const riskScore =
    attendanceRate * 0.3 +
    submissionRate * 0.3 +
    averageMark * 0.4;

  // Risk level mapping (need to re visit this)  
  let riskLevel = 'LOW';
  if (riskScore < 40) riskLevel = 'HIGH';
  else if (riskScore < 60) riskLevel = 'MODERATE';

  await connectDB.execute(
    `
    INSERT INTO RiskReport
      (studentModuleId, periodId, riskLevel, attendanceRate, submissionRate, averageMark, calculatedAt)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      riskLevel = VALUES(riskLevel),
      attendanceRate = VALUES(attendanceRate),
      submissionRate = VALUES(submissionRate),
      averageMark = VALUES(averageMark),
      calculatedAt = NOW()
    `,
    [studentModuleId, periodId, riskLevel, attendanceRate, submissionRate, averageMark]
  );
};


module.exports = { calculateRiskForStudentModule };
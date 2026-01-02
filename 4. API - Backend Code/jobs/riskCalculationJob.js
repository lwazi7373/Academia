const cron = require('node-cron');
const connectDB = require('../db/connect');
const CalcService = require("../services/riskCalculationService");

// Run this callback every day at 02:00 AM server time
cron.schedule('0 2 * * *', async () => {
  // Get active academic period (which semester we are calculating for)
  const [[period]] = await connectDB.execute(
    `SELECT periodId, startDate, endDate
     FROM academicPeriod
     WHERE isActive = TRUE`
  );

  if (!period) {
    console.error('No active academic period found.');
    return;
  }

  // Get all student-module pairs (we are calculating for all student - module pairs)
  const [rows] = await connectDB.execute(`
    SELECT studentModuleId, studentId, moduleId
    FROM StudentModule
  `);
   
  // Calculate risk within the period
  for (const row of rows) {
    try {
      await CalcService.calculateRiskForStudentModule(
        row.studentId,
        row.moduleId,
        row.studentModuleId,
        period
      );
    } catch (err) {
      console.error(`Risk calculation failed for studentModuleId ${row.studentModuleId}`, err);
    }
  }
});

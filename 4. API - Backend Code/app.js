const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

require('./jobs/riskCalculationJob'); // make sure the node-cron runs

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors({ origin: true }));
app.use(errorHandler);

const connectDB = require("./db/connect");

const authRoutes = require("./routes/authRoutes");
const lecturerRoutes = require("./routes/lecturerRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const assessmentRoutes = require("./routes/assessmentsRoutes");
const coordinatorRoutes = require('./routes/CoordinatorRoutes');
// Added solely for unique issue in the frontend
const moduleRoute = require("./routes/moduleRoute");

// Routes (Risky naming, but it works, and easy to follow)
// Will change, when the need arises
app.use('/api/', authRoutes);
app.use('/api/', lecturerRoutes);
app.use('/api/', attendanceRoutes);
app.use('/api/', studentRoutes);
app.use('/api/', assessmentRoutes);
app.use('/api/', coordinatorRoutes);
// Single route, to solve a particular issue
app.use('/api/', moduleRoute);

// Server Port
const PORT = process.env.PORT || 3000;

connectDB.execute("SELECT 1")
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch(err => console.log('DB connection failed. \n' + err));
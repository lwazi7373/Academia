const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors({ origin: true }));

const connectDB = require("./db/connect");
const authRoutes = require("./routes/authRoutes");
const lecturerRoutes = require("./routes/lecturerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const assessmentRoutes = require("./routes/assessmentsRoutes");

// Routes
app.use('/api/', authRoutes);
app.use('/api/', lecturerRoutes);
app.use('/api/', attendanceRoutes);
app.use('/api/', assessmentRoutes);

// Server Port
const PORT = process.env.PORT || 3000;

connectDB.execute("SELECT 1")
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch(err => console.log('DB connection failed. \n' + err));
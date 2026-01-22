import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterStep1Page";
import RegisterStudentStep2Page from "../features/auth/pages/RegisterStudentStep2Page";
import RegisterStaffStep2Page from "../features/auth/pages/RegisterStaffStep2Page";
import RegisterStaffStep3Page from "../features/auth/pages/RegisterStaffStep3Page";
import LecturerHomePage from "../features/lecturer/pages/LecturerHomePage";
import StudentHomePage from "../features/student/pages/StudentHomePage";
import SectionsPage from "../shared/pages/sectionsPage";
import AttendanceCodePage from "../features/attendance/pages/AttendanceCodePage";
import GenerateAttendanceCodePage from "../features/attendance/pages/GenerateAttendanceCodePage";
import SubmitAttendanceCodePage from "../features/attendance/pages/SubmitAttendanceCodePage";
import StudentAssessmentsListPage from "../features/student/pages/StudentAssessementListPage";
import LecturerAssessmentsListPage from "../features/lecturer/pages/LecturerAssessementListPage";
import { ModuleProvider } from "../features/module/context/ModuleContext";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register2/student" element={<RegisterStudentStep2Page />} />
      <Route path="/register2/staff" element={<RegisterStaffStep2Page />} />
      <Route path="/register3/staff" element={<RegisterStaffStep3Page />} />

      {/* Student Routes */}
      <Route path="/student/homePage" element={<StudentHomePage />} />

      {/* Lecturer Routes */}
      <Route path="/lecturer/homePage" element={<LecturerHomePage />} />

      {/* Module Routes (at this point only the sections page uses the data in context) - Wrapped with ModuleProvider */}
      {/* Module Routes - All wrapped with ModuleProvider */}
      <Route 
        path="/module/:moduleId/*" 
        element={
          <ModuleProvider>
            <Routes>
              {/* Sections Page */}
              <Route index element={<SectionsPage />} />
              
              {/* Lecturer Attendance Routes */}
              <Route 
                path="attendance/generate" 
                element={<GenerateAttendanceCodePage />} 
              />
              <Route 
                path="attendance/view" 
                element={<AttendanceCodePage/>} 
              />
              
              {/* Student Attendance Route */}
              <Route 
                path="attendance/submit" 
                element={<SubmitAttendanceCodePage />} 
              />

              {/* Assessment Routes (placeholders for now) */}
              <Route 
                path="assessments/manage" 
                element={<LecturerAssessmentsListPage/>} 
              />
              <Route 
                path="assessments/view" 
                element={<StudentAssessmentsListPage/>} 
              />
            </Routes>
          </ModuleProvider>
        } 
      />

      {/* Fallback */}
      <Route path="/dashboard" element={<div>Dashboard placeholder</div>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterStep1Page";
import RegisterStudentStep2Page from "../features/auth/pages/RegisterStudentStep2Page";
import RegisterStaffStep2Page from "../features/auth/pages/RegisterStaffStep2Page";
import RegisterStaffStep3Page from "../features/auth/pages/RegisterStaffStep3Page";
import LecturerModulesPage from "../features/lecturer/pages/LecturerModulesPage";
import StudentHomePage from "../features/student/pages/StudentHomePage";
import SectionsPage from "../shared/pages/sectionsPage";
import { ModuleProvider } from "../features/module/context/ModuleContext";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register2/student" element={<RegisterStudentStep2Page />} />
      <Route path="/register2/staff" element={<RegisterStaffStep2Page />} />
      <Route path="/register3/staff" element={<RegisterStaffStep3Page />} />

      {/* Student Routes */}
      <Route path="/student/homePage" element={<StudentHomePage />} />

      {/* Lecturer Routes */}
      <Route path="/lecturer/homePage" element={<LecturerModulesPage />} />

      {/* Module Routes (at this point only the sections page uses the data in context) - Wrapped with ModuleProvider */}
      <Route 
        path="/module/:moduleId" 
        element={
          <ModuleProvider>
            <SectionsPage />
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

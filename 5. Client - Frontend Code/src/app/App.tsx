import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterStep1Page";
import RegisterStudentStep2Page from "../features/auth/pages/RegisterStudentStep2Page";
import RegisterStaffStep2Page from "../features/auth/pages/RegisterStaffStep2Page";
import RegisterStaffStep3Page from "../features/auth/pages/RegisterStaffStep3Page";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth related routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register2/student" element={<RegisterStudentStep2Page />} />
        <Route path="/register2/staff" element={<RegisterStaffStep2Page />} />
        <Route path="/register3/staff" element={<RegisterStaffStep3Page />} />
        <Route path="/dashboard" element={<div>Dashboard placeholder</div>} />
        <Route path="/registration-complete" element={<div>Registration completed...</div>} />
      </Routes>
    </Router>
  );
}

export default App;

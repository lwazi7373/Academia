import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../features/auth/context/AuthContext";
import AppRoutes from "../routes/appRoutes";

function App() {
  return (
    <Router>
      <AuthProvider> {/* Auth re-renders when user logs in and out , hence putting on App*/}
        <AppRoutes /> {/* all routes reside in routes -> AppRoutes file */}
      </AuthProvider>
    </Router>
  );
}

export default App;
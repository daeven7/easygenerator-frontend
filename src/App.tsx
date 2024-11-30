import { Routes, Route } from "react-router-dom";
import "./global.scss";
import { CONSTANTS } from "./utils/constants.utils";
import { SignUpPage } from "./pages/SignUp";
import { SignInPage } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={CONSTANTS.SIGN_UP_PAGE} element={<SignUpPage />} />
        <Route path={CONSTANTS.SIGN_IN_PAGE} element={<SignInPage />} />
        <Route
          path={CONSTANTS.APP_PAGE}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

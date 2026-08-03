import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/LoginPage"
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPasswordPage from "./pages/Login/ForgotPaswordPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route 
            path="/"
            element={<Login />}
          />

          <Route
          path="/dashboard/checkin"
          element={<Dashboard />}
          />

          <Route 
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

      </Routes>
    </BrowserRouter>
  )
}



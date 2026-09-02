import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/LoginPage"
// import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPasswordPage from "./pages/Login/ForgotPaswordPage";
import Signup from "./pages/Login/Signup";
import VerifyEmailPage from "./pages/Login/VerifyEmailPage";
import NurseDashboard from "./pages/Dashboard/Nurse/NurseDashboard";
import DoctorDashboard from "./pages/Dashboard/Doctor/DoctorDashboard";
// import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CheckIn from "./pages/Dashboard/Nurse/CheckIn";
import DashboardLayout from "./components/Layout/DashBoardLayout";
import EmergencyRegistration from "./pages/Dashboard/Nurse/EmergencyRegistration";
import ExistingPatient from "./pages/Dashboard/Nurse/ExistingPatient";
import Triage from "./pages/Dashboard/Nurse/Triage";
import PatientQueue from "./pages/Dashboard/Nurse/PatientQueue";
import PatientDetails from "./pages/Dashboard/Nurse/PatientDetails";
import MyPatients from "./pages/Dashboard/Doctor/MyPatients";
import PatientRecords from "./pages/PatientRecords/PatientRecords";
import ClinicalDocumentation from "./pages/Dashboard/Doctor/ClinicalDocumentation";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import StaffManagement from "./pages/Dashboard/Admin/StaffManagement";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route 
            path="/"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/verify-email"
            element={<VerifyEmailPage />}
          />

          <Route 
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
          path="/dashboard/nurse"
          element={<NurseDashboard />}
          />

          <Route
          path="/dashboard/admin"
          element={
            <DashboardLayout>
             <AdminDashboard />  
            </DashboardLayout>
            }
          />
          
          <Route
          path="/dashboard/checkin"
          element={
            <DashboardLayout>
             <CheckIn />  
            </DashboardLayout>
            }
          />
          <Route
          path="/dashboard/checkin/emergency"
          element={
            <DashboardLayout>
             <EmergencyRegistration />  
            </DashboardLayout>
            }
          />
          <Route
          path="/dashboard/checkin/existing"
          element={
            <DashboardLayout>
             <ExistingPatient />  
            </DashboardLayout>
            }
          />

          <Route
          path="/dashboard/triage"
          element={
            <DashboardLayout>
             <Triage />  
            </DashboardLayout>
            }
          />

          <Route
          path="/dashboard/patient-queue"
          element={
            <DashboardLayout>
             <PatientQueue />  
            </DashboardLayout>
            }
          />
          <Route
          path="/dashboard/records/:patientId"
          element={
            <DashboardLayout>
             <PatientDetails />  
            </DashboardLayout>
            }
          />
          <Route
          path="/dashboard/doctor"
          element={
            <DashboardLayout>
             <DoctorDashboard />  
            </DashboardLayout>
            }
          />

          <Route
          path="/dashboard/doctor/patients"
          element={
            <DashboardLayout>
             < MyPatients /> 
            </DashboardLayout>
            }
          />
          <Route
          path="/dashboard/doctor/patient-records/:patientId"
          element={
            <DashboardLayout>
             < PatientRecords /> 
            </DashboardLayout>
            }
          />

          <Route
          path="/dashboard/doctor/patient-records/:patientId/documentation"
          element={
            <DashboardLayout>
             < ClinicalDocumentation /> 
            </DashboardLayout>
            }
          />

          <Route
          path="/dashboard/staffmanagement"
          element={
            <DashboardLayout>
             < StaffManagement /> 
            </DashboardLayout>
            }
          />

         


      </Routes>
    </BrowserRouter>
  )
}



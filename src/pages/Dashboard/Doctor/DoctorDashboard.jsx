

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../../services/patientStorage";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {

  const navigate = useNavigate()

  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const doctorName = user?.firstName && user?.lastName
                      ? `Dr. ${user.firstName} ${user.lastName}`
                      : "Doctor"

  useEffect(() => {
    loadPatients()

    const handleStorageChange = () => {
      loadPatients()
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])
  const loadPatients = () => {
    const storedPatients = getPatients()
    setPatients(storedPatients)
  }
  // only show patients that belong to specific doctor later connect to backend with id
  const assignedPatients = useMemo(() => {
    if (!patients.length) return []

    return patients.filter((patient) => {
      if (!patient.assignedDoctor) return false 

      return (
        patient.assignedDoctor === doctorName ||
        patient.assignedDoctor === user.staffId ||
        patient.assignedDoctor === user.workEmail
      )
    })
  }, [patients, doctorName, user.staffId, user.workEmail])

  const awaitingReview = assignedPatients.filter((patient) => patient.status ===  "assigned" || 
                            patient.status === "waiting_doctor")

  const inTreatment = assignedPatients.filter((patient) => patient.status === "treatment")

  const dischargedToday = assignedPatients.filter((patient) => {
    if (patient.status !== "completed") return false
    if (patient.dischargedAt) return false

    const today = new Date().toDateString()
    const dischargedDate = new Date(patient.dischargedAt).toDateString()
    return today === dischargedDate
  })
  const filteredPatients = assignedPatients.filter((patient) => {
    const matchesSearch = patient.fullName ?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.chiefComplaint?.toLowerCase().includes(searchTerm.toLowerCase())
  
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical" :
        return "priority critical"
      
      case "urgent" :
        return "priority urgent"

      case "stable" :
        return "priority stable"

      default :
        return "priority stable"
    }
  }
  const getStatusLabel = (status) => {
    const statuses = {
      waiting: "Waiting",
      triage: "In Triage",
      waiting_doctor: "Awaiting Review",
      assigned: "Awaiting Review",
      treatment: "In Treatment",
      completed: "Ready for Discharge"
    }

    return statuses[status] || status || "unknown"
  }
  const formatWaitTime = (patient) => {
    if (!patient.assignedAt && !patient.checkedInAt) {
      return "Recently assigned"
    }
    const startTime = new Date(
      patient.assignedAt || patient.checkedInAt
    )
    const now = new Date()

    const difference = Math.max(
      0,
      Math.floor((now - startTime) / 60000)
    )
    if (difference < 1) {
      return "Just now"
    }
    if (difference < 60) {
      return `${difference} min`
    }
    const hours = Math.floor(difference / 60)
    const minutes = difference % 60
    return `${hours}h ${minutes}m`
  }

  const handleViewPatient = (patient) => {
    navigate(`/dashboard/patients/${patient.id}`)
  }


  return (
     <div className="doctor-dashboard">
       {/* PAGE HEADER */}

       <div className="doctor-dashboard-header">
         <div>
           <h1>Doctor Dashboard</h1>
           <p>
             Welcome back, {doctorName}
           </p>
         </div>

        <button
          className="refresh-button"
           onClick={loadPatients}
         >
           ↻ Refresh
         </button>
       </div>

       {/* STATISTICS */}

       <section className="doctor-stat-grid">

         <div className="doctor-stat-card">
           <span className="stat-label">
             Assigned Patients
           </span>

           <strong className="stat-number">
             {assignedPatients.length}
           </strong>

           <span className="stat-description">
             Patients currently assigned to you
           </span>
         </div>

         <div className="doctor-stat-card">
           <span className="stat-label">
             Awaiting My Review
           </span>

           <strong className="stat-number">
             {awaitingReview.length}
           </strong>

           <span className="stat-description">
             Require your attention
           </span>
         </div>

         <div className="doctor-stat-card">
           <span className="stat-label">
             In Treatment
           </span>

           <strong className="stat-number">
             {inTreatment.length}
           </strong>

           <span className="stat-description">
             Currently under treatment
           </span>
         </div>

         <div className="doctor-stat-card">
           <span className="stat-label">
             Discharges Today
           </span>

           <strong className="stat-number">
             {dischargedToday.length}
           </strong>

           <span className="stat-description">
             Completed today
           </span>
         </div>

       </section>

       {/* PATIENTS SECTION */}

       <section className="assigned-patients-section">

         <div className="section-heading">

           <div>
             <h2>My Assigned Patients</h2>

             <p>
               Patients currently assigned to your care
             </p>
           </div>

           <button
             className="view-all-button"
             onClick={() => navigate("/dashboard/patients")}
           >
             View All
           </button>

         </div>

         {/* SEARCH / FILTER */}

         <div className="patient-controls">

           <div className="patient-search">

             <span>⌕</span>

             <input
               type="text"
               placeholder="Search patient, ID or complaint..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />

           </div>

           <select
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
           >
             <option value="all">
               All Statuses
             </option>

             <option value="assigned">
               Awaiting Review
             </option>

             <option value="waiting_doctor">
               Awaiting Review
             </option>

             <option value="treatment">
               In Treatment
             </option>

             <option value="completed">
               Ready for Discharge
             </option>
           </select>

         </div>

         {/* TABLE */}

         <div className="patient-table-container">

           <table className="patient-table">

             <thead>
               <tr>
                 <th>Patient</th>
                 <th>Complaint</th>
                 <th>Priority</th>
                 <th>Wait</th>
                 <th>Status</th>
                 <th></th>
               </tr>
             </thead>

             <tbody>

               {filteredPatients.length === 0 ? (

                 <tr>
                   <td
                     colSpan="6"
                     className="empty-patients"
                   >
                     <div>
                       <strong>
                         No patients found
                       </strong>

                       <p>
                         No patients match your current filters.
                       </p>
                     </div>
                   </td>
                 </tr>

               ) : (

                 filteredPatients.map((patient) => (

                   <tr key={patient.id}>

                     <td>

                       <div className="patient-name">
                         {patient.fullName}
                       </div>

                       <div className="patient-id">
                         ID: {patient.id}
                       </div>

                     </td>

                     <td>
                       <span className="complaint">
                         {patient.chiefComplaint ||
                           patient.reasonForVisit ||
                           "Not recorded"}
                       </span>
                     </td>

                     <td>

                       <span
                         className={getPriorityClass(
                           patient.priority
                         )}
                       >
                         {patient.priority || "Stable"}
                       </span>

                     </td>

                     <td>
                       <span className="wait-time">
                         {formatWaitTime(patient)}
                       </span>
                     </td>

                     <td>

                       <span className="patient-status">
                         {getStatusLabel(patient.status)}
                       </span>

                     </td>

                     <td>

                       <button
                         className="view-patient-button"
                         onClick={() =>
                           handleViewPatient(patient)
                         }
                       >
                         View →
                       </button>

                     </td>

                   </tr>

                 ))

               )}

             </tbody>

           </table>

         </div>

       </section>

     </div>
   );
 }
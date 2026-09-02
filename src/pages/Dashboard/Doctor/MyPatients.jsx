
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patients } from "../../../data/patients.js";
import "./MyPatients.css";



const tabs = [
  "New Assignments",
  "Active Patients",
  "Observation",
  "Completed",
];

export default function MyPatients() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("New Assignments");

  const filteredPatients = patients.filter(
    (patient) => patient.category === activeTab
  );

  const handleViewPatient = (patient) => {
    navigate(`/dashboard/doctor/patient-records/${patient.id}`);
  };

  return (
    <main className="my-patients">

      {/* Page tabs */}
      <div className="patient-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`patient-tab ${
              activeTab === tab ? "patient-tab-active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Patient table */}
      <div className="patients-table-wrapper">
        <table className="patients-table">

          <thead>
            <tr>
              <th>Patient</th>
              <th>Complaint</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>

                  <td>
                    <div className="patient-name">
                      <strong>{patient.name}</strong>
                      <span>ID: {patient.id}</span>
                    </div>
                  </td>

                  <td>
                    <span className="patient-complaint">
                      {patient.complaint}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority-badge priority-${patient.priority.toLowerCase()}`}
                    >
                      {patient.priority}
                    </span>
                  </td>

                  <td>
                    <span className="assigned-time">
                      {patient.assigned}
                    </span>
                  </td>

                  <td>
                    <span className="patient-status">
                      {patient.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="view-patient-btn"
                      onClick={() => handleViewPatient(patient)}
                    >
                      View <span>→</span>
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="empty-patients">
                    No patients in this category.
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </main>
  );
}
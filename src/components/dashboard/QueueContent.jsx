// import { nurseQueuePatients } from "../../data/dashboardData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatients } from "../../services/patientStorage.js";
import "./QueueContent.css"

export default function QueueContent() {

    const [patient, setPatient] = useState([])

    useEffect(() => {
        setPatient(getPatients())
    },[])

    const navigate = useNavigate()
    return (
        <section className="queue-section">
            <h2 className="queue-title">
                Patient Queue
            </h2>

            <div className="queue-table">
                <div className="queue-header">
                    <span>Patient</span>
                    <span>Complaint</span>
                    <span>Priority</span>
                    <span>Wait</span>
                    <span>Status</span>
                    <span></span>
                </div>

                {patient.map((patient) => (
                    <div className="queue-row"key={patient.id}>
                        <div className="patient-info">
                            <strong>{patient.name}</strong>
                            <small>ID: {patient.id}</small>
                        </div>

                        <div className="complaint">
                            {patient.complaint}
                        </div>

                        <div>
                            <span className={`priority ${patient.priority}`}>
                                {patient.priority}
                            </span>
                        </div>

                        <div className="wait-time">
                            {patient.waitTime}
                        </div>

                        <div className="patient-status">
                            {patient.status}
                        </div>

                        <button className="view-button"
                         onClick={() => navigate(`/dashboard/${patient.id}`)}
                         type="button">
                             View →
                        </button>

                    </div>
                ))}

            </div>
        </section>
        
    )
}
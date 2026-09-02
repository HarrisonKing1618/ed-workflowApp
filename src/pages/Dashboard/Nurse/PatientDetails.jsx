import { useParams, useNavigate } from "react-router-dom";
import "./PatientDetails.css";
import { mockPatients } from "./PatientQueue";

export default function PatientDetails() {

    const { patientId } = useParams();
    const patient = mockPatients.filter(patient => patient.id === patientId)
    console.log(patient[0])

    const navigate = useNavigate();

    return (
        <section className="patient-details-page">

            <div className="patient-details-header">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Queue
                </button>

                <h1>
                    Patient Details
                </h1>

            </div>


            <div className="patient-details-content">

                <div className="patient-details-card">

                    <div className="patient-details-title">

                        <div>
                            <h2>
                                Patient Record
                            </h2>

                            <strong>
                                {patient.name}
                            </strong>

                            <p>
                                Patient ID: {patientId}
                            </p>
                        </div>

                    </div>


                    <div className="patient-details-body">

                        <div className="detail-item">
                            <span>Patient ID</span>
                            <strong>{patientId}</strong>
                        </div>

                        <div className="detail-item">
                            <span>Status</span>
                            <strong>
                                Waiting for Triage
                            </strong>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}
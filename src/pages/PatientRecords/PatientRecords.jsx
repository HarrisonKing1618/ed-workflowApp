import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import PatientSummary from "../../components/PatientRecords/PatientSummary";
import RecordTabs from "../../components/PatientRecords/RecordTabs";
import DoctorNotes from "../../components/PatientRecords/DoctorNotes";
import MedicalHistory from "../../components/PatientRecords/MedicalHistory";
import PatientProfile from "../../components/PatientRecords/PatientProfile";
import VitalSigns from "../../components/PatientRecords/VitalSigns";
import TriageAssessment from "../../components/PatientRecords/TriageAssessment";
import TreatmentHistory from "../../components/PatientRecords/TreatmentHistory";
import { patients } from "../../data/patients";
import "./PatientRecords.css";

export default function PatientRecords() {
    const [activeTab, setActiveTab] = useState("profile");
    const { patientId } = useParams()
    const navigate = useNavigate()

    // Temporary data.
    // This will eventually come from  backend.
    const patient = patients.find(
        (patient) => patient.id === patientId
    )
    if (!patient) {
        return (
            <main className="patient-records">
                <div className="patient-not-found">
                <h2>Patient not found</h2>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard/doctor/my-patients")}
                >
                    Back to My Patients
                </button>
                </div>
      </main>
        )
    } 

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return <PatientProfile patient={patient} />;

            case "medical-history":
                return <MedicalHistory patientId={patient.id} />;

            case "vitals":
                return <VitalSigns patientId={patient.id} />;

            case "triage":
                return <TriageAssessment patientId={patient.id} />;

            case "doctor-notes":
                return <DoctorNotes patientId={patient.id} />;

            case "treatment":
                return <TreatmentHistory patientId={patient.id} />;

            default:
                return <DoctorNotes patientId={patient.id} />;
        }
    };

    return (
        <main className="patient-records">

            <div className="patient-records__title">
    <div>
        <h1>Patient Records</h1>
        <p>
            {patient.firstName} {patient.lastName} · {patient.id}
        </p>
    </div>

    <button
        type="button"
        className="clinical-documentation-btn"
        onClick={() =>
            navigate(
                `/dashboard/doctor/patient-records/${patient.id}/documentation`
            )
        }
    >
        Clinical Documentation
        <span>→</span>
    </button>
</div>

            <PatientSummary patient={patient} />

            <RecordTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <section className="patient-records__content">
                {renderTabContent()}
            </section>

        </main>
    );
}
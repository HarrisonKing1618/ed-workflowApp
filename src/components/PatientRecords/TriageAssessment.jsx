import "./TriageAssessment.css"
export default function TriageAssessment({ patientId }) {
    // Temporary mock data.
    // This will eventually come from  backend using patientId.
    const triage = {
        triageLevel: "Critical",
        chiefComplaint: "Chest pain",
        onset: "Approximately 2 hours ago",
        painScore: 7,
        painLocation: "Central chest",
        painDescription: "Pressure-like pain radiating to the left arm",

        arrivalMode: "Walk-in",
        arrivalTime: "Today, 9:58 AM",

        consciousness: "Alert and oriented",
        mobility: "Independent",

        bloodPressure: "142/92",
        heartRate: "108",
        respiratoryRate: "22",
        temperature: "37.1",
        oxygenSaturation: "94%",

        allergies: "No known drug allergies",

        triageNotes:
            "Patient presented with sudden onset chest pain radiating to the left arm. Patient appears anxious and diaphoretic. Vital signs recorded and ECG requested.",

        assessedBy: "Nurse Grace Okafor",
        assessedAt: "Today, 10:05 AM"
    };

    return (
        <div className="triage-assessment">

            {/* =====================================
                TRIAGE SUMMARY
            ===================================== */}

            <section className="triage-card">

                <div className="triage-card__header">
                    <div>
                        <h3>Triage Assessment</h3>
                        <p>
                            Initial assessment recorded during patient
                            arrival
                        </p>
                    </div>

                    <span className="triage-priority">
                        {triage.triageLevel}
                    </span>
                </div>

                <div className="triage-summary">

                    <div className="triage-summary__item">
                        <span>Chief Complaint</span>
                        <strong>{triage.chiefComplaint}</strong>
                    </div>

                    <div className="triage-summary__item">
                        <span>Arrival Mode</span>
                        <strong>{triage.arrivalMode}</strong>
                    </div>

                    <div className="triage-summary__item">
                        <span>Arrival Time</span>
                        <strong>{triage.arrivalTime}</strong>
                    </div>

                    <div className="triage-summary__item">
                        <span>Pain Score</span>
                        <strong>
                            {triage.painScore}/10
                        </strong>
                    </div>

                </div>

            </section>


            {/* =====================================
                PRESENTING COMPLAINT
            ===================================== */}

            <section className="triage-card">

                <div className="triage-card__header">
                    <div>
                        <h3>Presenting Complaint</h3>
                    </div>
                </div>

                <div className="triage-details">

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Chief Complaint
                        </span>

                        <span className="triage-detail__value">
                            {triage.chiefComplaint}
                        </span>
                    </div>

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Onset
                        </span>

                        <span className="triage-detail__value">
                            {triage.onset}
                        </span>
                    </div>

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Location
                        </span>

                        <span className="triage-detail__value">
                            {triage.painLocation}
                        </span>
                    </div>

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Pain Score
                        </span>

                        <span className="triage-detail__value">
                            {triage.painScore}/10
                        </span>
                    </div>

                    <div className="triage-detail triage-detail--full">
                        <span className="triage-detail__label">
                            Description
                        </span>

                        <span className="triage-detail__value">
                            {triage.painDescription}
                        </span>
                    </div>

                </div>

            </section>


            {/* =====================================
                VITAL SIGNS
            ===================================== */}

            <section className="triage-card">

                <div className="triage-card__header">
                    <div>
                        <h3>Vital Signs at Triage</h3>
                        <p>
                            Measurements recorded during initial
                            assessment
                        </p>
                    </div>
                </div>

                <div className="triage-vitals">

                    <div className="triage-vital">
                        <span>Blood Pressure</span>

                        <strong>
                            {triage.bloodPressure}
                        </strong>

                        <small>mmHg</small>
                    </div>

                    <div className="triage-vital">
                        <span>Heart Rate</span>

                        <strong>
                            {triage.heartRate}
                        </strong>

                        <small>bpm</small>
                    </div>

                    <div className="triage-vital">
                        <span>Respiratory Rate</span>

                        <strong>
                            {triage.respiratoryRate}
                        </strong>

                        <small>/min</small>
                    </div>

                    <div className="triage-vital">
                        <span>Temperature</span>

                        <strong>
                            {triage.temperature}
                        </strong>

                        <small>°C</small>
                    </div>

                    <div className="triage-vital">
                        <span>Oxygen Saturation</span>

                        <strong>
                            {triage.oxygenSaturation}
                        </strong>

                        <small>%</small>
                    </div>

                    <div className="triage-vital">
                        <span>Pain Score</span>

                        <strong>
                            {triage.painScore}
                        </strong>

                        <small>/10</small>
                    </div>

                </div>

            </section>


            {/* =====================================
                PATIENT CONDITION
            ===================================== */}

            <section className="triage-card">

                <div className="triage-card__header">
                    <div>
                        <h3>Patient Condition</h3>
                    </div>
                </div>

                <div className="triage-details">

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Consciousness
                        </span>

                        <span className="triage-detail__value">
                            {triage.consciousness}
                        </span>
                    </div>

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Mobility
                        </span>

                        <span className="triage-detail__value">
                            {triage.mobility}
                        </span>
                    </div>

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Allergies
                        </span>

                        <span className="triage-detail__value">
                            {triage.allergies}
                        </span>
                    </div>

                </div>

            </section>


            {/* =====================================
                TRIAGE NOTES
            ===================================== */}

            <section className="triage-card">

                <div className="triage-card__header">
                    <div>
                        <h3>Triage Notes</h3>
                    </div>
                </div>

                <div className="triage-notes">
                    <p>
                        {triage.triageNotes}
                    </p>
                </div>

            </section>


            {/* =====================================
                ASSESSMENT INFORMATION
            ===================================== */}

            <section className="triage-card">

                <div className="triage-card__header">
                    <div>
                        <h3>Assessment Information</h3>
                    </div>
                </div>

                <div className="triage-details">

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Assessed By
                        </span>

                        <span className="triage-detail__value">
                            {triage.assessedBy}
                        </span>
                    </div>

                    <div className="triage-detail">
                        <span className="triage-detail__label">
                            Assessment Time
                        </span>

                        <span className="triage-detail__value">
                            {triage.assessedAt}
                        </span>
                    </div>

                </div>

            </section>

        </div>
    );
}
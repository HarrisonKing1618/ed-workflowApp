import "./MedicalHistory.css"
export default function MedicalHistory({ patientId }) {
    // Temporary mock data.
    // This will later come from your backend using patientId.
    const medicalHistory = {
        allergies: [
            "No known drug allergies"
        ],

        chronicConditions: [
            {
                condition: "Hypertension",
                diagnosedDate: "2019",
                status: "Active"
            },
            {
                condition: "Type 2 Diabetes",
                diagnosedDate: "2021",
                status: "Active"
            }
        ],

        previousIllnesses: [
            {
                condition: "Pneumonia",
                year: "2022",
                notes: "Treated and resolved"
            }
        ],

        surgeries: [
            {
                procedure: "Appendectomy",
                year: "2015",
                hospital: "Previous Hospital"
            }
        ],

        familyHistory: [
            {
                condition: "Hypertension",
                relationship: "Father"
            },
            {
                condition: "Diabetes",
                relationship: "Mother"
            }
        ],

        medications: [
            {
                medication: "Amlodipine",
                dosage: "10 mg",
                frequency: "Once daily"
            },
            {
                medication: "Metformin",
                dosage: "500 mg",
                frequency: "Twice daily"
            }
        ]
    };

    return (
        <div className="medical-history">

            {/* Allergies */}
            <section className="medical-history__section">
                <div className="medical-history__section-header">
                    <h3>Allergies</h3>
                </div>

                {medicalHistory.allergies.length > 0 ? (
                    <div className="medical-history__items">
                        {medicalHistory.allergies.map((allergy, index) => (
                            <div
                                className="medical-history__item"
                                key={index}
                            >
                                <span className="medical-history__bullet">
                                    •
                                </span>

                                <span>{allergy}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="medical-history__empty">
                        No allergies recorded.
                    </p>
                )}
            </section>


            {/* Chronic Conditions */}
            <section className="medical-history__section">
                <div className="medical-history__section-header">
                    <h3>Chronic Conditions</h3>
                </div>

                {medicalHistory.chronicConditions.length > 0 ? (
                    <div className="medical-history__table">

                        <div className="medical-history__table-header">
                            <span>Condition</span>
                            <span>Diagnosed</span>
                            <span>Status</span>
                        </div>

                        {medicalHistory.chronicConditions.map(
                            (condition, index) => (
                                <div
                                    className="medical-history__table-row"
                                    key={index}
                                >
                                    <span>{condition.condition}</span>
                                    <span>{condition.diagnosedDate}</span>

                                    <span>
                                        <span className="condition-status">
                                            {condition.status}
                                        </span>
                                    </span>
                                </div>
                            )
                        )}

                    </div>
                ) : (
                    <p className="medical-history__empty">
                        No chronic conditions recorded.
                    </p>
                )}
            </section>


            {/* Previous Illnesses */}
            <section className="medical-history__section">
                <div className="medical-history__section-header">
                    <h3>Previous Illnesses</h3>
                </div>

                {medicalHistory.previousIllnesses.length > 0 ? (
                    <div className="medical-history__table">

                        <div className="medical-history__table-header">
                            <span>Condition</span>
                            <span>Year</span>
                            <span>Notes</span>
                        </div>

                        {medicalHistory.previousIllnesses.map(
                            (illness, index) => (
                                <div
                                    className="medical-history__table-row"
                                    key={index}
                                >
                                    <span>{illness.condition}</span>
                                    <span>{illness.year}</span>
                                    <span>{illness.notes}</span>
                                </div>
                            )
                        )}

                    </div>
                ) : (
                    <p className="medical-history__empty">
                        No previous illnesses recorded.
                    </p>
                )}
            </section>


            {/* Surgical History */}
            <section className="medical-history__section">
                <div className="medical-history__section-header">
                    <h3>Surgical History</h3>
                </div>

                {medicalHistory.surgeries.length > 0 ? (
                    <div className="medical-history__table">

                        <div className="medical-history__table-header">
                            <span>Procedure</span>
                            <span>Year</span>
                            <span>Hospital</span>
                        </div>

                        {medicalHistory.surgeries.map(
                            (surgery, index) => (
                                <div
                                    className="medical-history__table-row"
                                    key={index}
                                >
                                    <span>{surgery.procedure}</span>
                                    <span>{surgery.year}</span>
                                    <span>{surgery.hospital}</span>
                                </div>
                            )
                        )}

                    </div>
                ) : (
                    <p className="medical-history__empty">
                        No surgical history recorded.
                    </p>
                )}
            </section>


            {/* Current Medications */}
            <section className="medical-history__section">
                <div className="medical-history__section-header">
                    <h3>Current Medications</h3>
                </div>

                {medicalHistory.medications.length > 0 ? (
                    <div className="medical-history__table">

                        <div className="medical-history__table-header">
                            <span>Medication</span>
                            <span>Dosage</span>
                            <span>Frequency</span>
                        </div>

                        {medicalHistory.medications.map(
                            (medication, index) => (
                                <div
                                    className="medical-history__table-row"
                                    key={index}
                                >
                                    <span>{medication.medication}</span>
                                    <span>{medication.dosage}</span>
                                    <span>{medication.frequency}</span>
                                </div>
                            )
                        )}

                    </div>
                ) : (
                    <p className="medical-history__empty">
                        No current medications recorded.
                    </p>
                )}
            </section>


            {/* Family History */}
            <section className="medical-history__section">
                <div className="medical-history__section-header">
                    <h3>Family History</h3>
                </div>

                {medicalHistory.familyHistory.length > 0 ? (
                    <div className="medical-history__table">

                        <div className="medical-history__table-header">
                            <span>Condition</span>
                            <span>Relationship</span>
                        </div>

                        {medicalHistory.familyHistory.map(
                            (history, index) => (
                                <div
                                    className="medical-history__table-row"
                                    key={index}
                                >
                                    <span>{history.condition}</span>
                                    <span>{history.relationship}</span>
                                </div>
                            )
                        )}

                    </div>
                ) : (
                    <p className="medical-history__empty">
                        No family history recorded.
                    </p>
                )}
            </section>

        </div>
    );
}
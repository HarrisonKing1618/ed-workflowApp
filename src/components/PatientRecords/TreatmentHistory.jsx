import "./TreatmentHistory.css"
export default function TreatmentHistory({ patientId }) {
    // Temporary mock data.
    // This will eventually come from your backend using patientId.

    const treatments = [
        {
            id: 1,
            time: "10:42 AM",
            type: "Medication",
            treatment: "Aspirin",
            details: "325 mg",
            status: "Administered",
            recordedBy: "Dr. Amara Osei"
        },
        {
            id: 2,
            time: "10:40 AM",
            type: "Medication",
            treatment: "Nitroglycerin",
            details: "Sublingual",
            status: "Administered",
            recordedBy: "Nurse Grace Okafor"
        },
        {
            id: 3,
            time: "10:25 AM",
            type: "Investigation",
            treatment: "12-lead ECG",
            details: "STAT",
            status: "Completed",
            recordedBy: "Nurse Grace Okafor"
        },
        {
            id: 4,
            time: "10:18 AM",
            type: "Investigation",
            treatment: "Troponin",
            details: "Blood test",
            status: "Pending",
            recordedBy: "Dr. Amara Osei"
        },
        {
            id: 5,
            time: "10:18 AM",
            type: "Investigation",
            treatment: "Complete Blood Count",
            details: "Blood test",
            status: "Pending",
            recordedBy: "Dr. Amara Osei"
        },
        {
            id: 6,
            time: "10:15 AM",
            type: "Investigation",
            treatment: "Chest X-Ray",
            details: "Portable",
            status: "Ordered",
            recordedBy: "Dr. Amara Osei"
        }
    ];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "administered":
                return "treatment-status treatment-status--success";

            case "completed":
                return "treatment-status treatment-status--success";

            case "pending":
                return "treatment-status treatment-status--pending";

            case "ordered":
                return "treatment-status treatment-status--ordered";

            case "cancelled":
                return "treatment-status treatment-status--cancelled";

            default:
                return "treatment-status";
        }
    };

    return (
        <div className="treatment-history">

            {/* =====================================
                SUMMARY
            ===================================== */}

            <section className="treatment-card">

                <div className="treatment-card__header">
                    <div>
                        <h3>Treatment History</h3>

                        <p>
                            Treatments and clinical interventions
                            recorded during this visit
                        </p>
                    </div>

                    <span className="treatment-count">
                        {treatments.length} Records
                    </span>
                </div>


                <div className="treatment-summary">

                    <div className="treatment-summary__item">
                        <span>Medications</span>

                        <strong>
                            {
                                treatments.filter(
                                    item => item.type === "Medication"
                                ).length
                            }
                        </strong>
                    </div>

                    <div className="treatment-summary__item">
                        <span>Investigations</span>

                        <strong>
                            {
                                treatments.filter(
                                    item => item.type === "Investigation"
                                ).length
                            }
                        </strong>
                    </div>

                    <div className="treatment-summary__item">
                        <span>Completed</span>

                        <strong>
                            {
                                treatments.filter(
                                    item =>
                                        item.status === "Completed" ||
                                        item.status === "Administered"
                                ).length
                            }
                        </strong>
                    </div>

                    <div className="treatment-summary__item">
                        <span>Pending</span>

                        <strong>
                            {
                                treatments.filter(
                                    item =>
                                        item.status === "Pending" ||
                                        item.status === "Ordered"
                                ).length
                            }
                        </strong>
                    </div>

                </div>

            </section>


            {/* =====================================
                TREATMENT TABLE
            ===================================== */}

            <section className="treatment-card">

                <div className="treatment-card__header">

                    <div>
                        <h3>Clinical Treatment Timeline</h3>

                        <p>
                            Most recent activity appears first
                        </p>
                    </div>

                </div>


                <div className="treatment-table">

                    {/* Table Header */}

                    <div className="treatment-table__header">

                        <span>Time</span>

                        <span>Type</span>

                        <span>Treatment</span>

                        <span>Details</span>

                        <span>Status</span>

                        <span>Recorded By</span>

                    </div>


                    {/* Table Rows */}

                    {treatments.map((item) => (

                        <div
                            className="treatment-table__row"
                            key={item.id}
                        >

                            <span className="treatment-time">
                                {item.time}
                            </span>


                            <span>
                                <span
                                    className={
                                        item.type === "Medication"
                                            ? "treatment-type treatment-type--medication"
                                            : "treatment-type treatment-type--investigation"
                                    }
                                >
                                    {item.type}
                                </span>
                            </span>


                            <span className="treatment-name">
                                {item.treatment}
                            </span>


                            <span>
                                {item.details}
                            </span>


                            <span>
                                <span
                                    className={getStatusClass(
                                        item.status
                                    )}
                                >
                                    {item.status}
                                </span>
                            </span>


                            <span>
                                {item.recordedBy}
                            </span>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================
                EMPTY STATE
            ===================================== */}

            {treatments.length === 0 && (

                <section className="treatment-empty">

                    <div className="treatment-empty__icon">
                        +
                    </div>

                    <h3>No Treatment History</h3>

                    <p>
                        No treatments or clinical interventions
                        have been recorded for this patient.
                    </p>

                </section>

            )}

        </div>
    );
}
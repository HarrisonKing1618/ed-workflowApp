import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientQueue.css";

export const mockPatients = [
    {
        id: "PT-48213",
        name: "Marcus Reid",
        complaint: "Chest pain",
        arrivalMode: "Ambulance",
        waitingTime: 24,
        status: "waiting for triage",
    },
    {
        id: "PT-51902",
        name: "Elena Vasquez",
        complaint: "Abdominal pain",
        arrivalMode: "Walk-in",
        waitingTime: 19,
        status: "waiting for triage",
    },
    {
        id: "PT-44810",
        name: "Tom Whitfield",
        complaint: "Head injury",
        arrivalMode: "Police",
        waitingTime: 17,
        status: "waiting for triage",
    },

    {
        id: "PT-53122",
        name: "Priya Nair",
        complaint: "Fever and weakness",
        arrivalMode: "Walk-in",
        waitingTime: 31,
        status: "waiting for doctor",
    },
    {
        id: "PT-49381",
        name: "Noah Kessler",
        complaint: "Shortness of breath",
        arrivalMode: "Ambulance",
        waitingTime: 26,
        status: "waiting for doctor",
    },

    {
        id: "PT-47291",
        name: "Daniel Brooks",
        complaint: "Severe back pain",
        arrivalMode: "Walk-in",
        waitingTime: 14,
        status: "assigned",
    },
    {
        id: "PT-50872",
        name: "Sarah Mitchell",
        complaint: "Migraine",
        arrivalMode: "Walk-in",
        waitingTime: 10,
        status: "assigned",
    },

    {
        id: "PT-46018",
        name: "James Carter",
        complaint: "Fractured arm",
        arrivalMode: "Ambulance",
        waitingTime: 42,
        status: "in treatment",
    },
    {
        id: "PT-51734",
        name: "Aisha Bello",
        complaint: "Laceration",
        arrivalMode: "Walk-in",
        waitingTime: 38,
        status: "in treatment",
    },

    {
        id: "PT-49561",
        name: "Michael Evans",
        complaint: "Dehydration",
        arrivalMode: "Walk-in",
        waitingTime: 65,
        status: "discharge",
    },
    {
        id: "PT-50247",
        name: "Grace Thompson",
        complaint: "Minor allergic reaction",
        arrivalMode: "Walk-in",
        waitingTime: 72,
        status: "discharge",
    },
];

const queueTabs = [
    {
        key: "waiting for triage",
        label: "Waiting for Triage",
    },
    {
        key: "waiting for doctor",
        label: "Waiting for Doctor",
    },
    {
        key: "assigned",
        label: "Assigned",
    },
    {
        key: "in treatment",
        label: "In Treatment",
    },
    {
        key: "discharge",
        label: "Discharge Queue",
    },
];

export default function PatientQueue() {
    const navigate = useNavigate()
    const [activeQueue, setActiveQueue] = useState("waiting for triage");


    // Get patients belonging to the selected queue
    const filteredPatients = mockPatients.filter(
        (patient) => patient.status === activeQueue
    );


    // Get the display name of the current queue
    const activeQueueLabel =
        queueTabs.find(
            (tab) => tab.key === activeQueue
        )?.label;


    return (
        <section className="patient-queue-page">

            {/* PAGE HEADER */}

            <div className="patient-queue-header">

                <div>
                    <h1>Patient Queue</h1>

                    <p>
                        Monitor and manage patients throughout
                        the emergency department workflow.
                    </p>
                </div>

            </div>


            <div className="patient-queue-content">

                {/* QUEUE BUTTONS */}

                <div className="queue-tabs">

                    {queueTabs.map((tab) => (

                        <button
                            key={tab.key}
                            type="button"
                            className={`queue-tab ${
                                activeQueue === tab.key
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveQueue(tab.key)
                            }
                        >
                            {tab.label}
                        </button>

                    ))}

                </div>


                {/* TABLE CARD */}

                <div className="queue-card">

                    {/* TABLE HEADER */}

                    <div className="queue-card-header">

                        <div>
                            <h2>
                                {activeQueueLabel}
                            </h2>

                            <span>
                                {filteredPatients.length} patient
                                {filteredPatients.length !== 1
                                    ? "s"
                                    : ""}
                            </span>
                        </div>

                    </div>


                    {/* TABLE */}

                    <div className="queue-table">

                        {/* COLUMN HEADINGS */}

                        <div className="queue-table-header">

                            <span>Patient</span>

                            <span>Complaint</span>

                            <span>Arrival Mode</span>

                            <span>Waiting Time</span>

                            <span>Status</span>

                            <span></span>

                        </div>


                        {/* PATIENT ROWS */}

                        {filteredPatients.map((patient) => (

                            <div
                                className="queue-table-row"
                                key={patient.id}
                            >

                                {/* PATIENT */}

                                <div className="patient-cell">

                                    <strong>
                                        {patient.name}
                                    </strong>

                                    <small>
                                        ID: {patient.id}
                                    </small>

                                </div>


                                {/* COMPLAINT */}

                                <div className="complaint-cell">

                                    {patient.complaint}

                                </div>


                                {/* ARRIVAL MODE */}

                                <div className="arrival-cell">

                                    {patient.arrivalMode}

                                </div>


                                {/* WAITING TIME */}

                                <div className="waiting-cell">

                                    {patient.waitingTime} min

                                </div>


                                {/* STATUS */}

                                <div>

                                    <span
                                        className={`status-badge ${patient.status.replaceAll(
                                            " ",
                                            "-"
                                        )}`}
                                    >
                                        {activeQueueLabel}
                                    </span>

                                </div>
                                <button
                                    type="button"
                                    className="view-patient-button"
                                    onClick={() =>
                                        navigate(`/dashboard/records/${patient.id}`)
                                    }
                                >
                                    View
                                    <span>→</span>
                                </button>

                            </div>

                        ))}


                        {/* EMPTY QUEUE */}

                        {filteredPatients.length === 0 && (

                            <div className="empty-queue">

                                <div className="empty-icon">
                                    ✓
                                </div>

                                <h3>
                                    No patients in this queue
                                </h3>

                                <p>
                                    There are currently no patients
                                    in this stage of the workflow.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}
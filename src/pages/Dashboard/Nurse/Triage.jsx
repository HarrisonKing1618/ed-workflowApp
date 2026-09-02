import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import "./Triage.css";

const waitingPatients = [
    {
        id: "PT-48213",
        name: "Marcus Reid",
        complaint: "Chest pain, shortness of breath",
        waitTime: 24,
        status: "Critical",
    },
    {
        id: "PT-51902",
        name: "Elena Vasquez",
        complaint: "Abdominal pain",
        waitTime: 19,
        status: "Stable",
    },
    {
        id: "PT-44810",
        name: "Tom Whitfield",
        complaint: "Head injury",
        waitTime: 17,
        status: "Urgent",
    },
    {
        id: "PT-53122",
        name: "Priya Nair",
        complaint: "Fever and weakness",
        waitTime: 11,
        status: "Stable",
    },
    {
        id: "PT-49381",
        name: "Noah Kessler",
        complaint: "Back pain",
        waitTime: 6,
        status: "Urgent",
    },
];

export default function Triage() {
    const [selectedPatient, setSelectedPatient] = useState(waitingPatients[0]);

    const [heartRate, setHeartRate] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [spo2, setSpo2] = useState("");
    const [temperature, setTemperature] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [painScore, setPainScore] = useState("");
    const [severity, setSeverity] = useState("");

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);

        // Reset assessment fields when changing patient
        setHeartRate("");
        setBloodPressure("");
        setSpo2("");
        setTemperature("");
        setRespiratoryRate("");
        setPainScore("");
        setSeverity("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const triageData = {
            patientId: selectedPatient.id,
            heartRate,
            bloodPressure,
            spo2,
            temperature,
            respiratoryRate,
            painScore,
            severity,
        };

        console.log("Triage completed:", triageData);

        // Later:
        // send triageData to backend
    };

    return (
        <div className="triage-page">

            {/* PAGE HEADER */}

            <div className="triage-page-header">
                <h1>Triage Queue</h1>
            </div>


            <div className="triage-content">

                {/* STAT CARDS */}

                <div className="triage-stats">

                    <div className="triage-stat-card">
                        <span>Waiting for Triage</span>
                        <strong>9</strong>
                        <small className="critical-text">
                            Oldest: 24 min
                        </small>
                    </div>

                    <div className="triage-stat-card">
                        <span>Avg. Triage Time</span>
                        <strong>6 min</strong>
                        <small>
                            Within target
                        </small>
                    </div>

                    <div className="triage-stat-card">
                        <span>Completed Today</span>
                        <strong>31</strong>
                        <small>
                            Across 3 nurses
                        </small>
                    </div>

                </div>


                {/* TRIAGE WORKSPACE */}

                <div className="triage-workspace">

                    {/* WAITING LIST */}

                    <div className="waiting-card">

                        <div className="card-title">
                            Waiting for Triage
                        </div>

                        <div className="waiting-list">

                            {waitingPatients.map((patient) => (

                                <button
                                    type="button"
                                    key={patient.id}
                                    className={`waiting-patient ${
                                        selectedPatient.id === patient.id
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handlePatientSelect(patient)
                                    }
                                >

                                    <div className="waiting-name">
                                        {patient.name}
                                    </div>

                                    <div className="waiting-meta">
                                        <span>
                                            Waiting {patient.waitTime} min
                                        </span>

                                        <span
                                            className={`priority-badge ${patient.status.toLowerCase()}`}
                                        >
                                            {patient.status}
                                        </span>
                                    </div>

                                </button>

                            ))}

                        </div>

                    </div>


                    {/* ASSESSMENT */}

                    <div className="assessment-card">

                        <div className="assessment-header">
                            <h2>
                                Triage Assessment — {selectedPatient.name}
                            </h2>

                            <p>
                                {selectedPatient.id} ·{" "}
                                {selectedPatient.complaint}
                            </p>
                        </div>


                        <form
                            className="assessment-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="assessment-grid">

                                <Input
                                    label="Heart Rate (bpm)"
                                    type="number"
                                    placeholder="118"
                                    value={heartRate}
                                    onChange={(e) =>
                                        setHeartRate(e.target.value)
                                    }
                                />

                                <Input
                                    label="Blood Pressure"
                                    type="text"
                                    placeholder="148/94"
                                    value={bloodPressure}
                                    onChange={(e) =>
                                        setBloodPressure(e.target.value)
                                    }
                                />

                                <Input
                                    label="SpO₂ (%)"
                                    type="number"
                                    placeholder="93"
                                    value={spo2}
                                    onChange={(e) =>
                                        setSpo2(e.target.value)
                                    }
                                />

                                <Input
                                    label="Temp (°F)"
                                    type="number"
                                    step="0.1"
                                    placeholder="99.8"
                                    value={temperature}
                                    onChange={(e) =>
                                        setTemperature(e.target.value)
                                    }
                                />

                                <Input
                                    label="Respiratory Rate"
                                    type="number"
                                    placeholder="24"
                                    value={respiratoryRate}
                                    onChange={(e) =>
                                        setRespiratoryRate(e.target.value)
                                    }
                                />

                                <Input
                                    label="Pain Score (0–10)"
                                    type="number"
                                    min="0"
                                    max="10"
                                    placeholder="7"
                                    value={painScore}
                                    onChange={(e) =>
                                        setPainScore(e.target.value)
                                    }
                                />

                            </div>


                            {/* SEVERITY */}

                            <div className="severity-section">

                                <label>
                                    Severity Level
                                </label>

                                <div className="severity-options">

                                    <button
                                        type="button"
                                        className={
                                            severity === "resuscitation"
                                                ? "severity-option active resuscitation"
                                                : "severity-option resuscitation"
                                        }
                                        onClick={() =>
                                            setSeverity("resuscitation")
                                        }
                                    >
                                        1 — Resuscitation
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            severity === "emergent"
                                                ? "severity-option active"
                                                : "severity-option"
                                        }
                                        onClick={() =>
                                            setSeverity("emergent")
                                        }
                                    >
                                        2 — Emergent
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            severity === "urgent"
                                                ? "severity-option active"
                                                : "severity-option"
                                        }
                                        onClick={() =>
                                            setSeverity("urgent")
                                        }
                                    >
                                        3 — Urgent
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            severity === "less-urgent"
                                                ? "severity-option active"
                                                : "severity-option"
                                        }
                                        onClick={() =>
                                            setSeverity("less-urgent")
                                        }
                                    >
                                        4 — Less Urgent
                                    </button>

                                </div>

                            </div>


                            {/* SUBMIT */}

                            <div className="triage-submit">

                                <Button
                                    type="submit"
                                    text="Complete Triage & Assign Priority"
                                />

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patients as initialPatients } from "../../../data/patients";
import "./ClinicalDocumentation.css";

const PATIENTS_KEY = "patients";

function getPatients() {
  try {
    const storedPatients = localStorage.getItem(PATIENTS_KEY);

    if (!storedPatients) {
      return initialPatients;
    }

    return initialPatients;
  } catch (error) {
    console.error("Failed to load patients:", error);

    return initialPatients;
  }
}

function savePatients(patients) {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}

export default function ClinicalDocumentation() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  /*
   * Patient can be passed into this page using:
   *
   * navigate("/clinical-documentation", {
   *   state: { patientId: patient.id }
   * })
   *
   * We also check the URL for ?patientId=
   */
  // const queryParams = new URLSearchParams(location.search);

  // const patientId =
  //   location.state?.patientId ||
  //   queryParams.get("patientId");

  const [patients, setPatients] = useState([]);

  const [patient, setPatient] = useState(null);

  const [activeTab, setActiveTab] = useState("assessment");

  const [formData, setFormData] = useState({
    subjective: "",
    objective: "",
    assessment: "",

    treatmentPlan: "",

    status: "In Treatment",
    statusNote: "",
  });

  const [message, setMessage] = useState("");

  /*
   * Load patients when page opens.
   */
  useEffect(() => {
    const storedPatients = getPatients();
    console.log("URL patientId:", patientId);
    console.log("Patients being searched:", storedPatients);

    setPatients(storedPatients);

    /*
     * Find the patient whose ID was passed
     * to this page.
     */
    if (patientId) {
      const foundPatient = storedPatients.find(
        (item) =>
          String(item.id) === String(patientId) ||
          String(item.patientId) === String(patientId)
      );

      setPatient(foundPatient || null);
      console.log("Patient found:", foundPatient);

      /*
       * If documentation already exists,
       * load it into the form.
       */
      if (foundPatient?.clinicalDocumentation) {
        const documentation = foundPatient.clinicalDocumentation;

        setFormData({
          subjective: documentation.subjective || "",
          objective: documentation.objective || "",
          assessment: documentation.assessment || "",

          treatmentPlan: documentation.treatmentPlan || "",

          status: documentation.status || "In Treatment",
          statusNote: documentation.statusNote || "",
        });
      }
    }
  }, [patientId]);

  /*
   * Handle input changes.
   */
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  /*
   * Update the actual patient record.
   */
  function updatePatientRecord(saveType = "final") {
    if (!patient) {
      setMessage("Patient record could not be found.");
      return;
    }

    const now = new Date().toISOString();

    const updatedPatients = patients.map((item) => {
      const samePatient =
        String(item.id) === String(patient.id) ||
        String(item.patientId) === String(patient.patientId);

      if (!samePatient) {
        return item;
      }

      /*
       * Clinical documentation object
       */
      const clinicalDocumentation = {
        subjective: formData.subjective,
        objective: formData.objective,
        assessment: formData.assessment,

        treatmentPlan: formData.treatmentPlan,

        status: formData.status,
        statusNote: formData.statusNote,

        lastUpdated: now,
        updatedBy: "Doctor",
        saveType,
      };

      /*
       * Doctor note that can appear
       * inside Patient Records.
       */
      const newDoctorNote = {
        id: `NOTE-${Date.now()}`,
        type: "Clinical Documentation",
        subjective: formData.subjective,
        objective: formData.objective,
        assessment: formData.assessment,
        createdAt: now,
        author: "Attending Physician",
      };

      /*
       * Treatment history entry.
       */
      const newTreatmentEntry = {
        id: `TREATMENT-${Date.now()}`,
        treatmentPlan: formData.treatmentPlan,
        assessment: formData.assessment,
        status: formData.status,
        statusNote: formData.statusNote,
        createdAt: now,
        author: "Attending Physician",
      };

      /*
       * Create updated patient.
       */
      return {
        ...item,

        /*
         * Main documentation.
         */
        clinicalDocumentation,

        /*
         * Doctor notes.
         *
         * Keep previous notes and add the new one.
         */
        doctorNotes: [
          ...(item.doctorNotes || []),
          newDoctorNote,
        ],

        /*
         * Treatment history.
         */
        treatmentHistory: [
          ...(item.treatmentHistory || []),
          newTreatmentEntry,
        ],

        /*
         * Update patient's current ED status.
         */
        status: formData.status,

        /*
         * Store last documentation time.
         */
        lastClinicalUpdate: now,
      };
    });

    /*
     * Save everything back to localStorage.
     */
    savePatients(updatedPatients);

    /*
     * Update React state.
     */
    setPatients(updatedPatients);

    const updatedPatient = updatedPatients.find(
      (item) =>
        String(item.id) === String(patient.id) ||
        String(item.patientId) === String(patient.patientId)
    );

    setPatient(updatedPatient);

    setMessage(
      saveType === "draft"
        ? "Documentation saved as draft."
        : "Clinical documentation saved successfully."
    );
  }

  function handleSave() {
    updatePatientRecord("final");
  }

  function handleSaveDraft() {
    updatePatientRecord("draft");
  }

  /*
   * No patient was supplied.
   */
  if (!patientId) {
    return (
      <main className="clinical-documentation-page">
        <div className="documentation-empty">
          <h2>No patient selected</h2>

          <p>
            Open Clinical Documentation from a patient record
            or patient queue.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/doctor")}
          >
            Return to Dashboard
          </button>
        </div>
      </main>
    );
  }

  /*
   * Patient ID was supplied but the patient
   * doesn't exist.
   */
  if (!patient) {
    return (
      <main className="clinical-documentation-page">
        <div className="documentation-empty">
          <h2>Patient not found</h2>

          <p>
            The patient record could not be located.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/doctor")}
          >
            Return to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="clinical-documentation-page">

      {/* PAGE HEADER */}
      <header className="documentation-header">
        <div>
          <h1>Clinical Documentation</h1>
        </div>

        <div className="doctor-info">
          <span className="online-dot"></span>

          <div>
            <strong>Dr. Amara Osei</strong>
            <span>Attending Physician — ED</span>
          </div>

          <div className="doctor-avatar">
            AO
          </div>
        </div>
      </header>

      {/* PATIENT SUMMARY */}
      <section className="patient-banner">

        <div className="patient-avatar">
          {getPatientInitials(patient)}
        </div>

        <div className="patient-information">

          <div className="patient-name-row">
            <h2>
              {patient.fullName ||
                patient.name ||
                "Unknown Patient"}
            </h2>

            <span className="patient-id">
              {patient.patientId ||
                patient.id ||
                "N/A"}
            </span>
          </div>

          <p>
            {patient.reasonForVisit ||
              patient.chiefComplaint ||
              "No complaint recorded"}
          </p>

          <span className="assignment">
            Assigned{" "}
            {patient.assignedAt
              ? formatTimeAgo(patient.assignedAt)
              : "recently"}
          </span>
        </div>

        <span
          className={`priority-badge ${
            patient.priority?.toLowerCase() || "critical"
          }`}
        >
          {patient.priority || "Critical"}
        </span>
      </section>

      {/* TABS */}
      <nav className="documentation-tabs">

        <button
          type="button"
          className={
            activeTab === "assessment"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("assessment")}
        >
          Assessment Notes
        </button>

        <button
          type="button"
          className={
            activeTab === "treatment"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("treatment")}
        >
          Treatment Plan
        </button>

        <button
          type="button"
          className={
            activeTab === "status"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("status")}
        >
          Status Update
        </button>

      </nav>

      {/* DOCUMENTATION FORM */}
      <section className="documentation-card">

        {/* ASSESSMENT */}
        {activeTab === "assessment" && (
          <div className="tab-content">

            <DocumentationField
              label="Subjective (Patient-Reported Symptoms)"
              name="subjective"
              value={formData.subjective}
              onChange={handleChange}
              placeholder="Document the patient's reported symptoms, onset, duration, severity and relevant history..."
            />

            <DocumentationField
              label="Objective (Exam Findings)"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              placeholder="Document physical examination findings, vital signs and other objective findings..."
            />

            <DocumentationField
              label="Assessment"
              name="assessment"
              value={formData.assessment}
              onChange={handleChange}
              placeholder="Document your clinical assessment, differential diagnosis and clinical impression..."
            />

          </div>
        )}

        {/* TREATMENT */}
        {activeTab === "treatment" && (
          <div className="tab-content">

            <DocumentationField
              label="Treatment Plan"
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              placeholder="Document medications, investigations, procedures, referrals and other planned interventions..."
            />

            <div className="info-box">
              <strong>Clinical workflow</strong>

              <p>
                Treatment information entered here will be
                added to the patient's treatment history when
                the documentation is saved.
              </p>
            </div>

          </div>
        )}

        {/* STATUS */}
        {activeTab === "status" && (
          <div className="tab-content">

            <div className="form-group">

              <label htmlFor="status">
                Patient Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Waiting for doctor">
                  Waiting for doctor
                </option>

                <option value="Assigned">
                  Assigned
                </option>

                <option value="In Treatment">
                  In Treatment
                </option>

                <option value="Discharge Queue">
                  Discharge Queue
                </option>

                <option value="Admitted">
                  Admitted
                </option>

                <option value="Discharged">
                  Discharged
                </option>
              </select>

            </div>

            <DocumentationField
              label="Status Note"
              name="statusNote"
              value={formData.statusNote}
              onChange={handleChange}
              placeholder="Add an explanation or clinical note about this status update..."
            />

          </div>
        )}

        {/* SAVE AREA */}
        <div className="documentation-footer">

          {message && (
            <span className="save-message">
              {message}
            </span>
          )}

          <div className="save-actions">

            <button
              type="button"
              className="primary-button"
              onClick={handleSave}
            >
              Save Documentation
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleSaveDraft}
            >
              Save as Draft
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}


/*
 * Reusable textarea component.
 */
function DocumentationField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="form-group">

      <label htmlFor={name}>
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

    </div>
  );
}


/*
 * Get initials from patient's name.
 */
function getPatientInitials(patient) {
  const name =
    patient.fullName ||
    patient.name ||
    "Patient";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}


/*
 * Display something like:
 *
 * 8 minutes ago
 */
function formatTimeAgo(date) {
  const difference =
    Date.now() - new Date(date).getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  if (minutes < 1) {
    return "just now";
  }

  if (minutes === 1) {
    return "1 minute ago";
  }

  return `${minutes} minutes ago`;
}
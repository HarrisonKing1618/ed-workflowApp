import { useState, useMemo } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import "./ExistingPatient.css";

const samplePatients = [
  {
    id: "PT-48213",
    fullName: "Marcus Reid",
    dateOfBirth: "1978-03-14",
    lastVisit: "Jan 12, 2026 — Chest Pain",
  },
  {
    id: "PT-51902",
    fullName: "Marcus Reilly",
    dateOfBirth: "1990-07-22",
    lastVisit: "Never",
  },
  {
    id: "PT-44810",
    fullName: "Marcy Reidel",
    dateOfBirth: "1965-11-03",
    lastVisit: "Aug 30, 2025 — Fall Injury",
  },
];

export default function ExistingPatientSearch() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [mrn, setMrn] = useState("");

  const filteredPatients = useMemo(() => {
    return samplePatients.filter((patient) => {
      const matchesName =
        !fullName ||
        patient.fullName.toLowerCase().includes(fullName.toLowerCase());

      const matchesDOB = !dob || patient.dateOfBirth === dob;

      const matchesMRN =
        !mrn || patient.id.toLowerCase().includes(mrn.toLowerCase());

      return matchesName && matchesDOB && matchesMRN;
    });
  }, [fullName, dob, mrn]);

  return (
    <div className="existing-patient-page">
      <div className="existing-page-header">
        <h1>Existing Patient Search</h1>
      </div>

      <div className="existing-content">

        {/* SEARCH CARD */}

        <div className="search-card">

          <div className="search-card-header">
            <h3>Search for Patient</h3>
            <p>
              Find an existing patient by name, date of birth, or MRN.
            </p>
          </div>

          <div className="search-grid">

            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Marcus Reid"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <Input
              label="MRN / Patient ID"
              type="text"
              placeholder="e.g. PT-48213"
              value={mrn}
              onChange={(e) => setMrn(e.target.value)}
            />

          </div>

          <div className="search-action">
            <Button text="Search Patients" />
          </div>

        </div>

        {/* RESULTS */}

        <div className="results-section">

          <div className="results-header">
            <h3>
              Search Results ({filteredPatients.length})
            </h3>
          </div>

          <div className="results-table">

            <div className="table-head">
              <span>Patient</span>
              <span>Date of Birth</span>
              <span>Last Visit</span>
              <span>MRN</span>
              <span></span>
            </div>

            {filteredPatients.length === 0 ? (
              <div className="empty-results">
                No patients found.
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <div className="table-row" key={patient.id}>

                  <div className="patient-name">
                    <strong>{patient.fullName}</strong>
                  </div>

                  <div>
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </div>

                  <div className="visit-info">
                    {patient.lastVisit}
                  </div>

                  <div className="mrn">
                    {patient.id}
                  </div>

                  <button
                    className="select-button"
                    onClick={() =>
                      navigate(`/dashboard/patient-record/${patient.id}`)
                    }
                  >
                    Select →
                  </button>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
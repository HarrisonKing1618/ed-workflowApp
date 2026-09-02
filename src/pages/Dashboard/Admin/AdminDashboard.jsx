import { useEffect, useMemo, useState } from "react";
import "./AdminDashboard.css";
import { patients } from "../../../data/patients.js";
import { initialStaff } from "../../../data/staffData.js";

const PATIENTS_KEY = "patients";
const STAFF_KEY = "staff";

const ED_CAPACITY = 49;

const defaultStaff = initialStaff

function getPatients() {
  try {
    const storedPatients = localStorage.getItem(PATIENTS_KEY);
    const defaultPatients = patients

    if (!storedPatients) {
      return defaultPatients;
    }
    

    const parsedPatients = JSON.parse(storedPatients);

    return [
        ...defaultPatients,
        (Array.isArray(parsedPatients) ? parsedPatients : [])];
  } catch (error) {
    console.error("Unable to load patients:", error);
    return [];
  }
}






function getStaff() {
  try {
    const storedStaff = localStorage.getItem(STAFF_KEY);

    if (!storedStaff) {
      return defaultStaff;
    }

    const parsedStaff = JSON.parse(storedStaff);

    return Array.isArray(parsedStaff) ? parsedStaff : defaultStaff;
  } catch (error) {
    console.error("Unable to load staff:", error);
    return defaultStaff;
  }
}

function getPatientStatus(patient) {
  return String(
    patient.status ||
      patient.patientStatus ||
      patient.queueStatus ||
      ""
  )
    .toLowerCase()
    .trim();
}

function getPatientArrivalTime(patient) {
  return (
    patient.arrivalTime ||
    patient.createdAt ||
    patient.checkInTime ||
    patient.registrationTime ||
    null
  );
}

function isToday(dateValue) {
  if (!dateValue) {
    return false;
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function calculateAverageWaitTime(patients) {
  const now = Date.now();

  const waitingPatients = patients.filter((patient) => {
    const status = getPatientStatus(patient);

    return (
      status.includes("waiting") ||
      status.includes("triage")
    );
  });

  if (waitingPatients.length === 0) {
    return 0;
  }

  const validWaitTimes = waitingPatients
    .map((patient) => {
      const arrivalTime = getPatientArrivalTime(patient);

      if (!arrivalTime) {
        return null;
      }

      const arrival = new Date(arrivalTime).getTime();

      if (Number.isNaN(arrival)) {
        return null;
      }

      return Math.max(0, now - arrival);
    })
    .filter(Boolean);

  if (validWaitTimes.length === 0) {
    return 0;
  }

  const average =
    validWaitTimes.reduce((sum, value) => sum + value, 0) /
    validWaitTimes.length;

  return Math.round(average / 60000);
}

function formatWaitTime(minutes) {
  if (!minutes) {
    return "0m";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function calculateStaffWorkload(staff, patients) {
  return staff.map((member) => {
    const assignedPatients = patients.filter((patient) => {
      const doctorId =
        patient.doctorId ||
        patient.assignedDoctorId ||
        patient.assignedDoctor;

      const nurseId =
        patient.nurseId ||
        patient.assignedNurseId ||
        patient.assignedNurse;

      const memberId = member.id;

      return (
        String(doctorId) === String(memberId) ||
        String(nurseId) === String(memberId) ||
        String(doctorId).toLowerCase() ===
          String(member.name).toLowerCase() ||
        String(nurseId).toLowerCase() ===
          String(member.name).toLowerCase()
      );
    });

    return {
      ...member,
      patientCount: assignedPatients.length,
    };
  });
}

export default function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);

  const loadDashboardData = () => {
    setPatients(getPatients());
    setStaff(getStaff());
  };

  useEffect(() => {
    loadDashboardData();

    const handleStorageChange = () => {
      loadDashboardData();
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener(
      "patientsUpdated",
      handleStorageChange
    );

    const interval = setInterval(() => {
      loadDashboardData();
    }, 10000);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      window.removeEventListener(
        "patientsUpdated",
        handleStorageChange
      );

      clearInterval(interval);
    };
  }, []);

  const dashboardStats = useMemo(() => {
    const arrivalsToday = patients.filter((patient) =>
      isToday(getPatientArrivalTime(patient))
    ).length;

    const waitingPatients = patients.filter((patient) => {
      const status = getPatientStatus(patient);

      return (
        status.includes("waiting") ||
        status.includes("triage")
      );
    }).length;

    const activeTreatment = patients.filter((patient) => {
      const status = getPatientStatus(patient);

      return (
        status.includes("treatment") ||
        status.includes("assigned") ||
        status.includes("in treatment")
      );
    }).length;

    const dischargedToday = patients.filter((patient) => {
      const status = getPatientStatus(patient);

      return (
        status.includes("discharged") &&
        isToday(
          patient.dischargedAt ||
            patient.dischargeTime ||
            patient.updatedAt
        )
      );
    }).length;

    const occupiedBeds = Math.min(
      ED_CAPACITY,
      waitingPatients + activeTreatment
    );

    const occupancyPercentage = Math.round(
      (occupiedBeds / ED_CAPACITY) * 100
    );

    const doctors = staff.filter(
      (member) => member.type === "doctor"
    );

    const nurses = staff.filter(
      (member) => member.type === "nurse"
    );

    const doctorsAvailable = doctors.filter(
      (doctor) => doctor.status !== "unavailable"
    ).length;

    const nursesAvailable = nurses.filter(
      (nurse) => nurse.status !== "unavailable"
    ).length;

    return {
      arrivalsToday,
      waitingPatients,
      activeTreatment,
      dischargedToday,
      occupiedBeds,
      occupancyPercentage,
      doctorsAvailable,
      nursesAvailable,
      averageWait: calculateAverageWaitTime(patients),
    };
  }, [patients, staff]);

  const staffWorkload = useMemo(() => {
    return calculateStaffWorkload(staff, patients);
  }, [staff, patients]);

  return (
    <div className="admin-dashboard">

      {/* PAGE HEADER */}
      <div className="admin-page-header">
        <div>
          <h1>Live ED Operations</h1>
          <p>
            Real-time emergency department overview
          </p>
        </div>

        <div className="live-indicator">
          <span className="live-dot"></span>
          Live
        </div>
      </div>

      {/* STAT CARDS */}
      <section className="admin-stats-grid">

        <div className="admin-stat-card">
          <span className="stat-label">
            Current Occupancy
          </span>

          <strong className="stat-value">
            {dashboardStats.occupancyPercentage}%
          </strong>

          <span className="stat-description">
            {dashboardStats.occupiedBeds} of {ED_CAPACITY} beds
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="stat-label">
            Avg. Wait Time
          </span>

          <strong className="stat-value">
            {formatWaitTime(dashboardStats.averageWait)}
          </strong>

          <span className="stat-description positive">
            Live calculation
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="stat-label">
            Doctors Available
          </span>

          <strong className="stat-value">
            {dashboardStats.doctorsAvailable}
          </strong>

          <span className="stat-description">
            {staff.filter(
              (member) =>
                member.type === "doctor" &&
                member.status === "busy"
            ).length}{" "}
            in surgery
          </span>
        </div>

        <div className="admin-stat-card">
          <span className="stat-label">
            Nurses Available
          </span>

          <strong className="stat-value">
            {dashboardStats.nursesAvailable}
          </strong>

          <span className="stat-description positive">
            Fully staffed
          </span>
        </div>

      </section>

      {/* MAIN MONITORING AREA */}
      <section className="admin-monitoring-grid">

        {/* PATIENT FLOW */}
        <div className="admin-panel patient-flow-panel">

          <div className="panel-header">
            <div>
              <h2>Patient Flow Monitoring</h2>
              <p>Current ED patient movement</p>
            </div>
          </div>

          <div className="flow-list">

            <FlowRow
              label="Arrivals"
              value={dashboardStats.arrivalsToday}
              percentage={100}
            />

            <FlowRow
              label="Waiting Patients"
              value={dashboardStats.waitingPatients}
              percentage={
                dashboardStats.arrivalsToday
                  ? (dashboardStats.waitingPatients /
                      dashboardStats.arrivalsToday) *
                    100
                  : 0
              }
            />

            <FlowRow
              label="Active Treatment"
              value={dashboardStats.activeTreatment}
              percentage={
                dashboardStats.arrivalsToday
                  ? (dashboardStats.activeTreatment /
                      dashboardStats.arrivalsToday) *
                    100
                  : 0
              }
            />

            <FlowRow
              label="Discharged Today"
              value={dashboardStats.dischargedToday}
              percentage={
                dashboardStats.arrivalsToday
                  ? (dashboardStats.dischargedToday /
                      dashboardStats.arrivalsToday) *
                    100
                  : 0
              }
            />

          </div>
        </div>

        {/* STAFF WORKLOAD */}
        <div className="admin-panel staff-panel">

          <div className="panel-header">
            <div>
              <h2>Staff Workload</h2>
              <p>Current patient assignments</p>
            </div>
          </div>

          <div className="staff-list">

            {staffWorkload.length === 0 ? (
              <div className="empty-state">
                No staff records available.
              </div>
            ) : (
              staffWorkload.map((member) => (
                <div
                  className="staff-row"
                  key={member.id}
                >
                  <div className="staff-info">
                    <span className="staff-name">
                      {member.name}
                    </span>

                    <span className="staff-role">
                      {member.role}
                    </span>
                  </div>

                  <span className="patient-count">
                    {member.patientCount}{" "}
                    {member.patientCount === 1
                      ? "patient"
                      : "patients"}
                  </span>
                </div>
              ))
            )}

          </div>
        </div>

      </section>

      {/* DAILY SUMMARY */}
      <section className="admin-summary-panel">

        <div className="summary-item">
          <span>Today's Arrivals</span>
          <strong>
            {dashboardStats.arrivalsToday}
          </strong>
        </div>

        <div className="summary-item">
          <span>Waiting</span>
          <strong>
            {dashboardStats.waitingPatients}
          </strong>
        </div>

        <div className="summary-item">
          <span>In Treatment</span>
          <strong>
            {dashboardStats.activeTreatment}
          </strong>
        </div>

        <div className="summary-item">
          <span>Discharged</span>
          <strong>
            {dashboardStats.dischargedToday}
          </strong>
        </div>

      </section>

    </div>
  );
}

function FlowRow({ label, value, percentage }) {
  const safePercentage = Math.min(
    100,
    Math.max(0, percentage)
  );

  return (
    <div className="flow-row">

      <div className="flow-label">
        <span>{label}</span>
      </div>

      <div className="flow-progress">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${safePercentage}%`,
            }}
          ></div>
        </div>
      </div>

      <span className="flow-value">
        {value}
      </span>

    </div>
  );
}
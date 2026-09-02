export default function StaffTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="staff-tabs">
      <button
        className={activeTab === "Doctors" ? "active" : ""}
        onClick={() => setActiveTab("Doctors")}
      >
        Doctors
      </button>

      <button
        className={activeTab === "Nurses" ? "active" : ""}
        onClick={() => setActiveTab("Nurses")}
      >
        Nurses
      </button>
    </div>
  );
}
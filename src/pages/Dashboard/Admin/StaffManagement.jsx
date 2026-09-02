import { useEffect, useState } from "react";
import { initialStaff } from "../../../data/staffData";
import StaffTabs from "../../../components/StaffManagement/StaffTabs";
import StaffTable from "../../../components/StaffManagement/StaffTable";
import AddStaffModal from "../../../components/StaffManagement/AddStaffModal";
import StaffDetailsModal from "../../../components/StaffManagement/StaffDetailsModal";
import "./StaffManagement.css";

const STAFF_KEY = "edapp_staff";

function getStaff() {
  try {
    const storedStaff = localStorage.getItem(STAFF_KEY);

    if (!storedStaff) {
      return initialStaff;
    }

    const localStaff = JSON.parse(storedStaff);

    // Combine localStorage staff with staff.js data
    const combined = [...initialStaff];

    localStaff.forEach((staffMember) => {
      const existingIndex = combined.findIndex(
        (staff) => staff.id === staffMember.id
      );

      if (existingIndex !== -1) {
        combined[existingIndex] = staffMember;
      } else {
        combined.push(staffMember);
      }
    });

    return combined;
  } catch (error) {
    console.error("Unable to load staff:", error);
    return initialStaff;
  }
}

function saveStaff(staff) {
  localStorage.setItem(STAFF_KEY, JSON.stringify(staff));
}

export default function StaffManagement() {
  const [staff, setStaff] = useState(getStaff);
  const [activeTab, setActiveTab] = useState("Doctors");

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    saveStaff(staff);
  }, [staff]);

  const filteredStaff = staff.filter((member) => {
    const matchesRole =
      activeTab === "Doctors"
        ? member.role === "Doctor"
        : member.role === "Nurse";

    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

  function handleAddStaff(newStaff) {
    const staffWithId = {
      ...newStaff,
      id: `${newStaff.role === "Doctor" ? "DOC" : "NUR"}-${String(
        staff.length + 1
      ).padStart(4, "0")}`,
      workload: 0,
      availability: "Available",
      status: "Active",
      patients: [],
    };

    setStaff((prev) => [...prev, staffWithId]);
    setShowAddModal(false);
  }

  function handleUpdateStaff(updatedStaff) {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === updatedStaff.id ? updatedStaff : member
      )
    );

    setSelectedStaff(updatedStaff);
  }

  function handleDeactivateStaff(id) {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, status: "Inactive" }
          : member
      )
    );

    setSelectedStaff(null);
  }

  return (
    <main className="staff-management">
      <div className="staff-header">
        <div>
          <h1>Staff Management</h1>
        </div>

        <button
          className="add-staff-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Staff Member
        </button>
      </div>

      <div className="staff-controls">
        <StaffTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <input
          type="text"
          className="staff-search"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <StaffTable
        staff={filteredStaff}
        onView={setSelectedStaff}
      />

      {showAddModal && (
        <AddStaffModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddStaff}
        />
      )}

      {selectedStaff && (
        <StaffDetailsModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
          onUpdate={handleUpdateStaff}
          onDeactivate={handleDeactivateStaff}
        />
      )}
    </main>
  );
}
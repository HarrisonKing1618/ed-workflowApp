import { useState } from "react";

export default function StaffDetailsModal({
  staff,
  onClose,
  onUpdate,
  onDeactivate,
}) {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState(staff);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setEditing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="staff-details-modal">

        <div className="modal-header">
          <h2>Staff Details</h2>

          <button onClick={onClose}>×</button>
        </div>

        <div className="staff-profile">
          <div className="staff-avatar">
            {staff.firstName.charAt(0)}
            {staff.lastName.charAt(0)}
          </div>

          <div>
            <h3>
              {staff.title} {staff.firstName} {staff.lastName}
            </h3>

            <p>{staff.id}</p>
          </div>
        </div>

        <div className="details-grid">

          <div>
            <span>Role</span>

            {editing ? (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
              </select>
            ) : (
              <strong>{staff.role}</strong>
            )}
          </div>

          <div>
            <span>Specialty</span>

            {editing ? (
              <input
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              />
            ) : (
              <strong>{staff.specialty}</strong>
            )}
          </div>

          <div>
            <span>Availability</span>

            <strong>{staff.availability}</strong>
          </div>

          <div>
            <span>Current Workload</span>

            <strong>{staff.workload} patients</strong>
          </div>

          <div>
            <span>Shift</span>

            {editing ? (
              <input
                name="shift"
                value={formData.shift}
                onChange={handleChange}
              />
            ) : (
              <strong>{staff.shift}</strong>
            )}
          </div>

          <div>
            <span>Email</span>

            {editing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <strong>{staff.email}</strong>
            )}
          </div>

          <div>
            <span>Phone</span>

            {editing ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <strong>{staff.phone}</strong>
            )}
          </div>

          <div>
            <span>Account Status</span>

            <strong>{staff.status}</strong>
          </div>

        </div>

        <div className="modal-actions">

          {editing ? (
            <>
              <button
                className="cancel-btn"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                className="deactivate-btn"
                onClick={() => onDeactivate(staff.id)}
              >
                Deactivate
              </button>

              <button
                className="save-btn"
                onClick={() => setEditing(true)}
              >
                Edit Staff
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
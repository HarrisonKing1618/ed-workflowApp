import { useState } from "react";

export default function AddStaffModal({
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    role: "Doctor",
    specialty: "",
    phone: "",
    email: "",
    shift: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.specialty ||
      !formData.email
    ) {
      alert("Please complete all required fields.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="staff-modal">
        <div className="modal-header">
          <h2>Add Staff Member</h2>

          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Title</label>

              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Dr.">Dr.</option>
                <option value="RN">RN</option>
              </select>
            </div>

            <div className="form-group">
              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Specialty</label>

            <input
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="e.g. Emergency Medicine"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Shift</label>

            <select
              name="shift"
              value={formData.shift}
              onChange={handleChange}
            >
              <option value="">Select shift</option>
              <option value="7:00 AM – 7:00 PM">
                7:00 AM – 7:00 PM
              </option>
              <option value="7:00 PM – 7:00 AM">
                7:00 PM – 7:00 AM
              </option>
              <option value="On call">On call</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Add Staff Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
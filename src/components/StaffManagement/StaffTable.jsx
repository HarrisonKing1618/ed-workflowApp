import StaffStatusBadge from "./StafftatusBadge";

export default function StaffTable({ staff, onView }) {
  return (
    <div className="staff-table-wrapper">
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Availability</th>
            <th>Workload</th>
            <th>Shift</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {staff.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-staff">
                No staff members found.
              </td>
            </tr>
          ) : (
            staff.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="staff-name">
                    <strong>
                      {member.title} {member.firstName} {member.lastName}
                    </strong>

                    <span>{member.id}</span>
                  </div>
                </td>

                <td>{member.specialty}</td>

                <td>
                  <StaffStatusBadge
                    status={member.availability}
                  />
                </td>

                <td>
                  {member.availability === "In Surgery"
                    ? "In surgery"
                    : `${member.workload} patients`}
                </td>

                <td>{member.shift}</td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => onView(member)}
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
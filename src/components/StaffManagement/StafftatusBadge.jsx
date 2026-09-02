export default function StaffStatusBadge({ status }) {
  const statusClass = status
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <span className={`staff-status ${statusClass}`}>
      {status}
    </span>
  );
}
export default function PatientSummary({ patient }) {

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDifference =
            today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() < birthDate.getDate()
            )
        ) {
            age--;
        }

        return age;
    };

    return (
        <section className="patient-summary">

            <div className="patient-summary__avatar">
                {patient.firstName.charAt(0)}
            </div>

            <div className="patient-summary__info">

                <h2>
                    {patient.firstName} {patient.lastName}
                </h2>

                <p>
                    MRN: {patient.id}
                    {" • "}
                    DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                    {" "}
                    ({calculateAge(patient.dateOfBirth)}yo)
                    {" • "}
                    {patient.gender}
                    {" • "}
                    Blood Type: {patient.bloodType}
                </p>

            </div>

            <span
                className={`priority-badge priority-badge--${patient.priority.toLowerCase()}`}
            >
                {patient.priority}
            </span>

        </section>
    );
}

import "./PatientProfile.css";

export default function PatientProfile({ patient }) {
    return (
        <div className="patient-profile">

            {/* Personal Information */}
            <section className="medical-history__section">

                <div className="medical-history__section-header">
                    <h3>Personal Information</h3>
                </div>

                <div className="patient-profile__grid">

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Full Name
                        </span>

                        <span className="patient-profile__value">
                            {patient?.firstName} {patient?.lastName}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Medical Record Number
                        </span>

                        <span className="patient-profile__value">
                            {patient?.id || "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Date of Birth
                        </span>

                        <span className="patient-profile__value">
                            {patient?.dateOfBirth
                                ? new Date(
                                    patient.dateOfBirth
                                ).toLocaleDateString()
                                : "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Gender
                        </span>

                        <span className="patient-profile__value">
                            {patient?.gender || "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Blood Type
                        </span>

                        <span className="patient-profile__value">
                            {patient?.bloodType || "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Priority
                        </span>

                        <span className="patient-profile__value">
                            {patient?.priority || "Not available"}
                        </span>
                    </div>

                </div>

            </section>


            {/* Contact Information */}
            <section className="medical-history__section">

                <div className="medical-history__section-header">
                    <h3>Contact Information</h3>
                </div>

                <div className="patient-profile__grid">

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Phone Number
                        </span>

                        <span className="patient-profile__value">
                            {patient?.phoneNumber || "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Email
                        </span>

                        <span className="patient-profile__value">
                            {patient?.email || "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Address
                        </span>

                        <span className="patient-profile__value">
                            {patient?.address || "Not available"}
                        </span>
                    </div>

                </div>

            </section>


            {/* Emergency Contact */}
            <section className="medical-history__section">

                <div className="medical-history__section-header">
                    <h3>Emergency Contact</h3>
                </div>

                <div className="patient-profile__grid">

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Name
                        </span>

                        <span className="patient-profile__value">
                            {patient?.emergencyContact || "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Phone Number
                        </span>

                        <span className="patient-profile__value">
                            {patient?.emergencyContactPhone ||
                                "Not available"}
                        </span>
                    </div>

                    <div className="patient-profile__field">
                        <span className="patient-profile__label">
                            Relationship
                        </span>

                        <span className="patient-profile__value">
                            {patient?.emergencyContactRelationship ||
                                "Not available"}
                        </span>
                    </div>

                </div>

            </section>

        </div>
    );
}
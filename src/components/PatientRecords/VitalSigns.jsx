import "./VitalSigns.css"

export default function VitalSigns({ patientId }) {
    // Temporary mock data.
    // This will eventually come frombackend using patientId.
    const currentVitals = {
        bloodPressure: "142/92",
        heartRate: "108",
        respiratoryRate: "22",
        temperature: "37.1",
        oxygenSaturation: "94",
        painScore: "7"
    };

    const vitalHistory = [
        {
            id: 1,
            time: "10:40 AM",
            bloodPressure: "142/92",
            heartRate: "108",
            respiratoryRate: "22",
            temperature: "37.1",
            oxygenSaturation: "94",
            painScore: "7"
        },
        {
            id: 2,
            time: "10:20 AM",
            bloodPressure: "138/88",
            heartRate: "104",
            respiratoryRate: "21",
            temperature: "37.0",
            oxygenSaturation: "95",
            painScore: "6"
        },
        {
            id: 3,
            time: "10:00 AM",
            bloodPressure: "136/86",
            heartRate: "101",
            respiratoryRate: "20",
            temperature: "36.9",
            oxygenSaturation: "96",
            painScore: "6"
        }
    ];

    return (
        <div className="vital-signs">

            {/* Current Vitals */}
            <section className="vital-signs__section">

                <div className="vital-signs__section-header">
                    <div>
                        <h3>Current Vital Signs</h3>
                        <p>Latest recorded measurements</p>
                    </div>

                    <span className="vital-signs__time">
                        Today, 10:40 AM
                    </span>
                </div>


                <div className="vital-signs__cards">

                    {/* Blood Pressure */}
                    <div className="vital-card">
                        <span className="vital-card__label">
                            Blood Pressure
                        </span>

                        <strong className="vital-card__value">
                            {currentVitals.bloodPressure}
                        </strong>

                        <span className="vital-card__unit">
                            mmHg
                        </span>
                    </div>


                    {/* Heart Rate */}
                    <div className="vital-card">
                        <span className="vital-card__label">
                            Heart Rate
                        </span>

                        <strong className="vital-card__value">
                            {currentVitals.heartRate}
                        </strong>

                        <span className="vital-card__unit">
                            bpm
                        </span>
                    </div>


                    {/* Respiratory Rate */}
                    <div className="vital-card">
                        <span className="vital-card__label">
                            Respiratory Rate
                        </span>

                        <strong className="vital-card__value">
                            {currentVitals.respiratoryRate}
                        </strong>

                        <span className="vital-card__unit">
                            /min
                        </span>
                    </div>


                    {/* Temperature */}
                    <div className="vital-card">
                        <span className="vital-card__label">
                            Temperature
                        </span>

                        <strong className="vital-card__value">
                            {currentVitals.temperature}
                        </strong>

                        <span className="vital-card__unit">
                            °C
                        </span>
                    </div>


                    {/* Oxygen Saturation */}
                    <div className="vital-card">
                        <span className="vital-card__label">
                            Oxygen Saturation
                        </span>

                        <strong className="vital-card__value">
                            {currentVitals.oxygenSaturation}
                        </strong>

                        <span className="vital-card__unit">
                            %
                        </span>
                    </div>


                    {/* Pain Score */}
                    <div className="vital-card">
                        <span className="vital-card__label">
                            Pain Score
                        </span>

                        <strong className="vital-card__value">
                            {currentVitals.painScore}
                        </strong>

                        <span className="vital-card__unit">
                            /10
                        </span>
                    </div>

                </div>

            </section>


            {/* Vital History */}
            <section className="vital-signs__section">

                <div className="vital-signs__section-header">
                    <div>
                        <h3>Vital Sign History</h3>
                        <p>Previous measurements recorded during this visit</p>
                    </div>
                </div>


                <div className="vital-history">

                    {/* Table Header */}
                    <div className="vital-history__header">
                        <span>Time</span>
                        <span>Blood Pressure</span>
                        <span>Heart Rate</span>
                        <span>Resp. Rate</span>
                        <span>Temperature</span>
                        <span>SpO₂</span>
                        <span>Pain</span>
                    </div>


                    {/* Table Rows */}
                    {vitalHistory.map((vital) => (

                        <div
                            className="vital-history__row"
                            key={vital.id}
                        >
                            <span>
                                {vital.time}
                            </span>

                            <span>
                                {vital.bloodPressure}
                            </span>

                            <span>
                                {vital.heartRate} bpm
                            </span>

                            <span>
                                {vital.respiratoryRate} /min
                            </span>

                            <span>
                                {vital.temperature} °C
                            </span>

                            <span>
                                {vital.oxygenSaturation}%
                            </span>

                            <span>
                                {vital.painScore}/10
                            </span>
                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
}
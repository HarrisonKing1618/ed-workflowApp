const notes = [
    {
        id: 1,
        doctor: "Dr. Amara Osei",
        date: "Today, 10:42 AM",
        note:
            "Suspected acute coronary syndrome. STAT ECG shows ST depression in leads V4-V6. Troponin pending. Started on aspirin 325mg, nitroglycerin sublingual. Cardiology consult requested."
    },
    {
        id: 2,
        doctor: "Dr. Amara Osei",
        date: "Today, 10:18 AM",
        note:
            "Initial assessment: chest pain radiating to left arm, diaphoretic. Vitals reviewed from triage. Ordering STAT ECG, troponin, CBC, BMP, chest X-ray."
    }
];

export default function DoctorNotes({ patientId }) {

    return (
        <div className="doctor-notes">

            {notes.map((note) => (

                <article
                    className="doctor-note"
                    key={note.id}
                >

                    <div className="doctor-note__header">

                        <strong>
                            {note.doctor}
                        </strong>

                        <span>
                            {note.date}
                        </span>

                    </div>

                    <p>
                        {note.note}
                    </p>

                </article>

            ))}

        </div>
    );
}
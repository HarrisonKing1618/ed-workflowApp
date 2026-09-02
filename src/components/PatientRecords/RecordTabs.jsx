const tabs = [
    {
        id: "profile",
        label: "Profile"
    },
    {
        id: "medical-history",
        label: "Medical History"
    },
    {
        id: "vitals",
        label: "Vital Signs"
    },
    {
        id: "triage",
        label: "Triage Assessment"
    },
    {
        id: "doctor-notes",
        label: "Doctor Notes"
    },
    {
        id: "treatment",
        label: "Treatment History"
    }
];

export default function RecordTabs({
    activeTab,
    setActiveTab
}) {

    return (
        <nav className="record-tabs">

            {tabs.map((tab) => (

                <button
                    key={tab.id}
                    type="button"
                    className={
                        activeTab === tab.id
                            ? "record-tab active"
                            : "record-tab"
                    }
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>

            ))}

        </nav>
    );
}
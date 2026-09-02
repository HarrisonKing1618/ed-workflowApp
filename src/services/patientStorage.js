const PATIENT_KEY = "patients"

export function getPatients() {
    const patients = localStorage.getItem(PATIENT_KEY )
    if (!patients) {
        return []
    }
    return JSON.parse(patients)
}
export function savePatients(patients) {
    localStorage.setItem(
        PATIENT_KEY ,
        JSON.stringify(patients)
    )
}
export function addPatient(patient) {
    const patients = getPatients()
    patients.push(patient)
    savePatients(patients)
    return patient
}
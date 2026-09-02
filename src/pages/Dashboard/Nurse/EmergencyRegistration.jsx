import { useState } from "react";
import { addPatient } from "../../../services/patientStorage.js";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input.jsx";
import Button from "../../../components/common/Button.jsx";
import "./EmergencyRegistration.css"


export default function EmergencyRegistration() {

    const navigate = useNavigate()

    const [patientDescriptor, setPatientDescriptor] = useState("")
    const [arrivalTime] = useState(new Date().toISOString());
    const [presentingCondition, setPresentingCondition] = useState("")
    const [arrivalMode, setArrivalMode] = useState("")
    const [bedAssignment, setBedAssignment] = useState("")

    const [errors, setErrors] = useState({
        patientDescriptor: "",
        presentingCondition: "",
        arrivalMode: "",
        bedAssignment: "",

    })

    async function handleSubmit(e) {
        e.preventDefault()

        const newErrors = {}

        if (!patientDescriptor.trim()) {
            newErrors.patientDescriptor = "Patient descriptor is required"
        }
        if (!presentingCondition.trim()) {
            newErrors.presentingCondition = "Presenting condition is required"
        }
        if (!arrivalMode) {
            newErrors.arrivalMode = "Arrival mode is required"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
         const patient = {
            id: `${Date.now()}`,
            fullName: patientDescriptor.trim(),
            patientDescriptor: patientDescriptor.trim(),
            arrivalTime,
            presentingCondition: presentingCondition.trim(),
            arrivalMode,
            bedAssignment: bedAssignment.trim(),

            status: "waiting",
            priority: "emergency",
            assignedDoctor: null,

            checkedInAt: new Date().toISOString(),

            isQuickRegistration: true,

            vitals: {
                temperature: "",
                pulse: "",
                respiratoryRate: "",
                oxygenSaturation: "",
                painScale: ""
            },

            symptoms: "",
            notes: ""
        }
        addPatient(patient)
        navigate("/dashboard/queue")
    }
    return (
    
        <div className="emergency-page">
            <div className="emergency-page-header">
                <h1>Emergency Quick Registration</h1>
            </div>
            
            <div className="emergency-content">
                <div className="emergency-warning">
                    <span className="warning-dot">
                        <p>
                            Minimal-data fast-track for critical arrivals.
                            Collect only what's needed to begin treatment —
                            full registration can be completed later.
                        </p>
                    </span>
                </div>
                <form 
                    className="emergency-form-grid"
                    onSubmit={handleSubmit}>
                        <div className="form-field">
                            <Input 
                                label="Patient Description"
                                type="text"
                                name="patientDescriptor"
                                value={patientDescriptor}
                                onChange={(e) => {
                                    setPatientDescriptor(e.target.value)
                                    setErrors((prev) => ({
                                        ...prev,
                                        patientDescriptor: ""
                                    }))
                                }}
                                error={errors.patientDescriptor}
                            />    
                        </div>

                        <div className="arrival-time">
                            <span>Arrival Time:  </span>
                            <strong>
                                {new Date(arrivalTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </strong>
                        </div>
                       
                       <div className="form-field full-width">
                            <Input 
                            label= "Presenting Condition"
                            type="text"
                            name="presentingConditiopn"
                            value={presentingCondition}
                            onChange={(e) => {
                                setPresentingCondition(e.target.value)
                                setErrors((prev) => ({
                                    prev,
                                    presentingCondition: ""
                                }))
                            }}
                            error={errors.presentingCondition}
                            />
                       </div>
                        <div className="form-field">

                                <label htmlFor="arrivalMode">
                                    Arrival Mode
                                </label>

                                <select
                                    id="arrivalMode"
                                    name="arrivalMode"
                                    value={arrivalMode}
                                    onChange={(e) => {
                                        setArrivalMode(e.target.value)

                                        setErrors((prev) => ({
                                            ...prev,
                                            arrivalMode: ""
                                        }))
                                    }}
                                    className={
                                        errors.arrivalMode
                                            ? "input-error"
                                            : ""
                                    }
                                >
                                    <option value="">
                                        Ambulance / Walk-in / Police
                                    </option>

                                    <option value="ambulance">
                                        Ambulance
                                    </option>

                                    <option value="walk-in">
                                        Walk-in
                                    </option>

                                    <option value="police">
                                        Police
                                    </option>

                                    <option value="transfer">
                                        Transfer
                                    </option>
                                </select>

                                {errors.arrivalMode && (
                                    <p className="error">
                                        {errors.arrivalMode}
                                    </p>
                                )}

                            </div>

                            <div className="form-field">

                                <Input
                                    label="Bed / Bay Assignment"
                                    type="text"
                                    name="bedAssignment"
                                    value={bedAssignment}
                                    onChange={(e) => {
                                        setBedAssignment(e.target.value)
                                    }}
                                />

                            </div>
                            <div className="emergency-submit">

                            <Button
                                type="submit"
                                text="Register & Begin Treatment"
                            />
                        </div>

                    </form>
            </div>
        </div>

    )
}

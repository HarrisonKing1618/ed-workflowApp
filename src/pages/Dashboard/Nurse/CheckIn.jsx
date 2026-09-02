import { useState } from "react"
import { addPatient } from "../../../services/patientStorage.js";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/Layout/DashBoardLayout.jsx";
import Input from "../../../components/common/Input"
import Button from "../../../components/common/Button"
import "./CheckIn.css"



export default function CheckIn() {
    const navigate = useNavigate()


    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    // const [gender, setGender] = useState("")
    // const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [chiefComplaint, setChiefComplaint] = useState("");
    const [arrivalMode, setArrivalMode] = useState("")
    const [errors, setErrors] = useState({
        fullName: "",
        phoneNumber: "",
        emergencyContact: "",
        dateOfBirth: "",
        // gender: "",
        // emergencyContactPhone: "",
        chiefComplaint: ""
    })

    async function handleSubmit(e) {
        e.preventDefault()

        const newErrors = {}

        if (!fullName.trim()) {
            newErrors.fullName = "Full Name is Required"
        }
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone Number is Required"
        }
        if (!dateOfBirth.trim()) {
            newErrors.dateOfBirth = "Date of Birth is Required"
        }
        // if (!gender.trim()) {
        //     newErrors.gender = "Gender is Required"
        // }
        if (!chiefComplaint.trim()) {
            newErrors.chiefComplaint = "Reason For Visit is Required"
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Invalid Phone Number"
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        
        setIsLoading(true)

        try {
            const patient = {
            id: `${Date.now()}`,
            fullName: fullName.trim(),
            phoneNumber: phoneNumber.trim(),
            emergencyContact: emergencyContact.trim(),
            // emergencyContactPhone,
            dateOfBirth,
            // gender,
            chiefComplaint,
            arrivalMode,
            status: "waiting for triage",
            priority: null,
            assignedDoctor: null,
            checkedInAt: new Date().toISOString(),
            vitals: {
                temperature: "",
                pulse: "",
                respiratoryRate: "",
                oxygenSaturation: "",
                painScale: "",
            },
            symptoms: "",
            notes: "",
        };

        addPatient(patient)

        await new Promise(resolve =>
            setTimeout(resolve,2000)
           
        );
        

        setFullName("")
        setPhoneNumber("")
        setEmergencyContact("")
        // setEmergencyContactPhone("")
        setDateOfBirth("")
        // setGender("")
        setArrivalMode("")
        setChiefComplaint("")

        navigate("/dashboard/queue")


        } catch (error) {
            console.error("Patient check-in failed",
                error
            )
        }
         finally {

         setIsLoading(false);

        }
        
    }
    return (
        <>
            
                <section className="checkin-options">
                    
                        <button 
                        type="button"
                        className="checkin-option active">
                            <strong>
                                New Patient Registration
                            </strong>
                            <span>
                                Full intake for a first-time or new patient visit 
                            </span>

                        </button>

                        <button
                        type="button"
                        className="checkin-option"
                        onClick={() => navigate("/dashboard/checkin/existing")}>
                            <strong>
                                Existing Patient search
                            </strong>
                            <span>
                                Look up patient by name, DOB, ID
                            </span>
                        </button>

                        <button
                            type="button"
                            className="checkin-option"
                            onClick={() => navigate("/dashboard/checkin/emergency")}
                        >
                            <strong>
                                Emergency Quick Registration
                            </strong>

                            <span>
                                Minimal-data fast-track
                                for critical arrivals
                            </span>
                        </button>
                        
                    

                </section>
                <form className="patient-checkin" onSubmit={handleSubmit}>
                    <Input 
                        label="Full Name *"
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => {setFullName(e.target.value)
                        setErrors((prev) => ({
                            ...prev,
                            fullName: ""
                        }))
                        }}
                        error={errors.fullName}
                    />

                    <Input 
                        label="Phone Number "
                        type="tel"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => {setPhoneNumber(e.target.value)
                        setErrors((prev) => ({
                            ...prev,
                            phoneNumber: ""
                        }))
                        }}
                        error={errors.phoneNumber}
                    />

                    <Input 
                        label="Emergency Contact"
                        type="text"
                        name="emergencyContact"
                        value={emergencyContact}
                        onChange={(e) => {setEmergencyContact(e.target.value)
                        setErrors((prev) => ({
                            ...prev,
                            emergencyContact: ""
                        }))
                        }}
                        error={errors.emergencyContact}
                    />

                    <Input 
                        label="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => {setDateOfBirth(e.target.value)
                        setErrors((prev) => ({
                            ...prev,
                            dateOfBirth: ""
                        }))
                        }}
                        error={errors.dateOfBirth}
                    />


                    {/* <div className="input-group gender">
                        <label htmlFor="gender">Gender</label>

                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value)

                                setErrors((prev) => ({
                                    ...prev,
                                    gender: ""
                                }))
                            }}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>

                        {errors.gender && <p className="error">{errors.gender}</p>}
                        </div> */}

                    {/* <Input 
                        label="Emergency Contact Phone Number"
                        type="tel"
                        name="emergencyContactPhone"
                        value={emergencyContactPhone}
                        onChange={(e) => {setEmergencyContactPhone(e.target.value)
                        setErrors((prev) => ({
                            ...prev,
                            emergencyContactPhone: ""
                        }))
                        }}
                        error={errors.emergencyContactPhone}
                    /> */}

                    <div className="input-group">

                            <label htmlFor="arrivalMode">
                                Arrival Mode
                            </label>

                            <select
                                id="arrivalMode"
                                name="arrivalMode"
                                value={arrivalMode}
                                onChange={(e) => {

                                    setArrivalMode(
                                        e.target.value
                                    );

                                    {errors.arrivalMode && <p className="error">{errors.arrivalMode}</p>};

                                }}
                            >

                                <option value="">
                                    Walk-in / Ambulance / Transfer
                                </option>

                                <option value="walk-in">
                                    Walk-in
                                </option>

                                <option value="ambulance">
                                    Ambulance
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


                    <div className="reason-container">
                        <label htmlFor="chiefComplaint">chief Complaint</label>
                        <textarea
                            id="chiefComplaint"
                            name="chiefComplaint"
                            rows="5"
                            value={chiefComplaint}
                            onChange={(e) => {
                            setChiefComplaint(e.target.value);

                            setErrors((prev) => ({
                                ...prev,
                                chiefComplaint: ""
                                }));
                            }}
                        />

                        {errors.chiefComplaint && (
                            <p className="error">
                                {errors.chiefComplaint}
                            </p>
                        )}
                    </div>
                        
                    <div className="button-container">
                        <Button 
                            type="submit"
                            text={isLoading ? "Checking In in" : "Check In"}
                            disabled={isLoading}
                        />
                    </div>
                    
                </form>
            
        </>
    )
}
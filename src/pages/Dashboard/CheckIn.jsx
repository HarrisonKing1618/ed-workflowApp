import { useState } from "react"
import Input from "../../components/common/Input"
import Button from "../../components/common/Button"
import "./CheckIn.css"

export default function CheckIn() {
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [reasonForVisit, setReasonForVisit] = useState("");
    const [errors, setErrors] = useState({
        fullName: "",
        phoneNumber: "",
        emergencyContact: "",
        dateOfBirth: "",
        gender: "",
        emergencyContactPhone: "",
        reasonForVisit: ""
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
        if (!gender.trim()) {
            newErrors.gender = "Gender is Required"
        }
        if (reasonForVisit.trim()) {
            newErrors.reasonForVisit = "Reason For Visit is Required"
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Invalid Phone Number"
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const patient = {
            fullName,
            phoneNumber,
            emergencyContact,
            emergencyContactPhone,
            dateOfBirth,
            gender,
            reasonForVisit,
        };
        console.log(patient)
        setIsLoading(true)

        try {

        await new Promise(resolve =>
            setTimeout(resolve,2000)
        );
        setFullName("")
        setPhoneNumber("")
        setEmergencyContact("")
        setEmergencyContactPhone("")
        setDateOfBirth("")
        setGender("")
        setReasonForVisit("")


        } finally {

         setIsLoading(false);

        }
        
    }
    return (
        <>
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


                <div className="input-group gender">
                    <label htmlFor="gender">Gender</label>

                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>

    {errors.gender && <p className="error">{errors.gender}</p>}
</div>

                <Input 
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
                />

                <div className="reason-container">
                    <label htmlFor="reasonForVisit">Reason For Visit</label>
                    <textarea
                        id="reasonForVisit"
                        name="reasonForVisit"
                        rows="5"
                        value={reasonForVisit}
                        onChange={(e) => {
                        setReasonForVisit(e.target.value);

                        setErrors((prev) => ({
                            ...prev,
                            reasonForVisit: ""
                            }));
                        }}
                    />

                    {errors.reasonForVisit && (
                        <p className="error">
                            {errors.reasonForVisit}
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
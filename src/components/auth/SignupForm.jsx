import { useState } from "react";
import { registerUser } from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import "./SignupForm.css"


export default function SignupForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [workEmail, setWorkEmail] = useState("")
    const [staffId, setStaffId] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        staffId: "",
        role: "",
        password: "",
        confirmPassword: ""
    })
    async function handleSubmit(e) {
        e.preventDefault()
        const newError = {}

        if (!firstName.trim()) {
            newError.firstName = "Please Enter First Name"
        }
        if (!lastName.trim()) {
            newError.lastName = "Please Enter Last Name"
        }
        if (!workEmail.trim()) {
            newError.workEmail = "Please Enter Email"
        }
        else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(workEmail)) {
                newError.workEmail = "Please Enter a valid email"
            }
        }
        if (!staffId) {
            newError.staffId = "Please Enter Staff Id"
        }
        if (!role) {
            newError.role = "Please select your role"
        }
        if (!password.trim()) {
            newError.password = "Please enter a password"
        }
        if (!confirmPassword.trim()) {
            newError.confirmPassword = "Please confirm password"
        }
        if (password.trim() && confirmPassword.trim() && password !== confirmPassword) {
            newError.confirmPassword = "Passwords don't match"
        }
        if (Object.keys(newError).length > 0) {
            setErrors(newError)
            return
        }
        setErrors({
            firstName: "",
            lastName: "",
            workEmail: "",
            staffId: "",
            role: "",
            password: "",
            confirmPassword: ""
        })
        setIsLoading(true)
        try {
            const data = await registerUser({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                workEmail: workEmail.trim(),
                staffId: staffId.trim(),
                role,
                password,
                confirmPassword,

            })
            navigate("/auth/verify-email", {
                state: {
                    workEmail: workEmail,
                }
            })
        } catch (error) {
              console.error("Registration error:", error)

              setErrors((prev) => ({
                    ...prev,
                    workEmail: error.message || "Registration failed"
              }))
        } finally {
            setIsLoading(false)
        }
            
        
        // setFirstName("")
        // setLastName("")
        // setWorkEmail("")
        // setStaffId("")
        // setRole("")
        // setPassword("")
        // setConfirmPassword("")
       
    }
    return (
        <form onSubmit={handleSubmit} className="form signupForm">
            <Input
                label= "First name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value)
                    setErrors((prev) => ({
                    ...prev,
                    firstName: ""
                    }))
                }}
                error={errors.firstName}
                    
            />

            <Input
                label= "Last name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => {setLastName(e.target.value)
                setErrors((prev) => ({
                    ...prev,
                    lastName: ""
                }))
                }}
                error={errors.lastName}
                    
            />

            <Input
                label="Email"
                type="email"
                name="workEmail"
                value={workEmail}
                onChange={(e) => {setWorkEmail(e.target.value)
                    setErrors((prev) => ({
                        ...prev,
                        workEmail: ""
                    }))
                    }}
                    error={errors.workEmail}
                    
            />

            <Input
                label= "Staff ID"
                type="text"
                name="staffId"
                value={staffId}
                onChange={(e) => {setStaffId(e.target.value)
                setErrors((prev) => ({
                    ...prev,
                    staffId: ""
                }))
                }}
                error={errors.staffId}
        
            />

            <div className="role-container">
                <label htmlFor="roles">Role</label>

                <select
                    id="role"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value)

                        setErrors((prev) => ({
                            ...prev,
                            role: ""
                        }))
                    }}
                >
                    <option value="">Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Administration</option>
                </select>
                {errors.role &&<p className="error">{errors.role}</p>}
            </div>


            <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => { 
                        setPassword(e.target.value)
                        setErrors((prev) => ({
                        ...prev,
                        password: ""
                        }))
                    }}
                    error={errors.password}
            />

            <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { 
                    setConfirmPassword(e.target.value)
                    setErrors((prev) => ({
                    ...prev,
                    confirmPassword: ""
                    }))
                }}
                error={errors.confirmPassword}
            />

            <Button 
                type="submit"
                text={isLoading ? "Creating Account" : "Create Account"}
                disabled={isLoading}
            
            />

        </form>
    )
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({email: ""})
    const [isLoading, setIsLoading]= useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const newErrors = {}

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required"
        }
        else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Please enter a valid email address"
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setErrors({email: ""})
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            navigate("/")
        } 
        catch (error) {
        
        }
    }
   
    return (
        <form onSubmit={handleSubmit} className="form">
           <Input
                   label="Email or Staff ID"
                   type="email"
                   name="email"
                   value={email}
                   onChange={(e) => {setEmail(e.target.value)
                     setErrors((prev) => ({
                       ...prev,
                       email: ""
                     }))
                   }}
                   error={errors.email}
                   
            />

            <Button 
                  type="submit"
                  text={isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                  disabled={isLoading}
            />

        </form>
    )
}
import Input from "../common/Input";
import Button from "../common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/api";

export default function VerifyEmailForm() {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        code: ""
    })
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (!code.trim()) {
            setErrors({code: "Please enter the validation code"})
            return
        }
        if (code.trim().length !== 6) {
            setErrors({code: "Verification code must be 6-digits"})
            return
        }
        setErrors({
            code: ""
        })
        setIsLoading(true)

        try {
           const data =  await verifyEmail(code.trim())
           console.log("Verification Succesful:", data)
           navigate("/login")
        } catch (error) {
             console.error("Verification error:", error);
             setErrors({code: error.message || "Unable to verify email"})

        } finally {
            setIsLoading(false)
        }

    }
    return (
            <form onSubmit={handleSubmit} className="verify-email-form">
                <Input
                label="Verification Code"
                type="text"
                name="code"
                value={code}
                onChange={(e) => {setCode(e.target.value)
                    setErrors((prev) => ({
                        ...prev,
                        code: ""
                    }))
                }}
                error={errors.code}
                
                />
                <Button 
                    type="submit"
                    text={isLoading ? "Verifying Account" : "Verify Account"}
                    disabled={isLoading}
                />
            </form>
           
       
        
    )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../common/Input"
import Button from "../common/Button"

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading]= useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {

        e.preventDefault()
        const newErrors = {}

        if (!password.trim()) {
            newErrors.password = "Please Enter password"  
        }
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters."
            
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Password doesn't match" 
        }
        if (!confirmPassword.trim()) {
            newErrors.password = "Please Confirm Password"  
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setErrors({
            password: "",
            confirmPassword: ""
        })
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            navigate("/")
        } 
        catch (error) {
            console.error(error);
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="form">
            <Input
                label="New Password"
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
             text={isLoading ? "Resetting..." : "Reset Password"}
             disabled={isLoading}
            />
        </form>
    )
}
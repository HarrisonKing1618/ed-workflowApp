import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../data/data";
import { sidebarMenu } from "../../data/sidebarData";
import Input from "../common/Input";
import Button from "../common/Button";
import "./LoginForm.css"



export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] =useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading]= useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}


      // Email validation
      if (!email.trim()) {
      newErrors.email = "Email is required"
    } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address"
        }
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required"
    }

    const user = users.find((user) => user.email === email && user.password === password)
    if (!user) {
      newErrors.password = "Invalid email or password"
    } 
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({
      email: "",
      password: ""
    })
    setIsLoading(true)
    try {
      
      localStorage.setItem("user", JSON.stringify(user));

      const menu = sidebarMenu[user.role]
      const path = menu[0].path

      

      await new Promise((resolve) => setTimeout(resolve, 2000))
      navigate(path)
      
    } finally {
      setIsLoading(false)
    }
      
    //   try {
    //   setIsLoading(true);

    //   const response = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   // Handle the response...
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <form onSubmit={handleSubmit} className="form" >
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
      <Button 
      type="submit"
      text={isLoading ? "Signing in" : "Sign in"}
      disabled={isLoading}/>
    </form>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/api";
import { users } from "../../data/data.js";
import { sidebarMenu } from "../../data/sidebarData.js";
import Input from "../common/Input";
import Button from "../common/Button";
import dashboardRoutes from "../../data/dashboardRoutes.js";
import "./LoginForm.css"




export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] =useState({
    identifier: "",
    password: ""
  })
  const [isLoading, setIsLoading]= useState(false)
  const navigate = useNavigate()

  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   const newErrors = {}


  //     // Email validation
  //     if (!identifier.trim()) {
  //     newErrors.identifier = "Email or Staff Id is required"
  //   } 

  //   // Password validation
  //   if (!password.trim()) {
  //     newErrors.password = "Password is required"
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors)
  //     return
  //   }

  //   // const user = users.find((user) => user.email === email && user.password === password)

  //   const user = users.find(
  //       (user) =>
  //           (user.email === identifier.trim() ||
  //            user.staffId === identifier.trim()) &&
  //           user.password === password
  //   )

  //   if (!user) {
  //     newErrors.password = "Invalid email or password"
  //   } 


  //   // display errors to the page

    

  //   setErrors({
  //     identifier: "",
  //     password: ""
  //   })
  //   setIsLoading(true)


  //   try {
  //     // const data = await loginUser(identifier, password)


  //     console.log("Backend", data)

  //     // On succesful login
  //     // console.log("User:", data.user);
  //     // console.log("Token:", data.token);
  //     // console.log("Redirect:", data.redirectUrl);

      
  //     localStorage.setItem("user", JSON.stringify(data.user));
  //     localStorage.setItem("token", data.token)

  //     // role based dashboard
  //     const role = user.role
  //     const dashboardPath = dashboardRoutes[role]

  //     if (!dashboardPath) {
  //       throw new Error("Invalid user role")
  //     }
  //     navigate(dashboardPath);

  //     // role based Dashboard test frontend
      
  //     const menu = sidebarMenu[user.role]
  //     const path = menu[0].path
  //     await new Promise((resolve) => setTimeout(resolve, 2000))
  //     }

  //    catch (error) {
  //     console.error("Login error:", error)
  //     setErrors({
  //       identifier: "",
  //       password: error.message || "Unable to connect to server"
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
      
  // }
  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validate identifier
    if (!identifier.trim()) {
        newErrors.identifier = "Email or Staff ID is required";
    }

    // Validate password
    if (!password.trim()) {
        newErrors.password = "Password is required";
    }

    // Stop if fields are empty
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    // Find user by email OR staff ID
    const user = users.find(
        (user) =>
            (
                user.email === identifier.trim() ||
                user.staffId === identifier.trim()
            ) &&
            user.password === password
    );

    // User not found
    if (!user) {
        setErrors({
            identifier: "",
            password: "Invalid email/staff ID or password"
        });

        return;
    }

    // Clear errors
    setErrors({
        identifier: "",
        password: ""
    });

    setIsLoading(true);

    try {

        console.log("Logged in user:", user);
        console.log("Role:", user.role);

        // Save logged-in user
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        // Get dashboard based on role
        const role = user.role;

        const dashboardPath = dashboardRoutes[role];

        if (!dashboardPath) {
            throw new Error("Invalid user role");
        }

        console.log("Dashboard:", dashboardPath);

        // Navigate to role dashboard
        navigate(dashboardPath);

    } catch (error) {

        console.error("Login error:", error);

        setErrors({
            identifier: "",
            password:
                error.message ||
                "Unable to login"
        });

    } finally {

        setIsLoading(false);

    }
}

  return (
    <form onSubmit={handleSubmit} className="form" >
      <Input
        label="Email or Staff ID"
        type="text"
        name="identifier"
        value={identifier}
        onChange={(e) => {setIdentifier(e.target.value)
          setErrors((prev) => ({
            ...prev,
            identifier: ""
          }))
        }}
        error={errors.identifier}
        
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


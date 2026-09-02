import "./Header.css"
import Logo from "../common/Logo"
export default function Header({isSidebarOpen, setIsSidebarOpen}) { 
    const user = JSON.parse(localStorage.getItem("user"))
   
    if (!user) {
        return null
    }
    function capitalize(text = "") {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    const role = capitalize(user.role)
    const name = user.firstName
    ? `${capitalize(user.firstName)} ${capitalize(user.lastName || "")}`.trim()
    : ""
    return (
        
        <div className="header">
            <button
                className="hamburger"
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >☰</button>

            <div className="logo">
                
                <Logo />
                <h1>ED.APP</h1>
            </div>
            <h1>Welcome, {role} {name}</h1>
            
        </div>
    )
}
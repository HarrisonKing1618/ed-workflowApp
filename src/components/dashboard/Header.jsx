import "./Header.css"
export default function Header({isSidebarOpen, setIsSidebarOpen}) { 
    const user = JSON.parse(localStorage.getItem("user"))
   
    if (!user) {
        return null
    }
    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    const role = capitalize(user.role)
    const name = capitalize(user.name) 
    return (
        
        <div className="header">
            <button
                className="hamburger"
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >☰</button>

            <div className="logo">
                <div className="box"></div>
                <h1>ED.APP</h1>
            </div>
            <h1>Welcome, {role} {name}</h1>

        </div>
    )
}
import { sidebarMenu } from "../../data/sidebarData"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
import "./Sidebar.css"
export default function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
}) {
    const user = JSON.parse(localStorage.getItem("user")) 
    const menu = sidebarMenu[user.role]
    
    return (
        <div className={
            isSidebarOpen
            ? "sidebar sidebar-open"
            : "sidebar"
            }>
            <ul className="link-container">
                {menu.map((item) => (
                    
                    <li className="box-container" key={item.title}>
                        <div className="box"></div>
                        <NavLink to={item.path} className={({isActive}) => isActive ? "dashboard-link active" : "dashboard-link"}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
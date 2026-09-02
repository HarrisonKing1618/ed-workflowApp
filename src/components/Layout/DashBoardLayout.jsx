import { useState } from "react"
import "./DashboardLayout.css"
import Header from "../dashboard/Header"
import Sidebar from "../dashboard/Sidebar"

export default function DashboardLayout({children}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <main className="dashboard-layout">
            <Header 
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="main-content">
                {children}
            </div>
            
        </main>
    )
}
import CheckIn from "./CheckIn"
import Header from "../../components/dashboard/Header"
import Sidebar from "../../components/dashboard/Sidebar"
import DashboardLayout from "../../components/Layout/DashBoardLayout"


export default function Dashboard() {
    return(
        <DashboardLayout>
            

            <main className="main-content">
                <CheckIn />
            </main>

        </DashboardLayout>
    )
}
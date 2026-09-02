import CheckIn from "./CheckIn"
import DashboardLayout from "../../../components/Layout/DashBoardLayout"


export default function Dashboard() {
    return(
        <DashboardLayout>
            
            <main className="main-content">
                <CheckIn />
            </main>

        </DashboardLayout>
    )
}
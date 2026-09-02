import DashboardLayout from "../../../components/Layout/DashBoardLayout"
import QueueContent from "../../../components/dashboard/QueueContent"
import StatCards from "../../../components/dashboard/StatCard"


export default function NurseDashboard() {
    return(
        <DashboardLayout>
            
            <main className="main-content">
                <StatCards />
                <QueueContent />
            </main>

        </DashboardLayout>
    )
}
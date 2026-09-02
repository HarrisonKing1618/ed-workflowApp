import { nurseDashboardStats } from "../../data/dashboardData";
import "./StatCard.css"

export default function StatCards() {
    return (
        <section className="statistics-grid">
            {nurseDashboardStats.map((stat) => (
                <div className="stat-card" key={stat.title}>
                    <p className="stat-title">
                        {stat.title}
                    </p>
                    <h2 className="stat-value">
                        {stat.value}
                    </h2>
                    <p className="stat-change">
                        {stat.change}
                    </p>
                </div>
            ))}
        </section>
    )
}
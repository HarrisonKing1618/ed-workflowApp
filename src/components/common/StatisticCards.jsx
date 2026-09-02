import "./StatisticCards.css"

export default function StatisticCards({
    name,
    content
}) {
    return (
        <div className="statisticCards">
            <p>{name}</p>
            <h1>{content}</h1>
        </div>
    )
}
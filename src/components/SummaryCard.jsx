function SummaryCard({ title, value }) {
    return (
        <div className="summary-card">
            <h3 style={{ color: "black" }}>{title}</h3>
            <h2 style={{ color: "black" }}>{value}</h2>
        </div>
    );
}

export default SummaryCard;
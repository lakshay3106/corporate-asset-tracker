import SummaryCard from "../components/SummaryCard";

function Dashboard({ assets }) {

    const totalAssets = assets.length;

const availableAssets =
    assets.filter(
        (asset) =>
            asset.status === "Available"
    ).length;

const assignedAssets =
    assets.filter(
        (asset) =>
            asset.status === "Assigned"
    ).length;

const repairAssets =
    assets.filter(
        (asset) =>
            asset.status === "Under Repair"
    ).length;

const stats = [
    {
        title: "Total Assets",
        value: totalAssets
    },
    {
        title: "Available Assets",
        value: availableAssets
    },
    {
        title: "Assigned Assets",
        value: assignedAssets
    },
    {
        title: "Under Repair",
        value: repairAssets
    }
];

    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <div className="dashboard-grid">
    {stats.map((stat) => (
        <SummaryCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
        />
    ))}
</div>
            </div>
        </div>
    );
}

export default Dashboard
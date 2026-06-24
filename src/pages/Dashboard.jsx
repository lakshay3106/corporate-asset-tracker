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
    <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Dashboard
    </h1>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
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
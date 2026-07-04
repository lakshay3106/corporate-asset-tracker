import { FaDesktop } from "react-icons/fa";
function MyDesk({ assets, setAssets }) {

    const assignedAssets =
        assets.filter(
            (asset) =>
                asset.status === "Assigned"
        );


        function handleReturn(assetToReturn) {

    setAssets(
        assets.map((asset) => {

            if (asset.id === assetToReturn.id) {

                return {
                    ...asset,
                    status: "Available"
                };
            }

            return asset;
        })
    );
}


    return (
       <div className="space-y-8">

    <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-800">

    <FaDesktop className="text-blue-600"/>

    My Desk

</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="
    bg-gradient-to-r
    from-purple-50
    to-indigo-50
    rounded-2xl
    shadow-md
    p-6
">

        <p className="text-gray-500">
            Assigned Assets
        </p>

        <h2 className="text-5xl font-bold text-purple-600 mt-3">
            {assignedAssets.length}
        </h2>

    </div>

</div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
            assignedAssets.length === 0 ?

            <div className="bg-white rounded-2xl shadow-md p-10 text-center col-span-full">

    <h2 className="text-2xl font-bold text-gray-700">
         No Assets Assigned
    </h2>

    <p className="text-gray-500 mt-2">
        Request an asset from the Requests page.
    </p>

</div>

            :

            assignedAssets.map((asset) => (

                <div
    className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
    "
                    key={asset.id}
                >

                    <div className="text-5xl mb-4">
    💻
</div>

<h2 className="text-2xl font-bold mb-3">
    {asset.name}
</h2>

<p className="text-gray-500 mb-2">
    Asset ID: #{asset.id}
</p>

<span
    className="
        inline-block
        px-4
        py-2
        rounded-full
        bg-purple-100
        text-purple-700
        font-semibold
        mb-6
    "
>
    Assigned
</span>

<button
    className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        py-3
        rounded-xl
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
    "
    onClick={() => handleReturn(asset)}
>
    Return Asset
</button>

                </div>

            ))
        }

    </div>

</div>
    );
}

export default MyDesk;
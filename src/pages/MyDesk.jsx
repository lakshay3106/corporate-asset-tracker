import "./MyDesk.css";

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
       <div className="mydesk-page">

    <h1>My Desk</h1>

    <div className="mydesk-grid">

        {
            assignedAssets.length === 0 ?

            <p className="empty-message">
                No assets currently assigned.
            </p>

            :

            assignedAssets.map((asset) => (

                <div
                    className="desk-card"
                    key={asset.id}
                >

                    <h3>💻 {asset.name}</h3>

                    <p>
                        <strong>Asset ID:</strong> {asset.id}
                    </p>

                    <p>
                        <strong>Status:</strong> Assigned
                    </p>

                    <button
                        onClick={() =>
                            handleReturn(asset)
                        }
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
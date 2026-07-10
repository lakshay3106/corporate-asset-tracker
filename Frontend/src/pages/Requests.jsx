import {
    FaClipboardList,
    FaLaptop
} from "react-icons/fa";

function Requests({ assets, setAssets, requests, setRequests }) {

   
    async function handleRequest(asset) {

    try {

        const response = await fetch(
            "http://localhost:5000/requests",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    employeeName: "Lakshay",
                    employeeId: "EMP101",

                    assetName: asset.name,
                    assetId: asset._id

                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create request");
        }

        const newRequest = await response.json();

        setRequests(prev =>
            [...prev, newRequest]
        );

    }
    catch(error){

        console.error(error);

    }

}


    const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
);


   async function handleApprove(request) {

    try {

        const response = await fetch(
            `http://localhost:5000/requests/${request._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Approved"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to approve request");
        }

        const updatedRequest = await response.json();

        // Update Requests
        setRequests(prev =>
            prev.map(req =>
                req._id === updatedRequest._id
                    ? updatedRequest
                    : req
            )
        );

        // Refresh Assets
        const assetResponse = await fetch("http://localhost:5000/assets");
        const updatedAssets = await assetResponse.json();

        setAssets(updatedAssets);

    }
    catch(error){

        console.error(error);

    }

}
   async function handleReject(request) {

    try {

        const response = await fetch(
            `http://localhost:5000/requests/${request._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Rejected"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to reject request");
        }

        const updatedRequest = await response.json();

        setRequests(prev =>
            prev.map(req =>
                req._id === updatedRequest._id
                    ? updatedRequest
                    : req
            )
        );

    } catch (error) {

        console.error(error);

    }

}


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-gray-500">
            Total Requests
        </p>

        <h2 className="text-4xl font-bold mt-2">
            {requests.length}
        </h2>
    </div>

    <div className="bg-yellow-50 rounded-2xl shadow-md p-6">
        <p className="text-gray-500">
            Pending
        </p>

        <h2 className="text-4xl font-bold text-yellow-600 mt-2">
            {pendingRequests.length}
        </h2>
    </div>

    <div className="bg-green-50 rounded-2xl shadow-md p-6">
        <p className="text-gray-500">
            Approved
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
            {
                requests.filter(
                    r => r.status === "Approved"
                ).length
            }
        </h2>
    </div>

</div>
            <h1 className="text-4xl font-bold text-slate-800">
    Requests Management
</h1>

<h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">

    <FaLaptop className="text-blue-600"/>

    Available Assets

</h2>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Asset Name</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {assets.map((asset) => {

                            const alreadyRequested =
                                requests.some(
                                    (request) =>
                                        request.assetId === asset._id &&
                                        request.status === "Pending"
                                );

                            return (
                                <tr
    key={asset._id}
    className="
        border-b
        hover:bg-blue-50
        transition-all
        duration-300
    "
>
                                    
    <td className="p-4 font-semibold text-slate-700">
    #{asset._id.slice(-6)}
</td>


                                    <td className="p-4 font-medium text-slate-800">
    {asset.name}
</td>
                                    <td className="p-4">
                                        <span
                                            className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold

        ${asset.status === "Available"
                                                    ? "bg-green-100 text-green-700"
                                                    : asset.status === "Assigned"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-orange-100 text-orange-700"
                                                }
    `}
                                        >
                                            {asset.status}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        {
                                            asset.status !== "Available"
                                                ? <span className="
    bg-gray-200
    text-gray-700
    px-3
    py-1
    rounded-full
    text-sm
">
                                                    Unavailable
                                                </span>

                                                : alreadyRequested
                                                    ? <span className="
    bg-green-100
    text-green-700
    px-3
    py-1
    rounded-full
    text-sm
">
                                                        Requested ✓
                                                    </span>

                                                    : (
                                                        <button className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-blue-700
        transition
    "
                                                            onClick={() =>
                                                                handleRequest(asset)
                                                            }
                                                        >
                                                            Request
                                                        </button>
                                                    )
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">

    <FaClipboardList className="text-blue-600"/>

    Pending Requests

</h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <table className="w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-left">Employee</th>
                            <th className="p-4 text-left">Asset ID</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingRequests.map((request) => {

                            return (
                                <tr
    key={request._id}
    className="
        border-b
        hover:bg-blue-50
        transition-all
        duration-300
    "
>
                                    <td className="p-4">{request.employeeName}</td>
                                    <td className="p-4">

    <div className="font-semibold">
        #{request.assetId}
    </div>

    <div className="text-sm text-gray-500">
        {
            assets.find(
                asset => asset._id === request.assetId
            )?.name
        }
    </div>

</td>
                                    <td className="p-4">
                                        <span className="pending-badge">
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="p-4">  {new Date(request.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">

                                        <button
                                            className="
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
px-5
py-2
rounded-lg
transition-all
duration-300
hover:scale-105
"
                                            onClick={() =>
                                                handleApprove(request)
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            
   className="
bg-red-600
hover:bg-red-700
text-white
font-semibold
px-5
py-2
rounded-lg
transition-all
duration-300
hover:scale-105
"
                                            onClick={() =>
                                                handleReject(request)
                                            }
                                        >
                                            Reject
                                        </button>

                                    </td>
                                </tr>

                            );

                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Requests;
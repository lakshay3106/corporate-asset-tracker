import "./Requests.css";

function Requests({assets,setAssets,requests,setRequests}) {

    function handleRequest(asset) {

    const newRequest = {
        id: Date.now(),
        employeeName: "Lakshay",
        assetId: asset.id,
        requestStatus: "Pending",
        requestDate: new Date().toLocaleDateString()
    };

    setRequests([
        ...requests,
        newRequest
    ]);
}
const pendingRequests=requests.filter((request)=>
            request.requestStatus==="Pending");


function handleApprove(request) {
       setRequests( requests.map((req)=>{
            if(req.id===request.id){
                return{
                    ...req,
                    requestStatus:"Approved"
                };
            
            }
            return req;
        })
    );

    setAssets(
        assets.map((asset)=>{
            if(asset.id===request.assetId){
                return{
                    ...asset,
                    status:"Assigned"
                };
            }
            return asset;
        })
    )

}

function handleReject(request) {
        setRequests(
            requests.map((req)=>{
                if(req.id===request.id){
                    return{
                        ...req,
                        requestStatus:"Rejected"
                    };
                }

                return req;
            })
        )
}


   return (
    <div className="requests-page">
        <h2>Available Assets</h2>

        <table className="requests-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Asset Name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

<tbody>
    {assets.map((asset) => {

        const alreadyRequested =
            requests.some(
                (request) =>
                    request.assetId === asset.id &&
                    request.requestStatus === "Pending"
            );

        return (
            <tr key={asset.id}>
                <td>{asset.id}</td>

                <td>{asset.name}</td>

                 <span className={`status ${asset.status.replace(" ", "-")}`}>
                        {asset.status}
    </span>

                <td>
                    {
                        asset.status !== "Available"
                            ? <span className="unavailable-badge">
    Unavailable
</span>

                            : alreadyRequested
                            ? <span className="requested-badge">
    Requested ✓
</span>

                            : (
                                <button
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

    <h2>Pending Requests</h2>

<table className="requests-table">
    <thead>
        <tr>
            <th>Employee</th>
            <th>Asset ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
    {pendingRequests.map((request)=>{
        
          return(
            <tr key={request.id}>
               <td>{request.employeeName}</td> 
            <td>{request.assetId}</td>
           <td>
    <span className="pending-badge">
        {request.requestStatus}
    </span>
</td>
          <td>  {request.requestDate}</td>
        <td><button
    onClick={() =>
        handleApprove(request)
    }
>
    Approve
</button>

   <button
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
);
}

export default Requests;
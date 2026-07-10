const Request = require("../models/Request");
const Asset = require("../models/Asset");


const getRequests = async (req, res) => {

    try {

        const requests = await Request.find();

        res.status(200).json(requests);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

const addRequest=async (req,res)=>{
    try{
        if (
    !req.body.employeeName?.trim() ||
    !req.body.employeeId?.trim() ||
    !req.body.assetName?.trim() ||
    !req.body.assetId?.trim()
) {
    return res.status(400).json({
        message: "All fields are required."
    });
}

 const asset = await Asset.findById(req.body.assetId);

        if (!asset) {
            return res.status(404).json({
                message: "Asset not found."
            });
        } 

if (asset.status !== "Available") {
    return res.status(400).json({
        message: "Asset is not available."
    });
}

const pendingRequest = await Request.findOne({
    assetId: req.body.assetId,
    status: "Pending"
});

if (pendingRequest) {
    return res.status(400).json({
        message: "A pending request already exists for this asset."
    });
}

const newRequest = await Request.create({
    employeeName: req.body.employeeName,
    employeeId: req.body.employeeId,
    assetName: req.body.assetName,
    assetId: req.body.assetId
});

res.status(201).json(newRequest);

    }

      catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
}

const updateRequest = async (req, res) => {
    try {

        const { status } = req.body;

        // Validate Status
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status."
            });
        }

        // Find Request
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found."
            });
        }

        // Already Processed
        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "Request has already been processed."
            });
        }

        // Update Request Status
        request.status = status;
        await request.save();

        // If Approved, Update Asset
        if (status === "Approved") {

            const asset = await Asset.findById(request.assetId);

            if (asset) {

                asset.status = "Assigned";
                asset.assignedTo = request.employeeName;
                asset.assignedToId = request.employeeId;

                await asset.save();

            }

        }

        res.status(200).json(request);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getRequests,
    addRequest,
    updateRequest
};


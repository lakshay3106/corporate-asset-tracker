const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["Available", "Assigned", "Under Repair"],
        required: true
    },
    
    assignedTo: {
    type: String,
    default: ""
},

assignedToId: {
    type: String,
    default: ""
}
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
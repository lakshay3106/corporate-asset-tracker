const express = require("express");
const cors=require("cors");
const assetRoutes = require("./routes/assetRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Corporate Asset Tracker Backend 🚀");
});

// Asset Routes
app.use("/assets", assetRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require("express");
const cors=require("cors");
const connectDB=require("./config/db")

const dotenv = require("dotenv");
const assetRoutes = require("./routes/assetRoutes");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();
connectDB();
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
app.use("/requests", requestRoutes);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


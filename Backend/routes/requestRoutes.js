const express = require("express");
const router = express.Router();

const {
    getRequests,
    addRequest,
    updateRequest
} = require("../controllers/requestController");

router.get("/", getRequests);
router.post("/", addRequest);
router.put("/:id", updateRequest);

module.exports = router;
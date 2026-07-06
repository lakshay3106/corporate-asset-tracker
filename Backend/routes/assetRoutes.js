const express = require("express");
const router = express.Router();

const { getAssets,addAsset,updateAsset,deleteAsset
 } = require("../controllers/assetController");

router.get("/", getAssets);
router.post("/",addAsset);
router.put("/:id",updateAsset);
router.delete("/:id",deleteAsset);

module.exports = router;
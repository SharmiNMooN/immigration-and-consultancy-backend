const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service");
const { verifyJWT } = require("../jwt");

router.post("/", verifyJWT, serviceController.createService);
router.get("/", serviceController.geServices);
router.get("/:serviceId", serviceController.getService);

module.exports = router;

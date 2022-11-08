const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { verifyJWT } = require("../jwt");

router.post("/", verifyJWT, reviewController.createReview);

module.exports = router;

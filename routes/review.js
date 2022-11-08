const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { verifyJWT } = require("../jwt");

router.post("/", reviewController.createReview);
router.get(
  "/get-review-by-service/:serviceId",
  reviewController.getReviewByService
);
router.get(
  "/get-review-by-user/:userId",
  verifyJWT,
  reviewController.getReviewByUser
);

router.patch(
  "/update-review/:reviewId",
  verifyJWT,
  reviewController.updateReview
);

router.delete("/delete-review", verifyJWT, reviewController.deleteReview);

module.exports = router;

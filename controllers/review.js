const reviewModel = require("../models/review");
const userModel = require("../models/user");

module.exports = {
  createReview: async (req, res) => {
    try {
      const payload = req.body;

      const user = await userModel.findOne({ _id: req.decoded.id });

      payload.reviewerId = user._id;
      payload.reviewerName = user.name;
      payload.reviewerImage = user.image;
      payload.reviewerEmail = user.email;

      const result = await reviewModel.create(payload);
      return res.status(201).send({
        success: true,
        message: "Review created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getReviewByUser: async (req, res) => {
    try {
      const result = await reviewModel.find({ reviewerId: req.decoded.id });
      return res.status(200).send({
        success: true,
        message: "Review fetched successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getReviewByService: async (req, res) => {
    try {
      const { serviceId } = req.params;

      const result = await reviewModel.find({ serviceId: serviceId });
      return res.status(200).send({
        success: true,
        message: "Review fetched successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  updateReview: async (req, res) => {
    try {
      const { rating, description } = req.body;
      const { reviewId } = req.params;

      const review = await reviewModel.findOne({ _id: reviewId });
      if (!review) {
        return res.status(400).send({
          success: false,
          message: "Review not found, invalid review ID",
        });
      }

      const paylaod = {};
      if (rating) {
        paylaod.rating = rating;
      }
      if (description) {
        paylaod.description = description;
      }

      const updatedReview = await reviewModel.findOneAndUpdate(
        { _id: review._id },
        paylaod,
        {
          new: true,
        }
      );
      return res.status(200).send({
        success: true,
        message: "Review fetched successfully",
        data: updatedReview,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { reviewId, reviewerId } = req.body;

      if (!reviewId || !reviewerId) {
        return res.status(400).send({
          success: false,
          message: "Reviewer and Revier Id required",
        });
      }
      const review = await reviewModel.findOne({
        _id: reviewId,
        reviewerId: reviewerId,
      });
      if (!review) {
        return res.status(400).send({
          success: false,
          message: "Review not found, invalid review ID",
        });
      }

      const deleted = await reviewModel.findOneAndRemove({
        _id: review._id,
      });
      return res.status(200).send({
        success: true,
        message: "Review fetched successfully",
        data: deleted,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};

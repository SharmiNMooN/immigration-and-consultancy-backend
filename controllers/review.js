const reviewModel = require("../models/review");

module.exports = {
  createReview: async (req, res) => {
    try {
      const payload = req.body;

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
};

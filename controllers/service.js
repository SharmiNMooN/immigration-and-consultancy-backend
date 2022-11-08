const serviceModel = require("../models/service");
const reviewModel = require("../models/review");

module.exports = {
  createService: async (req, res) => {
    try {
      const payload = req.body;

      const result = await serviceModel.create(payload);
      return res.status(201).send({
        success: true,
        message: "Service created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  geServices: async (req, res) => {
    try {
      const { page = 1, limit = 3 } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const result = await serviceModel.find().skip(skip).limit(Number(limit));
      return res.status(200).send({
        success: true,
        message: "Service list",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },

  getService: async (req, res) => {
    try {
      const { serviceId } = req.params;

      const service = await serviceModel.findOne({ _id: serviceId });
      const reviews = await reviewModel.find({ serviceId });
      return res.status(200).send({
        success: true,
        message: "Service details",
        data: { service, reviews },
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};

const serviceModel = require("../models/service");

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
};

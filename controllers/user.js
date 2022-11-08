const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const payload = req.body;

      if (!payload.name || !payload.email) {
        return res.status(400).send({
          success: false,
          message: "validation error: Name and Email are required ",
        });
      }
      //find out user using email in databse
      const user = await userModel.findOne({
        email: payload.email,
      });

      //if find user from databse then  throw a bad req user already regiserd with email
      if (user) {
        return res.status(400).send({
          success: false,
          message: "user already registerd",
        });
      }
      const result = await userModel.create(payload);
      return res.status(201).send({
        success: true,
        message: "User registered succesfully",
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

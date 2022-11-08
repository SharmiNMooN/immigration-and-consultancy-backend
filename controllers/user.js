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

  loginUser: async (req, res) => {
    try {
      const payload = req.body;

      if (!payload.email) {
        return res.status(400).send({
          success: false,
          message: "validation error: Email is required ",
        });
      }

      //find out user using email in databse
      const user = await userModel.findOne({
        email: payload.email,
      });

      if (!user) {
        return res.status(400).send({
          success: false,
          message: "user not registered",
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2d",
        }
      );
      return res.status(200).send({
        success: true,
        message: "User logged in succesfully",
        data: { user, token },
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};

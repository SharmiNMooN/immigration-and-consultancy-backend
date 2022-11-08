const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");

const userRoutes = require("./routes/user");
const serviceRoutes = require("./routes/service");
const reviewRoutes = require("./routes/review");
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

connectDB()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/users", userRoutes);
app.use("/services", serviceRoutes);
app.use("/reviews", reviewRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

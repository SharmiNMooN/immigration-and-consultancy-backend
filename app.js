const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db.js");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

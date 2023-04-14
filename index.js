const http = require("http");
const path = require("path");
const express = require("express");
const corsOptions = require("./config/corsOptions");

const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();
const cors = require("cors");

const PORT = process.env.PORT || 3500;
app.use(express.static(path.resolve(__dirname, "./frontEnd/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontEnd/build", "index.html"));
});

app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "true");
});

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/resetPassword", require("./routes/resetPassword"));
app.use("/updatePassword", require("./routes/updatePassword"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

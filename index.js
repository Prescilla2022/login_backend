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

const PORT = process.env.PORT || 10000;
app.use(express.static(path.resolve(__dirname, "./frontEnd/build")));
// Step 2:
app.get("/",  (req, res)=> {
  res.send("server running");
});

app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));
app.get((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
});

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/resetPassword", require("./routes/resetPassword"));
app.use("/updatePassword", require("./routes/updatePassword"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

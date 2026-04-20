const express = require("express");
const cors = require("cors");
const citiesRoute = require("./routes/cities");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));


app.use("/api/cities", citiesRoute);
app.use("/api/hotels", require("./routes/hotels"));

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

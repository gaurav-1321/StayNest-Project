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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
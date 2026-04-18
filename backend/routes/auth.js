const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// REGISTER
router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkresult = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (checkresult.rows.length > 0) {
      return res.status(400).json({
        msg: "Email already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email,password) VALUES ($1, $2)",
      [email, hash]
    );

    res.status(201).json({
      msg: "Registered Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const email=req.body.email;
  const password=req.body.password;

  try {
    const checkresult = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (checkresult.rows.length === 0) {
      return res.status(400).json({
        msg: "Email not found"
      });
    }

    const user = checkresult.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        msg: "Wrong Password"
      });
    }

    res.status(200).json({
      msg: "Login Successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Error"
    });
  }
});

module.exports = router;

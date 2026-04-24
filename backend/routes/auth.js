const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);


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
  console.log("REGISTER ERROR:", err.message); 
  res.status(500).json({
    msg: "Server Error",
    error: err.message
  });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkresult = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (checkresult.rows.length === 0) {
      return res.status(400).json({
        message: "Email not found",
      });
    }

    const user = checkresult.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// ================= GOOGLE LOGIN / SIGNUP =================
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "426982018132-9sjqbjknrfim3e3taeu1fq7ph3atfe2j.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, null]
      );
    }

    const jwtToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "Google Login Successful",
      token: jwtToken,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Google Login Failed",
      error: error.message,
    });
  }
});


module.exports = router;

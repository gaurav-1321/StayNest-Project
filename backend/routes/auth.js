const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

if (!process.env.JWT_SECRET || !process.env.CLIENT_ID) {
  throw new Error("Missing environment variables");
}

const client = new OAuth2Client(process.env.CLIENT_ID || "426982018132-9sjqbjknrfim3e3taeu1fq7ph3atfe2j.apps.googleusercontent.com");


//  REGISTER 
router.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    email = email.toLowerCase();

    if (password.length < 10) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hash]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registered Successfully",
      token,
      user: {
        id: newUser.rows[0].id,
        email,
      },
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    email = email.toLowerCase();

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Email not found",
      });
    }

    const user = result.rows[0];

    if (!user.password) {
      return res.status(400).json({
        message: "Use Google login for this account",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
});


//GOOGLE LOGIN / SIGNUP
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID || "426982018132-9sjqbjknrfim3e3taeu1fq7ph3atfe2j.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase();

    let user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    //  Create user 
    if (user.rows.length === 0) {
      const newUser = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, null]
      );
      user = newUser;
    }

    const dbUser = user.rows[0];

    const jwtToken = jwt.sign(
      { id: dbUser.id, email: dbUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Google Login Successful",
      token: jwtToken,
      user: {
        id: dbUser.id,
        email: dbUser.email,
      },
    });

  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error.message);
    res.status(500).json({
      message: "Google Login Failed",
    });
  }
});


module.exports = router;

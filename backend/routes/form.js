const router = require("express").Router();
const pool = require("../db");

// POST listing
router.post("/", async (req, res) => {
  try {
    const { name, location, price, guests, description, images } = req.body;

    if (!name || !location || !price || !guests) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO listings (name, location, price, guests, description, images)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        location,
        price,
        guests,
        description,
        JSON.stringify(images || [])
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



// GET listings

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM listings ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

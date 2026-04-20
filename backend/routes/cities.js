const router = require("express").Router();

// GET /api/citites
router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.log("Cities API error:", err);
    return res.status(500).json({ error: "Failed to fetch cities" });
  }
});

module.exports = router;

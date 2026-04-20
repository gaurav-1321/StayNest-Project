const router = require("express").Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          engine: "google_hotels",
          q,
          check_in_date: "2026-04-25",
          check_out_date: "2026-04-27",
          adults: 2,
          currency: "INR",
          gl: "in",
          hl: "en",
          api_key: process.env.HOTEL_API,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

module.exports = router;

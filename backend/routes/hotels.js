const router = require("express").Router();
const axios = require("axios");

// GET /api/hotels/search?q=dehradun
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Query parameter 'q' is required",
      });
    }

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_hotels",
        q,
        check_in_date: "2026-04-28",
        check_out_date: "2026-04-29",
        adults: 2,
        currency: "INR",
        gl: "in",
        hl: "en",
        api_key: process.env.SERPAPI_KEY || "c23fb0823ba5f1e621481c57d443384e580bc305dd233fa63a5421bd90f4b539", 
      },
    });

    const hotels =
      response.data.hotels_results ||
      response.data.properties ||
      [];

    return res.json({
      success: true,
      query: q,
      total: hotels.length,
      hotels,
    });

  } catch (error) {
    console.log("HOTEL API ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch hotels",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;

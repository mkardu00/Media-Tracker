const express = require("express");
const { authenticateToken } = require("../controllers/authMiddleware");
const { pool } = require("../config/db");

const router = express.Router();

// Ruta za dohvaćanje korisničkih podataka
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    console.log("ID", userId);
    console.log("req.user", req.user);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

module.exports = router;

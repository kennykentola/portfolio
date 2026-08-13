const express = require("express");
const { createAdminToken, verifyAdminToken } = require("../utils/adminToken");

const router = express.Router();

const getTokenSecret = () => process.env.ADMIN_TOKEN_SECRET || process.env.EMAIL_PASS;

router.post("/login", (req, res) => {
  const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }

  const secret = getTokenSecret();
  if (!secret) {
    return res.status(500).json({ success: false, message: "Admin token secret is not configured." });
  }

  const token = createAdminToken({ username }, secret);
  return res.json({ success: true, token });
});

router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const secret = getTokenSecret();
  const payload = verifyAdminToken(token, secret);

  if (!payload) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  return res.json({ success: true, user: { username: payload.username } });
});

module.exports = router;

const express = require("express");
const GraphicDesign = require("../models/GraphicDesign");
const { verifyAdminToken } = require("../utils/adminToken");

const router = express.Router();

const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const secret = process.env.ADMIN_TOKEN_SECRET || process.env.EMAIL_PASS;
  const payload = verifyAdminToken(token, secret);

  if (!payload) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  req.admin = payload;
  next();
};

router.get("/", async (_req, res) => {
  try {
    const designs = await GraphicDesign.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, designs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch graphic designs" });
  }
});

router.get("/all", requireAdmin, async (_req, res) => {
  try {
    const designs = await GraphicDesign.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, designs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch graphic designs" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const { imageUrl, category, altText, order, published } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image URL is required." });
    }

    const design = await GraphicDesign.create({
      imageUrl,
      category: category || "Flyers",
      altText: altText || "",
      order: order ?? 0,
      published: published !== undefined ? published : true,
    });

    res.status(201).json({ success: true, design });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create graphic design" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const design = await GraphicDesign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!design) return res.status(404).json({ success: false, message: "Design not found" });
    res.json({ success: true, design });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update graphic design" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const design = await GraphicDesign.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ success: false, message: "Design not found" });
    res.json({ success: true, message: "Design deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete graphic design" });
  }
});

module.exports = router;

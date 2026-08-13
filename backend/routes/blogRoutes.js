const express = require("express");
const BlogPost = require("../models/BlogPost");
const { verifyAdminToken } = require("../utils/adminToken");

const router = express.Router();

// ── Auth middleware ───────────────────────────────────────────────────────────
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

// ── GET /api/blog — public (fetch all published posts) ──────────────────────
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
  }
});

// ── GET /api/blog/all — admin only (fetch all including drafts) ─────────────
router.get("/all", requireAdmin, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
  }
});

// ── GET /api/blog/:slug — public (fetch single post) ────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } }, // Increment views automatically
      { new: true }
    );
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blog post" });
  }
});

// ── POST /api/blog — admin only ──────────────────────────────────────────────
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, slug, content, excerpt, coverImage, tags, published } = req.body;
    
    // Auto-generate slug if not provided
    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const post = await BlogPost.create({
      title,
      slug: generatedSlug,
      content,
      excerpt,
      coverImage,
      tags: Array.isArray(tags) ? tags : [],
      published: published !== undefined ? published : true,
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "A post with this slug already exists" });
    }
    res.status(500).json({ success: false, message: "Failed to create blog post" });
  }
});

// ── PUT /api/blog/:id — admin only ───────────────────────────────────────────
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update blog post" });
  }
});

// ── DELETE /api/blog/:id — admin only ────────────────────────────────────────
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete blog post" });
  }
});

module.exports = router;

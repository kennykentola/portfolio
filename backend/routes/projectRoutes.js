const express = require("express");
const Project = require("../models/Project");
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

// ── GET /api/projects — public ────────────────────────────────────────────────
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch projects" });
  }
});

// ── POST /api/projects — admin only ──────────────────────────────────────────
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, description, imageUrl, liveUrl, githubUrl, category, techStack, featured, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }

    const project = await Project.create({
      title,
      description,
      imageUrl: imageUrl || "",
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      category: category || "Web Dev",
      techStack: Array.isArray(techStack) ? techStack : [],
      featured: !!featured,
      order: order || 0,
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create project" });
  }
});

// ── PUT /api/projects/:id — admin only ───────────────────────────────────────
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update project" });
  }
});

// ── DELETE /api/projects/:id — admin only ────────────────────────────────────
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete project" });
  }
});

module.exports = router;

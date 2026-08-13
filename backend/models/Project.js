const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Web Dev", "Design", "Branding", "Tool", "Other"],
      default: "Web Dev",
    },
    techStack: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }, // for custom sort order
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

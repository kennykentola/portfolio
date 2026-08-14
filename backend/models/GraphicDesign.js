const mongoose = require("mongoose");

const graphicDesignSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Flyers", "Logo Design", "Brand Identity Design"],
      default: "Flyers",
    },
    altText: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GraphicDesign", graphicDesignSchema);

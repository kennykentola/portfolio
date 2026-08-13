const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      default: "General Inquiry",
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    contactMethod: {
      type: String,
      default: "Email",
      trim: true,
    },
    referral: {
      type: String,
      default: null,
      trim: true,
    },
    appointmentDate: {
      type: String,
      default: null,
    },
    appointmentTime: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);

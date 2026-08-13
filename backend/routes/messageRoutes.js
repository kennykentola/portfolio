const express = require("express");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");
const { verifyAdminToken } = require("../utils/adminToken");

const router = express.Router();

const normalizeText = (value, fallback = "") =>
  typeof value === "string" ? value.trim() : fallback;

const normalizeOptional = (value) => {
  const text = normalizeText(value, "");
  return text.length > 0 ? text : null;
};

const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const getTokenSecret = () => process.env.ADMIN_TOKEN_SECRET || process.env.EMAIL_PASS;

const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const payload = verifyAdminToken(token, getTokenSecret());

  if (!payload) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  req.adminUser = payload;
  return next();
};

router.get("/", requireAdmin, async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
});

router.post("/", async (req, res) => {
  const name = normalizeText(req.body.name);
  const email = normalizeText(req.body.email);
  const subject = normalizeText(req.body.subject, "General Inquiry");
  const message = normalizeText(req.body.message);
  const contactMethod = normalizeText(req.body.contactMethod, "Email");
  const referral = normalizeOptional(req.body.referral);
  const appointmentDate = normalizeOptional(req.body.appointmentDate);
  const appointmentTime = normalizeOptional(req.body.appointmentTime);

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  try {
    const savedMessage = await Message.create({
      name,
      email,
      subject,
      message,
      contactMethod,
      referral,
      appointmentDate,
      appointmentTime,
    });

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\nPreferred Contact Method: ${contactMethod}\nReferral: ${referral || "Not provided"}\nAppointment Date: ${appointmentDate || "Not Scheduled"}\nAppointment Time: ${appointmentTime || "Not Scheduled"}`,
        replyTo: email,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      id: savedMessage._id,
      message: "Message saved successfully.",
    });
  } catch (error) {
    console.error("Save message error:", error);
    res.status(500).json({ success: false, message: "Failed to save the message." });
  }
});

module.exports = router;

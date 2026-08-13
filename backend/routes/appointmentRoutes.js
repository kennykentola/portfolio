const express = require("express");
const nodemailer = require("nodemailer");
const Appointment = require("../models/Appointment");

const router = express.Router();

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

router.post("/book", async (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    const appointment = await Appointment.create({
      name,
      email,
      date,
      time,
    });

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Appointment Confirmation",
        text: `Hello ${name},\n\nYour appointment is confirmed for ${date} at ${time}.\n\nBest regards,\nYour Team`,
      });
    } catch (emailError) {
      console.error("Appointment email failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      id: appointment._id,
      message: "Appointment booked successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error while booking appointment." });
  }
});

module.exports = router;

const Message = require("../../models/Message");

const contactController = async (req, res) => {
  const { name, email, subject, message, contactMethod, referral, appointmentDate, appointmentTime } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required." });
  }

  try {
    const savedMessage = await Message.create({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      contactMethod: contactMethod || "Email",
      referral: referral || null,
      appointmentDate: appointmentDate || null,
      appointmentTime: appointmentTime || null,
    });

    res.status(201).json({
      success: true,
      id: savedMessage._id,
      message: "Message saved successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = contactController;

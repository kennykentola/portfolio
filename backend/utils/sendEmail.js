

const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (formData) => {
  try {
    if (!formData || !formData.email || !formData.message) {
      throw new Error("Missing required fields: email or message");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, 
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"${formData.name}" <${formData.email}>`,
      to: "peterkehindeademola9@gmail.com", 
      subject: `New Contact Message from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Message: ${formData.message}
        Preferred Contact Method: ${formData.contactMethod}
        Referral: ${formData.referral}
        Appointment Date: ${formData.appointmentDate || "Not Scheduled"}
        Appointment Time: ${formData.appointmentTime || "Not Scheduled"}
      `,
      replyTo: formData.email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Email sending failed:", error); // <-- This will show the actual error
    return { success: false, message: "Failed to send email." };
  }
};

module.exports = sendEmail;

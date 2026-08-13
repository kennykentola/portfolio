import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Contact.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";

const initialFormData = {
  name: "",
  email: "",
  subject: "General Inquiry",
  message: "",
  contactMethod: "Email",
  referral: "",
  appointmentDate: "",
  appointmentTime: "",
  whatsappNumber: "",
};

const Contact = () => {
  const API_BASE_URL = getApiBaseUrl();
  const [formData, setFormData] = useState(initialFormData);

  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "whatsappNumber" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info("Sending message...");
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save the message.");
      }
  
      toast.success("Message sent successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div id="contact" className="contact-container">
      <h2>Contact Me</h2>
      <p className="feelfree">Feel free to reach out for inquiries, collaborations, or project discussions.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <select name="subject" value={formData.subject} onChange={handleChange}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Freelance Work">Freelance Work</option>
          </select>
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
  <label>Preferred Contact Method</label>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="contactMethod"
        value="Email"
        checked={formData.contactMethod === "Email"}
        onChange={handleChange}
      /> 
      Email
    </label>
    
    <label>
      <input
        type="radio"
        name="contactMethod"
        value="WhatsApp"
        checked={formData.contactMethod === "WhatsApp"}
        onChange={handleChange}
      /> 
      WhatsApp
    </label>

    <label>
      <input
        type="radio"
        name="contactMethod"
        value="Phone Call"
        checked={formData.contactMethod === "Phone Call"}
        onChange={handleChange}
      /> 
      Phone Call
    </label>
  </div>

  {/* Show phone number input if WhatsApp is selected */}
  {formData.contactMethod === "WhatsApp" && (
    <div className="whatsapp-number">
      <label>WhatsApp Number:</label>
      <input
        type="tel"
        name="whatsappNumber"
        value={formData.whatsappNumber || ""}
        onChange={handleChange}
        placeholder="Enter your WhatsApp number"
        required
      />
    </div>
  )}
</div>


        <div className="form-group">
          <label>How did you hear about me?</label>
          <input type="text" name="referral" value={formData.referral} onChange={handleChange} />
        </div>

        {/* Appointment Booking Section */}
        <div className="form-group">
          <label>Schedule an Appointment (Optional)</label>
          <label htmlFor="appointmentDate">Date</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
          <label htmlFor="appointmentTime">Time</label>
          <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} />
        </div>

        <button type="submit" className="send-btn" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </button>

        {isLoading && <p>Sending your message...</p>}
      </form>

      {/* Contact Details */}
      <div className="contact-info-section">
        <h3>Contact Information</h3>
        <p>Email: <a href="mailto:peterkehindeademola9@gmail.com">peterkehindeademola9@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/kennykentola" target="_blank" rel="noopener noreferrer">kennykentola</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/ademola-peter-kehinde-44650a2b9" target="_blank" rel="noopener noreferrer">ademola-peter-kehinde</a></p>
      </div>
    </div>
  );
};

export default Contact;


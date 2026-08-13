import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebook, FaWhatsapp, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Kennykentola</h3>
          <p>Designing modern websites, graphics, and digital experiences.</p>
        </div>

        <div className="footer-section">
          <h4>LOCATION</h4>
          <p>
            <FaMapMarkerAlt style={{ color: "white", marginRight: "8px" }} />
            Elebu, Moniya, Ibadan, Oyo NG
          </p>

          <iframe
            title="Google Map - Elebu, Moniya, Ibadan, Oyo"
            src="https://www.google.com/maps?q=Elebu,+Moniya,+Ibadan,+Oyo,+Nigeria&output=embed"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "14px", marginTop: "10px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="footer-section">
          <h4>REACH OUT</h4>
          <p>
            <a href="mailto:peterkehindeademola9@gmail.com">peterkehindeademola9@gmail.com</a>
          </p>
          <p>
            <a href="tel:+234904808076">090-4808-2076</a>
          </p>
        </div>

        <div className="footer-section">
          <h4>CONNECT</h4>
          <p>© 2026 kennykentola. All Rights Reserved.</p>

          <div className="social-links">
            <a href="https://web.facebook.com/kehindepeterademola" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://wa.me/2348163571677" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/ademola-peter-kehinde-44650a2b9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="social-icon" />
            </a>
          </div>

          <div className="admin-link" style={{ marginTop: "1rem" }}>
            <Link to="/admin" style={{ color: "#3498db", textDecoration: "none" }}>
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

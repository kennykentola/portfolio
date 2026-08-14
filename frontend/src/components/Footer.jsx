import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <h2>KENNY<span className="accent">KENTOLA</span></h2>
            <p>
              Building scalable web apps, productivity tools, and stunning designs.
              Let's create something amazing together.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="/resume">Resume</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="/graphic-designs">Graphic Designs</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><a href="#educationExperience">Education</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="/admin">Admin Panel</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <ul>
              <li>Email: <a href="mailto:peterkehindeademola9@gmail.com">peterkehindeademola9@gmail.com</a></li>
              <li>Phone: <a href="tel:+2348163571677">+234 816 357 1677</a></li>
              <li className="footer-socials">
                <a href="https://github.com/kennykentola" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/ademola-peter-kehinde-44650a2b9" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Ademola Peter Kehinde (KennyKentola). All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Built with React & Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

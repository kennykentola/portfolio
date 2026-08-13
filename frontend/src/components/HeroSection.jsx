import React, { useEffect, useState } from "react";
import "../components/HeroSection.css";
import resumePDF from "../assets/resume12.pdf";
import { useTheme } from "../context/ThemeContext";


const fullIntro = "My Name Is Ademola Peter Kehinde, known as KennyKentola";
const roles = ["Web Developer", "Software Developer", "UI/UX Designer", "Graphic Designer"];

const HeroSection = () => {
  const fullText = "My Portfolio, I am a ";
  const [typedText, setTypedText] = useState("Welcome to ");
  const [displayRole, setDisplayRole] = useState(roles[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let index = 0;
    let currentText = "Welcome to "; // Start with this text

    const typeEffect = () => {
      if (index < fullText.length) {
        currentText += fullText[index]; // Append next character
        setTypedText(currentText); // Update state
        index++;
        setTimeout(typeEffect, 150); // Call next letter
      }
    };

    typeEffect(); // Start typing effect

  }, []); // Run once when component mounts

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setDisplayRole((prevRole) => {
        const newIndex = (roles.indexOf(prevRole) + 1) % roles.length;
        return roles[newIndex];
      });
    }, 2000);
    return () => clearInterval(roleInterval);
  }, []);



  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span>KENNYKENTOLA</span>
        </div>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About Me</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#educationExperience" onClick={() => setMenuOpen(false)}>Education</a></li>
          <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
          <li><a href="#contact" className="contact-btn" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>

    <section id="home" className="hero">
      {/* Star Animation Background */}
      <div className="stars">
          {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="star"></div>
          ))}
      </div>

      <h1 className="hero-title">{typedText}</h1>
      <h2 className="hero-subtitle">{displayRole}</h2>
      <p className="hero-intro">{fullIntro}</p>

      {/* Available for Freelance Badge */}
      <div className="available-badge">
        <span className="badge-dot"></span>
        Available for Freelance
      </div>

      {/* Social Links */}
      <div className="hero-socials">
        <a href="https://github.com/kennykentola" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">GitHub</a>
        <a href="https://www.linkedin.com/in/ademola-peter-kehinde-44650a2b9" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">LinkedIn</a>
        <a href="https://wa.me/2348163571677" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">WhatsApp</a>
      </div>

      <a href={resumePDF} download className="btn">Download My Resume</a>
      <div className="scroll-down">↓</div>
   </section>

    </>
  );
};

export default HeroSection;

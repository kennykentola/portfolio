import React from "react";
import profileImage from "../assets/profile2.png";
import resumePDF from "../assets/resume12.pdf";
import "../components/About.css";
import useScrollAnimation from "../hooks/useScrollAnimation";

const stats = [
  { value: "10+", label: "Projects Completed" },
  { value: "8+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`about-container animate-section ${isVisible ? "animate-in" : ""}`}>
        {/* Profile Image */}
        <div className="about-image-wrapper">
          <img src={profileImage} alt="KennyKentola Profile" className="profile-image" loading="lazy" />
          <div className="image-glow" />
        </div>

        {/* About Text */}
        <div className="about-content">
          <h2 className="about-title">About <span className="accent">Me</span></h2>

          <p>
            Hi, I'm <strong>Ademola Peter Kehinde</strong> — known as{" "}
            <strong>KennyKentola</strong>! 👋 I'm a passionate Full-Stack
            Developer specialising in <strong>React, Node.js, Next.js, and Python</strong>.
            I love building scalable applications with efficient front-end and
            back-end architecture, and I thrive on solving complex problems with
            innovative solutions.
          </p>
          <p>
            I'm also passionate about{" "}
            <strong>UI/UX design, graphic design, and branding</strong>. Whether
            it's a productivity tool, an academic platform, or a brand identity —
            I bring both technical skill and visual craft to every project.
          </p>
          <p>
            <strong>Interests:</strong> Photography, Movies &amp; Science Fiction
          </p>

          {/* Stats Row */}
          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="about-actions">
            <a href={resumePDF} download="KennyKentola_Resume.pdf" className="about-btn primary">
              Download CV
            </a>
            <a href="tel:+2348163571677" className="about-btn secondary">
              Call Me
            </a>
          </div>
          
          {/* GitHub Stats */}
          <div className="about-github-stats">
            <a href="https://github.com/kennykentola" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=kennykentola&show_icons=true&theme=react&hide_border=true&bg_color=161b22" 
                alt="KennyKentola GitHub Stats" 
                className="github-stats-img"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

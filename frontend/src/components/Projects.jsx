import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/projects.css"; // Ensure correct path

import aponmodeLMS from "../assets/aponmode-lms.png";
import eCommerce from "../assets/ecom.png";
import portfolio from "../assets/portfolio.png";
import reparCompteur from "../assets/carrepaire.png";
import ui75Conference from "../assets/ui75-conference.png";
import brand from "../assets/branding-5.jpg";
import graphicDesigns from "../assets/graphic-designs.jpg"; // Ensure you add an image for the section

const projects = [
  { title: "Aponmode LMS", description: "A website for Aponmode Grammar School.", image: aponmodeLMS, liveUrl: "" },
  { title: "E-Commerce Platform", description: "Fully functional e-commerce platform.", image: eCommerce, liveUrl: "" },
  { title: "Responsive Portfolio", description: "A sleek, mobile-friendly portfolio.", image: portfolio, liveUrl: "" },
  { title: "Repair car", description: "Website for a vintage car repair service.", image: reparCompteur, liveUrl: "" },
  { title: "UI @75 CONFERENCE", description: "Website for UI @75 conference.", image: ui75Conference, liveUrl: "" },
  { title: "Brand Identity", description: "Complete brand identity for a startup.", image: brand, liveUrl: "" },
];

const Projects = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="projects">

      <h2>My Latest <span>Projects</span></h2>

      <div className="slideshow">
        {/* Left Arrow */}
        <button className="prev-btn" onClick={prevSlide}>❮</button>

        {/* Slide Content */}
        <div className="slide">
          <img src={projects[index].image} alt={projects[index].title} className="project-image" />
          <h3>{projects[index].title}</h3>
          <p>{projects[index].description}</p>
          <div className="project-actions">
            {projects[index].liveUrl ? (
              <a
                href={projects[index].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Visit Live Site
              </a>
            ) : (
              <span className="project-note">Add the live URL for this project</span>
            )}
          </div>
        </div>

        {/* Right Arrow */}
        <button className="next-btn" onClick={nextSlide}>❯</button>
      </div>

      {/* Dots Indicator */}
      <div className="dots">
        {projects.map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}></span>
        ))}
      </div>

      {/* New Section: My Graphic Designs */}
      <section className="graphic-designs">
        <h2>My <span>Graphic Designs</span></h2>
        <div className="graphic-container">
          <img src={graphicDesigns} alt="Graphic Design Portfolio" className="graphic-image" />
          <button className="view-designs-btn" onClick={() => navigate("/graphic-designs")}>
            View My Designs
          </button>
        </div>
      </section>
    </section>
  );
};

export default Projects;


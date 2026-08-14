import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../components/graphic.css";
import "../components/HeroSection.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";

import designerHand from "../assets/designer-hand.png";

import social1 from "../assets/fatima.jpg";
import social2 from "../assets/social-2.png";
import social3 from "../assets/joseph.png";
import social4 from "../assets/zainab.png";
import social5 from "../assets/mathew.png";
import social6 from "../assets/taiwo.png";
import social7 from "../assets/janny.png";
import social8 from "../assets/fatima1.png";
import social9 from "../assets/sam.png";
import social10 from "../assets/KENNYFLYER12.png";
import social11 from "../assets/faruk.png";
import social12 from "../assets/birthday.png";

import logo1 from "../assets/logo-1.png";
import logo2 from "../assets/logo-2.png";
import logo3 from "../assets/kenn.png";
import logo4 from "../assets/logo-4.png";
import logo5 from "../assets/jannylogo.png";

import brand1 from "../assets/branding1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand3.png";
import brand4 from "../assets/brand4.png";

const STATIC_DESIGNS = [
  { _id: "static-flyer-1", imageUrl: social1, category: "Flyers", altText: "Social Media Flyer 1" },
  { _id: "static-flyer-2", imageUrl: social2, category: "Flyers", altText: "Social Media Flyer 2" },
  { _id: "static-flyer-3", imageUrl: social3, category: "Flyers", altText: "Social Media Flyer 3" },
  { _id: "static-flyer-4", imageUrl: social4, category: "Flyers", altText: "Social Media Flyer 4" },
  { _id: "static-flyer-5", imageUrl: social5, category: "Flyers", altText: "Social Media Flyer 5" },
  { _id: "static-flyer-6", imageUrl: social6, category: "Flyers", altText: "Social Media Flyer 6" },
  { _id: "static-flyer-7", imageUrl: social7, category: "Flyers", altText: "Social Media Flyer 7" },
  { _id: "static-flyer-8", imageUrl: social8, category: "Flyers", altText: "Social Media Flyer 8" },
  { _id: "static-flyer-9", imageUrl: social9, category: "Flyers", altText: "Social Media Flyer 9" },
  { _id: "static-flyer-10", imageUrl: social10, category: "Flyers", altText: "Social Media Flyer 10" },
  { _id: "static-flyer-11", imageUrl: social11, category: "Flyers", altText: "Social Media Flyer 11" },
  { _id: "static-flyer-12", imageUrl: social12, category: "Flyers", altText: "Social Media Flyer 12" },
  { _id: "static-logo-1", imageUrl: logo1, category: "Logo Design", altText: "Logo Design 1" },
  { _id: "static-logo-2", imageUrl: logo2, category: "Logo Design", altText: "Logo Design 2" },
  { _id: "static-logo-3", imageUrl: logo3, category: "Logo Design", altText: "Logo Design 3" },
  { _id: "static-logo-4", imageUrl: logo4, category: "Logo Design", altText: "Logo Design 4" },
  { _id: "static-logo-5", imageUrl: logo5, category: "Logo Design", altText: "Logo Design 5" },
  { _id: "static-brand-1", imageUrl: brand1, category: "Brand Identity Design", altText: "Brand Identity 1" },
  { _id: "static-brand-2", imageUrl: brand2, category: "Brand Identity Design", altText: "Brand Identity 2" },
  { _id: "static-brand-3", imageUrl: brand3, category: "Brand Identity Design", altText: "Brand Identity 3" },
  { _id: "static-brand-4", imageUrl: brand4, category: "Brand Identity Design", altText: "Brand Identity 4" },
];

const SECTIONS = [
  { id: "flyers", label: "Flyers", category: "Flyers" },
  { id: "logos", label: "Logo Design", category: "Logo Design" },
  { id: "branding", label: "Brand Identity Design", category: "Brand Identity Design" },
];

const GraphicDesigns = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDesigns = useCallback(async () => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/graphic-designs`);
      const data = await res.json();
      if (data.success && data.designs && data.designs.length > 0) {
        setDesigns(data.designs);
      } else {
        setDesigns(STATIC_DESIGNS);
      }
    } catch {
      setDesigns(STATIC_DESIGNS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  const getDesignsByCategory = (category) =>
    designs.filter((d) => d.category === category);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="logo">
          <span>KENNYKENTOLA</span>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/" onClick={() => navigate("/")}>Home</a></li>
          <li><a href="#about" onClick={() => navigate("/")}>About Me</a></li>
          <li><a href="#skills" onClick={() => navigate("/")}>skills</a></li>
          <li><a href="#projects" onClick={() => navigate("/")}>Projects</a></li>
          <li><a href="/graphic-designs">Graphic Designs</a></li>
          <li><a href="#contact" onClick={() => navigate("/")}>Contact</a></li>
        </ul>
      </nav>

      <section className="hero-graphic">
        <h1 className="title">My <span>Design Portfolio</span></h1>
      </section>

      {loading ? (
        <div className="content-overlay text-center" style={{ padding: "60px 0" }}>
          <p>Loading designs…</p>
        </div>
      ) : (
        SECTIONS.map((section) => {
          const sectionDesigns = getDesignsByCategory(section.category);
          if (sectionDesigns.length === 0) return null;
          return (
            <section key={section.id} className="section gradient-bg">
              {section.id === "flyers" && (
                <div className="background-image">
                  <img src={designerHand} alt="Designer Hand" className="graphic-image" />
                </div>
              )}
              <div className="content-overlay">
                <h2>{section.label}</h2>
                <div className="design-grid">
                  {sectionDesigns.map((design) => (
                    <img
                      key={design._id}
                      src={design.imageUrl}
                      alt={design.altText || section.label}
                      className="graphic-image"
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      {!loading && designs.length > 0 && (
        <section className="section gradient-bg">
          <div className="content-overlay text-center">
            <h2 className="title">Why Choose Me?</h2>
            <div className="why-choose-me-box">
              <p><strong>Creative & Unique Designs:</strong> Craft original and eye-catching visuals tailored to your brand.</p>
              <p><strong>Attention to Detail:</strong> Every design is carefully thought out to ensure quality and impact.</p>
              <p><strong>Fast & Reliable Service:</strong> I meet deadlines without compromising on creativity.</p>
              <p><strong>Client-Focused Approach:</strong> Your vision and satisfaction are my top priorities.</p>
              <p><strong>Up-to-Date with Trends:</strong> I stay current with design trends to keep your brand fresh and modern.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GraphicDesigns;

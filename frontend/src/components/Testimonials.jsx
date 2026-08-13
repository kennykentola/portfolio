import React, { useState, useEffect, useRef } from "react";
import "../components/Testimonials.css";
import profileImg from "../assets/femi.png";
import jeffreyImg from "../assets/jeffrey-sun.jpg";
import doraImg from "../assets/dora-zhang.jpg";
import feiImg from "../assets/fei-gao.jpg";
import coolflyregImg from "../assets/coolflyreg.jpg";
import useScrollAnimation from "../hooks/useScrollAnimation";

const testimonialsData = [
  {
    id: 1,
    text: "KennyKentola is undeniably one of the most exceptional developers I have ever had the pleasure of working with. His ability to translate complex requirements into clean, maintainable code is truly remarkable. Every project he touches is delivered with precision and professionalism.",
    name: "Femi Olubodun",
    position: "Cybersecurity Researcher, University of Ibadan",
    rating: 5,
    assets: profileImg,
  },
  {
    id: 2,
    text: "Working with KennyKentola has been an absolute pleasure. He brings a rare combination of technical depth and design sensibility. He delivered our platform ahead of schedule, and the quality was beyond what we anticipated. I would recommend him to anyone building serious software.",
    name: "Jeffrey Sun",
    position: "Principal Engineering Manager, Microsoft",
    rating: 5,
    assets: jeffreyImg,
  },
  {
    id: 3,
    text: "I had the privilege of collaborating with KennyKentola on a brand campaign that required both technical and creative input. He consistently brought ideas that elevated our vision, and his execution was flawless. A true professional who delivers results.",
    name: "Dora Zhang",
    position: "Director of Marketing, Daylight Studios",
    rating: 5,
    assets: doraImg,
  },
  {
    id: 4,
    text: "KennyKentola is a software wizard! He built our internal tool from scratch in record time, and it has been running without a single issue for months. His communication throughout the project was excellent — always responsive, always honest about timelines.",
    name: "Fei Gao",
    position: "Operations Lead, TechBridge",
    rating: 5,
    assets: feiImg,
  },
  {
    id: 5,
    text: "KennyKentola transformed our vision into a reality beyond our expectations. He listened carefully to our needs, asked the right questions, and delivered a design that perfectly represented our brand. The attention to detail in every element was outstanding.",
    name: "Adeola Ganiyu",
    position: "CEO, Prodesign Agency",
    rating: 5,
    assets: coolflyregImg,
  },
];

const StarRating = ({ count = 5 }) => (
  <div className="star-rating" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? "star filled" : "star"}>★</span>
    ))}
  </div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const intervalRef = useRef(null);

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4500);
  };

  useEffect(() => {
    if (!isPaused) startAuto();
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const goTo = (i) => {
    setActiveIndex(i);
    clearInterval(intervalRef.current);
    if (!isPaused) startAuto();
  };

  const active = testimonialsData[activeIndex];

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      ref={ref}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`testimonials-inner animate-section ${isVisible ? "animate-in" : ""}`}>
        <div className="testimonials-header">
          <h2>What Clients <span className="accent">Say</span></h2>
          <p>Don't just take my word for it — hear it from people I've worked with.</p>
        </div>

        {/* Active testimonial */}
        <div className="testimonial-card" key={active.id}>
          <StarRating count={active.rating} />
          <blockquote className="testimonial-quote">
            "{active.text}"
          </blockquote>
          <div className="testimonial-author">
            <img src={active.assets} alt={active.name} className="author-img" loading="lazy" />
            <div>
              <strong className="author-name">{active.name}</strong>
              <span className="author-position">{active.position}</span>
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="testimonial-dots">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail row */}
        <div className="testimonial-thumbs">
          {testimonialsData.map((t, i) => (
            <button
              key={t.id}
              className={`thumb-btn ${i === activeIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`View ${t.name}'s testimonial`}
            >
              <img src={t.assets} alt={t.name} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useState } from "react";
import resumePDF from "../assets/resume12.pdf";
import "./Resume.css";

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="resume-section">
      <div className="resume-container">
        <div className="resume-header">
          <h2>My <span className="accent">Resume</span></h2>
          <a href={resumePDF} download className="download-btn">
            Download PDF
          </a>
        </div>

        <div className="resume-viewer-wrapper">
          {isLoading && (
            <div className="resume-loading">
              <div className="spinner"></div>
              <p>Loading Resume...</p>
            </div>
          )}
          <iframe
            src={resumePDF}
            title="Resume"
            className="resume-iframe"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Resume;

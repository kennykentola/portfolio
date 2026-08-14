import React from "react";
import "./Education.css"; // Import the CSS file

const educationData = [
  {
    institution: "ideal computer Technologies",
    duration: "09.2020 - 2021 / ibadan, nigeria",
    role: "graphic designer and microsoft expertise",
    link: "#",
  },
  {
    institution: "Univesity of Ibadan Oyo States Nigeria",
    duration: "2020 -  2026/ ibadan, nigeria",
    role: "Bachelor: Computer Science",
    link: "https://ui.edu.ng/",
  },
  {
    institution: "ITeMs univesity IB TRD. ",
    duration: "06.2021 - 08.2023 / Ibadan, Oyo State",
    role: " javascript Tutor Developer",
    link: "https://items.ui.edu.ng/",
  },
 

  
];

const EducationExperience = () => {
  return (
    <section id="educationExperience" className="education-section">
      <h2 className="section-title">Education & Work Experience</h2>
      <div className="education-container">
        {educationData.map((item, index) => (
          <div key={index} className="education-item">
            <div className="education-left">
              <a href={item.link} className="education-link">
                {item.institution}
              </a>
              <p className="education-duration">{item.duration}</p>
            </div>
            <div className="education-right">{item.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationExperience;

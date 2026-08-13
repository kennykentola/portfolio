import React from "react";
import "./Skills.css";
import useScrollAnimation from "../hooks/useScrollAnimation";

const skillsData = [
  {
    category: "Frontend",
    color: "#61dafb",
    skills: [
      { name: "React.js", level: 90, icon: "⚛️" },
      { name: "HTML / CSS", level: 95, icon: "🌐" },
      { name: "JavaScript", level: 88, icon: "🟨" },
      { name: "Next.js", level: 80, icon: "▲" },
    ],
  },
  {
    category: "Backend",
    color: "#68a063",
    skills: [
      { name: "Node.js / Express", level: 85, icon: "🟢" },
      { name: "Python / Django", level: 72, icon: "🐍" },
      { name: "REST API Design", level: 88, icon: "🔌" },
      { name: "MongoDB", level: 82, icon: "🍃" },
    ],
  },
  {
    category: "Design & Tools",
    color: "#f472b6",
    skills: [
      { name: "Figma / UI/UX", level: 85, icon: "🎨" },
      { name: "Graphic Design", level: 90, icon: "✏️" },
      { name: "WordPress", level: 80, icon: "🔵" },
      { name: "Git / GitHub", level: 85, icon: "🐙" },
    ],
  },
];

const SkillBar = ({ name, level, icon, color, isVisible, index }) => (
  <div className="skill-item" style={{ transitionDelay: `${index * 0.1}s` }}>
    <div className="skill-header">
      <span className="skill-name">
        <span className="skill-icon">{icon}</span>
        {name}
      </span>
      <span className="skill-percent" style={{ color }}>{level}%</span>
    </div>
    <div className="skill-track">
      <div
        className="skill-fill"
        style={{
          width: isVisible ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          boxShadow: isVisible ? `0 0 12px ${color}55` : "none",
        }}
      />
    </div>
  </div>
);

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className={`skills-inner animate-section ${isVisible ? "animate-in" : ""}`}>
        <div className="skills-header">
          <h2>My <span className="accent">Skills</span></h2>
          <p>Technologies and tools I use to build production-ready products.</p>
        </div>

        <div className="skills-grid">
          {skillsData.map((group) => (
            <div key={group.category} className="skills-group">
              <h3 className="group-title" style={{ color: group.color }}>
                {group.category}
              </h3>
              <div className="skill-bars">
                {group.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={group.color}
                    isVisible={isVisible}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
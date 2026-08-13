import React, { useState, useEffect, useCallback } from "react";
import { getApiBaseUrl } from "../utils/apiBaseUrl";
import "../components/projects.css";

// ── Static project data (fallback if API is unavailable) ─────────────────────
const STATIC_PROJECTS = [
  {
    _id: "static-1",
    title: "KennyKentola Multi-Service Platform",
    description:
      "A live platform offering a software agency, tech academy with paid course enrollment, and academic/thesis guidance. Features user authentication and a course dashboard.",
    imageUrl: "",
    liveUrl: "https://kennykentola.dpdns.org",
    githubUrl: "",
    category: "Web Dev",
    techStack: ["Next.js", "Appwrite", "React"],
    featured: true,
  },
  {
    _id: "static-2",
    title: "KennyTools — Productivity Suite",
    description:
      "A 35+ tool productivity suite spanning PDF tools, QR/barcode generators, image editing, and AI writing tools (CV builder, cover letter generator, image generator). No sign-up or watermarks.",
    imageUrl: "",
    liveUrl: "https://kenny-tools.vercel.app",
    githubUrl: "",
    category: "Tool",
    techStack: ["React", "Next.js", "AI APIs"],
    featured: true,
  },
  {
    _id: "static-3",
    title: "QR Code Generator (qrcodekenny)",
    description:
      "A free QR code generator and scanner supporting 35+ QR types with logo overlay, colour customisation, live camera scanning, and multi-format export (PNG, SVG, JPEG).",
    imageUrl: "",
    liveUrl: "https://qrcodekenny.vercel.app",
    githubUrl: "",
    category: "Tool",
    techStack: ["React", "JavaScript", "Canvas API"],
    featured: true,
  },
  {
    _id: "static-4",
    title: "UniProject Hub",
    description:
      "Academic project management platform connecting students, lecturers, and administrators for final year project supervision, with proposal submission, milestone tracking, video meetings, and separate dashboards.",
    imageUrl: "",
    liveUrl: "https://uniproject-hub.onrender.com",
    githubUrl: "",
    category: "Web Dev",
    techStack: ["React", "Node.js", "MongoDB", "WebRTC"],
    featured: true,
  },
  {
    _id: "static-5",
    title: "News Management System",
    description:
      "A full-stack news management platform for creating, editing, and publishing news articles with an admin dashboard and reader-facing interface.",
    imageUrl: "",
    liveUrl: "http://news-management-a59j.onrender.com",
    githubUrl: "",
    category: "Web Dev",
    techStack: ["React", "Node.js", "MongoDB"],
    featured: false,
  },
  {
    _id: "static-6",
    title: "Student Companion App",
    description:
      "A student productivity companion app for managing tasks, schedules, and academic resources to help students stay organised.",
    imageUrl: "",
    liveUrl: "https://studentcompanion-three.vercel.app",
    githubUrl: "",
    category: "Web Dev",
    techStack: ["React", "JavaScript"],
    featured: false,
  },
  {
    _id: "static-7",
    title: "Bello Lost & Found",
    description:
      "A community lost-and-found platform allowing users to report and search for lost items, with location tagging and real-time notifications.",
    imageUrl: "",
    liveUrl: "https://bello-lostfound.vercel.app",
    githubUrl: "",
    category: "Web Dev",
    techStack: ["React", "Node.js", "MongoDB"],
    featured: false,
  },
  {
    _id: "static-8",
    title: "Secures Vault",
    description:
      "A secure password manager and digital vault for storing and managing sensitive credentials safely.",
    imageUrl: "",
    liveUrl: "http://secures-vault.vercel.app",
    githubUrl: "",
    category: "Web Dev",
    techStack: ["React", "Encryption", "Node.js"],
    featured: false,
  },
];

const CATEGORIES = ["All", "Web Dev", "Tool", "Design", "Branding"];

const categoryIcon = {
  "Web Dev": "🌐",
  Tool: "🛠️",
  Design: "🎨",
  Branding: "✨",
  Other: "📁",
};

// ── Tech stack colour map ─────────────────────────────────────────────────────
const techColor = {
  "React": "#61dafb",
  "Next.js": "#ffffff",
  "Node.js": "#68a063",
  "MongoDB": "#4db33d",
  "Appwrite": "#f02e65",
  "Python": "#f7d74d",
  "JavaScript": "#f0db4f",
  "AI APIs": "#a855f7",
  "Canvas API": "#ff6384",
  "WebRTC": "#009688",
  "Encryption": "#ef4444",
  "WordPress": "#21759b",
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/projects`);
      const data = await res.json();
      if (data.success && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        setProjects(STATIC_PROJECTS);
      }
    } catch {
      // API unreachable — use static data
      setProjects(STATIC_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header">
        <h2>
          My <span className="accent">Projects</span>
        </h2>
        <p className="projects-subtitle">
          Real products — live, clickable, and built from scratch.
        </p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="projects-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="project-card skeleton-card">
              <div className="skeleton-img" />
              <div className="skeleton-line long" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Featured Projects */}
          {activeCategory === "All" && (
            <div className="featured-projects">
              <h3 className="section-label">⭐ Featured</h3>
              <div className="projects-grid featured-grid">
                {filtered
                  .filter((p) => p.featured)
                  .map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      hovered={hoveredId === project._id}
                      onHover={setHoveredId}
                      featured
                    />
                  ))}
              </div>
            </div>
          )}

          {/* All / Filtered Projects */}
          <div className={activeCategory === "All" ? "more-projects" : ""}>
            {activeCategory === "All" && (
              <h3 className="section-label">📁 All Projects</h3>
            )}
            <div className="projects-grid">
              {(activeCategory === "All"
                ? filtered.filter((p) => !p.featured)
                : filtered
              ).map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  hovered={hoveredId === project._id}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <p className="no-projects">No projects in this category yet.</p>
          )}
        </>
      )}
    </section>
  );
};

// ── Individual Project Card ───────────────────────────────────────────────────
const ProjectCard = ({ project, hovered, onHover, featured }) => {
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`project-card ${featured ? "featured-card" : ""} ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => onHover(project._id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Image or Initials Placeholder */}
      <div className="project-thumbnail">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" />
        ) : (
          <div className="project-initials">
            <span>{initials}</span>
            {categoryIcon[project.category] && (
              <span className="cat-icon">{categoryIcon[project.category]}</span>
            )}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="project-overlay">
          <div className="overlay-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-btn live-btn"
                onClick={(e) => e.stopPropagation()}
              >
                🚀 Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-btn github-btn"
                onClick={(e) => e.stopPropagation()}
              >
                💻 View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="project-content">
        <div className="project-meta">
          <span className="project-category">
            {categoryIcon[project.category]} {project.category}
          </span>
          {featured && <span className="featured-badge">⭐ Featured</span>}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {/* Tech Stack Tags */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="tech-stack">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="tech-tag"
                style={{ borderColor: techColor[tech] || "#6366f1", color: techColor[tech] || "#6366f1" }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="project-actions">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              Visit Live Site →
            </a>
          ) : (
            <span className="coming-soon-badge">Coming Soon</span>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link-btn"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;

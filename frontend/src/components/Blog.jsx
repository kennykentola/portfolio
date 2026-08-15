import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";
import { FaCalendar, FaEye } from "react-icons/fa";

const SAMPLE_POSTS = [
  {
    _id: "sample-1",
    title: "Building a Modern Portfolio Website with React and Node.js",
    slug: "building-a-modern-portfolio-website-with-react-and-nodejs",
    content: "## Introduction\n\nCreating a portfolio website that truly represents your skills as a developer involves more than just making things look good. It requires a well-thought-out architecture, performance optimization, and attention to detail.\n\n## Key Lessons Learned\n\n1. **Performance matters**: Users notice load times. I implemented lazy loading for images and code splitting for routes.\n2. **Dark mode isn't just a toggle**: It requires thoughtful color palette design and consistent application across all components.\n3. **API design**: REST APIs should be predictable. I followed standard conventions for status codes and response shapes.\n\n## Getting Started\n\nIf you're building your own portfolio, start simple. Don't try to make everything perfect on day one. Ship early, iterate often.",
    excerpt: "Lessons learned from building a full-stack portfolio website with React, Node.js, and MongoDB — covering performance optimization, dark mode design, and API architecture.",
    coverImage: "https://placehold.co/600x400/0d1117/f0f6fc?text=Modern+Portfolio",
    tags: ["React", "Node.js", "Web Development", "Performance"],
    views: 1247,
    createdAt: "2026-08-14T10:00:00.000Z",
  },
  {
    _id: "sample-2",
    title: "5 CSS Tricks That Will Change How You Layout Your UI",
    slug: "5-css-tricks-that-will-change-how-you-layout-your-ui",
    content: "## Grid vs Flexbox: When to Use What\n\nModern CSS layout tools give us powerful options. Here are five tricks I use every day.\n\n### 1. CSS Grid Auto-fit with minmax()\n\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```\n\n### 2. Aspect Ratio Boxes\n\n```css\n.aspect-video {\n  aspect-ratio: 16 / 9;\n}\n```\n\n### 3. Sticky Positioning\n\n```css\n.sticky-header {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n```\n\n### 4. Container Queries\n\nStyle components based on their container size.\n\n### 5. CSS Custom Properties for Theming\n\nChange themes by redefining variables. Zero JavaScript needed.\n\nEach of these techniques can dramatically simplify your CSS and improve your workflow.",
    excerpt: "Five modern CSS techniques — grid auto-fit, aspect ratio, sticky positioning, container queries, and custom properties — that will transform how you build layouts.",
    coverImage: "https://placehold.co/600x400/0d1117/f0f6fc?text=CSS+Tricks",
    tags: ["CSS", "Web Design", "Frontend", "Layout"],
    views: 892,
    createdAt: "2026-08-10T10:00:00.000Z",
  },
  {
    _id: "sample-3",
    title: "The Complete Guide to Securing Your Express.js API",
    slug: "the-complete-guide-to-securing-your-express-js-api",
    content: "## Why API Security Matters\n\nYour API is the backbone of your application. If it's compromised, your entire system is at risk.\n\n## Key Security Measures\n\n### Helmet.js\n\n```javascript\nconst helmet = require(\"helmet\");\napp.use(helmet());\n```\n\n### Rate Limiting\n\nPrevents brute-force and DoS attacks.\n\n### JWT Best Practices\n\n- Use short-lived tokens (15 min - 1 hour)\n- Implement refresh token rotation\n- Store tokens in HTTP-only cookies\n\n### Input Validation\n\nAlways validate and sanitize input.\n\n### CORS Configuration\n\nNever use wildcard CORS in production.",
    excerpt: "Essential security practices for Express.js APIs including Helmet.js, rate limiting, JWT handling, input validation, and CORS configuration.",
    coverImage: "https://placehold.co/600x400/0d1117/f0f6fc?text=API+Security",
    tags: ["Security", "Node.js", "Express", "Backend"],
    views: 1563,
    createdAt: "2026-07-28T10:00:00.000Z",
  },
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/blog`);
        const data = await res.json();
        if (res.ok && data.success) {
          setPosts(data.posts);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const displayPosts = posts.length > 0 ? posts : SAMPLE_POSTS;

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="blog-title">My <span className="accent">Blog</span></h2>
        <p className="blog-subtitle">Thoughts on tech, development, and design.</p>

        {loading ? (
          <div className="blog-loading">
            <div className="spinner"></div>
            <p>Loading posts...</p>
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="blog-empty">
            <p>No posts available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {displayPosts.map((post) => (
              <div key={post._id} className="blog-card">
                {post.coverImage && (
                  <div className="blog-card-image">
                    <img src={post.coverImage} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-date">
                      <FaCalendar size={14} />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="blog-views"><FaEye size={14} /> {post.views} views</span>
                  </div>
                  <h3>
                    <Link to={`/blog/${post.slug}`} className="blog-card-link">
                      {post.title}
                    </Link>
                  </h3>
                  <p>{post.excerpt || post.content.substring(0, 100) + "..."}</p>
                  <div className="blog-tags">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;

require("dotenv").config();

const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

const samplePosts = [
  {
    title: "Building a Modern Portfolio Website with React and Node.js",
    content: "## Introduction\n\nCreating a portfolio website that truly represents your skills as a developer involves more than just making things look good. It requires a well-thought-out architecture, performance optimization, and attention to detail.\n\n## Tech Stack Overview\n\nI chose a **MERN-like** stack with some modifications:\n\n- **Frontend**: React 19 with functional components and hooks\n- **Styling**: Tailwind CSS with custom CSS variables for theming\n- **Backend**: Express.js with MongoDB for data storage\n- **Deployment**: Vercel for frontend, Render for backend\n\n## Key Lessons Learned\n\n1. **Performance matters**: Users notice load times. I implemented lazy loading for images and code splitting for routes.\n2. **Dark mode isn't just a toggle**: It requires thoughtful color palette design and consistent application across all components.\n3. **API design**: REST APIs should be predictable. I followed standard conventions for status codes and response shapes.\n\n## Code Snippets\n\nHere's how I handle API calls with a custom base URL hook:\n\n```javascript\nconst getApiBaseUrl = () => {\n  if (process.env.REACT_APP_API_URL) {\n    return process.env.REACT_APP_API_URL.replace(/\\/$/, \"\");\n  }\n  return \"https://portfolio-website-qem5.onrender.com\";\n};\n```\n\n## Getting Started\n\nIf you're building your own portfolio, start simple. Don't try to make everything perfect on day one. Ship early, iterate often.\n\n*Published on August 14, 2026*",
    excerpt: "Lessons learned from building a full-stack portfolio website with React, Node.js, and MongoDB — covering performance optimization, dark mode design, and API architecture.",
    coverImage: "https://placehold.co/600x400/0d1117/f0f6fc?text=Modern+Portfolio",
    tags: ["React", "Node.js", "Web Development", "Performance"],
    published: true,
  },
  {
    title: "5 CSS Tricks That Will Change How You Layout Your UI",
    content: "## Grid vs Flexbox: When to Use What\n\nModern CSS layout tools give us powerful options. Here are five tricks I use every day.\n\n### 1. CSS Grid Auto-fit with minmax()\n\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```\n\nThis creates responsive columns that never get too narrow or too wide.\n\n### 2. Aspect Ratio Boxes\n\n```css\n.aspect-video {\n  aspect-ratio: 16 / 9;\n}\n```\n\nNo more padding-bottom hacks. Native aspect ratio support is here.\n\n### 3. Sticky Positioning\n\n```css\n.sticky-header {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n```\n\nKeeps headers visible during scroll without JavaScript.\n\n### 4. Container Queries\n\n```css\n@container (min-width: 400px) {\n  .card { padding: 2rem; }\n}\n```\n\nStyle components based on their container size, not the viewport.\n\n### 5. CSS Custom Properties for Theming\n\n```css\n:root {\n  --bg-primary: #0d1117;\n  --text-primary: #f0f6fc;\n}\n```\n\nChange themes by redefining variables. Zero JavaScript needed.\n\nEach of these techniques can dramatically simplify your CSS and improve your workflow.",
    excerpt: "Five modern CSS techniques — grid auto-fit, aspect ratio, sticky positioning, container queries, and custom properties — that will transform how you build layouts.",
    coverImage: "https://placehold.co/600x400/0d1117/f0f6fc?text=CSS+Tricks",
    tags: ["CSS", "Web Design", "Frontend", "Layout"],
    published: true,
  },
  {
    title: "The Complete Guide to Securing Your Express.js API",
    content: "## Why API Security Matters\n\nYour API is the backbone of your application. If it's compromised, your entire system is at risk.\n\n## Key Security Measures\n\n### Helmet.js\n\n```javascript\nconst helmet = require(\"helmet\");\napp.use(helmet());\n```\n\nSets security-related HTTP headers automatically.\n\n### Rate Limiting\n\n```javascript\nconst rateLimit = require(\"express-rate-limit\");\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n});\napp.use(\"/api\", limiter);\n```\n\nPrevents brute-force and DoS attacks.\n\n### JWT Best Practices\n\n- Use short-lived tokens (15 min - 1 hour)\n- Implement refresh token rotation\n- Store tokens in HTTP-only cookies\n\n### Input Validation\n\nAlways validate and sanitize input:\n\n```javascript\nconst { body } = require(\"express-validator\");\napp.post(\"/api/posts\", \n  body(\"title\").isLength({ min: 3 }).trim().escape(),\n  // ...\n);\n```\n\n## CORS Configuration\n\nNever use wildcard CORS in production. Always whitelist known origins.",
    excerpt: "Essential security practices for Express.js APIs including Helmet.js, rate limiting, JWT handling, input validation, and CORS configuration.",
    coverImage: "https://placehold.co/600x400/0d1117/f0f6fc?text=API+Security",
    tags: ["Security", "Node.js", "Express", "Backend"],
    published: true,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const existing = await BlogPost.find({});
    if (existing.length > 0) {
      console.log("Blog posts already exist. Skipping seed.");
      return mongoose.connection.close();
    }
    await BlogPost.insertMany(samplePosts);
    console.log(`Seeded ${samplePosts.length} blog posts`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });

import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import "./BlogPost.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";
import { FaCalendar, FaEye, FaArrowLeft, FaTimes } from "react-icons/fa";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/blog/${slug}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setPost(data.post);
          setError(false);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    // Dynamically execute any embedded <script> tags inside blog post content
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.innerHTML) {
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      }
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    const handleImageClick = (e) => {
      const img = e.target.closest("img");
      if (img) {
        e.preventDefault();
        setSelectedImage({ src: img.src, alt: img.alt || "" });
      }
    };

    container.addEventListener("click", handleImageClick);
    return () => container.removeEventListener("click", handleImageClick);
  }, [post]);

  if (loading) {
    return (
      <section className="blog-post-section">
        <div className="blog-post-loading">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blog-post-section">
        <div className="blog-post-error">
          <h2>Post not found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="blog-back-link">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  // Support full HTML, CSS (<style>), JS (<script>), and Markdown
  const isRawHtml = /<(style|script|div|header|section|main|footer|p|h[1-6]|span|table|form|article)/i.test(post.content || "");
  const __html = isRawHtml ? post.content : marked(post.content || "");

  return (
    <article className="blog-post-section">
      <div className="blog-post-container">
        <Link to="/blog" className="blog-back-link">
          <FaArrowLeft /> Back to Blog
        </Link>

        <h1 className="blog-post-title">{post.title}</h1>

        <div className="blog-post-meta">
          <span className="blog-post-date">
            <FaCalendar size={14} />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="blog-post-views">
            <FaEye size={14} /> {post.views} views
          </span>
        </div>

        {post.coverImage && (
          <div className="blog-post-cover">
            <img src={post.coverImage} alt={post.title} loading="lazy" />
          </div>
        )}

        <div
          ref={contentRef}
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html }}
        />

        {post.tags?.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="blog-image-modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="blog-image-modal-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="blog-image-modal-img"
              />
              <button
                className="blog-image-modal-close"
                aria-label="Close"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPost;

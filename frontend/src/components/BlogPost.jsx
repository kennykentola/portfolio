import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import "./BlogPost.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";
import { FaCalendar, FaEye, FaArrowLeft } from "react-icons/fa";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const __html = marked(post.content);

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
      </div>
    </article>
  );
};

export default BlogPost;

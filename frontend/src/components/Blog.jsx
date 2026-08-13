import React, { useState, useEffect } from "react";
import "./Blog.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/blog`);
        const data = await res.json();
        if (res.ok && data.success) {
          setPosts(data.posts);
        } else {
          setError(data.message || "Failed to load posts.");
        }
      } catch (err) {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
        ) : error ? (
          <p className="blog-error">{error}</p>
        ) : posts.length === 0 ? (
          <div className="blog-empty">
            <p>No posts available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <div key={post._id} className="blog-card">
                {post.coverImage && (
                  <div className="blog-card-image">
                    <img src={post.coverImage} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-date">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="blog-views">{post.views} views</span>
                  </div>
                  <h3>{post.title}</h3>
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

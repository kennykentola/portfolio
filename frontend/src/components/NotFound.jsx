import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <div className="notfound-container">
    <div className="notfound-content">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-subtitle">
        Hmm, this page doesn't exist — maybe it was moved, renamed, or never existed.
      </p>
      <Link to="/" className="notfound-btn">
        ← Back to Home
      </Link>
    </div>
    <div className="notfound-bg">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="notfound-star" />
      ))}
    </div>
  </div>
);

export default NotFound;

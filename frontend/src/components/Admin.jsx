import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Admin.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";

const ADMIN_TOKEN_KEY = "kennykentola_admin_token";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const API_BASE_URL = getApiBaseUrl();

  const clearSession = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken("");
    setMessages([]);
  }, []);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = await response.json();

      if (response.status === 401) {
        clearSession();
        throw new Error("Please log in again.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data);
    } catch (err) {
      setError(err.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, token, clearSession]);

  useEffect(() => {
    if (token) {
      fetchMessages();
    }
  }, [token, fetchMessages]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      toast.success("Admin login successful");
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="admin-container">
        <h1>Admin Login</h1>
        <p className="admin-subtitle">Sign in to view incoming contact messages.</p>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="refresh-btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  if (loading && messages.length === 0) {
    return (
      <div className="admin-container">
        <h2>Loading messages...</h2>
      </div>
    );
  }

  if (error && messages.length === 0) {
    return (
      <div className="admin-container">
        <h2>{error}</h2>
        <button className="refresh-btn" onClick={fetchMessages}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Message Inbox</h1>
          <p>Private contact submissions stored in MongoDB.</p>
        </div>
        <div className="admin-actions">
          <button className="refresh-btn" onClick={fetchMessages}>
            Refresh
          </button>
          <button className="logout-btn" onClick={clearSession}>
            Logout
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <h3>{msg.name}</h3>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Subject:</strong> {msg.subject}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Contact Method:</strong> {msg.contactMethod}</p>
              {msg.referral && <p><strong>Referral:</strong> {msg.referral}</p>}
              {msg.appointmentDate && <p><strong>Appointment Date:</strong> {msg.appointmentDate}</p>}
              {msg.appointmentTime && <p><strong>Appointment Time:</strong> {msg.appointmentTime}</p>}
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;

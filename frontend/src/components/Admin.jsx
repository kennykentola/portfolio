import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaTrash, FaCheck, FaPlus, FaEdit } from "react-icons/fa";
import "./Admin.css";
import { getApiBaseUrl } from "../utils/apiBaseUrl";

const ADMIN_TOKEN_KEY = "kennykentola_admin_token";

// ── Small reusable components ─────────────────────────────────────────────────
const TabButton = ({ label, active, badge, onClick }) => (
  <button className={`tab-btn ${active ? "active" : ""}`} onClick={onClick}>
    {label}
    {badge > 0 && <span className="tab-badge">{badge}</span>}
  </button>
);

// ── Main Admin Component ──────────────────────────────────────────────────────
const Admin = () => {
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || "");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [graphicDesigns, setGraphicDesigns] = useState([]);
  const [showGraphicForm, setShowGraphicForm] = useState(false);
  const [editingGraphic, setEditingGraphic] = useState(null);

  const API_BASE_URL = getApiBaseUrl();

  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const clearSession = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken("");
    setMessages([]);
    setProjects([]);
    setBlogPosts([]);
    setGraphicDesigns([]);
  }, []);

  // ── Fetch messages ──────────────────────────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, { headers: authHeaders() });
      if (res.status === 401) { clearSession(); return; }
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setError("Could not load messages.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, authHeaders, clearSession]);

  // ── Fetch projects ──────────────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      setError("Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // ── Fetch blog posts ────────────────────────────────────────────────────────
  const fetchBlogPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blog/all`, { headers: authHeaders() });
      const data = await res.json();
      setBlogPosts(data.posts || []);
    } catch {
      setError("Could not load blog posts.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, authHeaders]);

  const fetchGraphicDesigns = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/graphic-designs/all`, { headers: authHeaders() });
      const data = await res.json();
      setGraphicDesigns(data.designs || []);
    } catch {
      setError("Could not load graphic designs.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, authHeaders]);

  useEffect(() => {
    if (!token) return;
    fetchMessages();
    fetchProjects();
    fetchBlogPosts();
    fetchGraphicDesigns();
  }, [token, fetchMessages, fetchProjects, fetchBlogPosts, fetchGraphicDesigns]);

  // ── Extract appointments from messages ─────────────────────────────────────
  useEffect(() => {
    const withAppt = messages.filter((m) => m.appointmentDate);
    setAppointments(withAppt);
  }, [messages]);

  // ── Login ───────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Login failed");
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      toast.success("Welcome back, Admin!");
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ── Message actions ─────────────────────────────────────────────────────────
  const markAsRead = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/messages/${id}/read`, {
        method: "PATCH",
        headers: authHeaders(),
      });
      setMessages((prev) => prev.map((m) => m._id === id ? { ...m, isRead: true } : m));
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  // ── Project actions ─────────────────────────────────────────────────────────
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  // ── Blog actions ────────────────────────────────────────────────────────────
  const deleteBlogPost = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/blog/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setBlogPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Blog post deleted");
    } catch {
      toast.error("Failed to delete blog post");
    }
  };

  // ── Graphic Design actions ───────────────────────────────────────────────────
  const deleteGraphicDesign = async (id) => {
    if (!window.confirm("Delete this design?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/graphic-designs/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setGraphicDesigns((prev) => prev.filter((d) => d._id !== id));
      toast.success("Design deleted");
    } catch {
      toast.error("Failed to delete design");
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="admin-container">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <p className="admin-subtitle">Sign in to manage your portfolio.</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label>
              Username
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
            </label>
            <label>
              Password
              <div className="password-field">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                <button type="button" className="password-toggle" onClick={() => setShowPassword((p) => !p)} aria-label="Toggle password">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="refresh-btn" disabled={loading}>
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <button className="refresh-btn" onClick={() => { fetchMessages(); fetchProjects(); fetchGraphicDesigns(); }}>Refresh</button>
          <button className="logout-btn" onClick={clearSession}>Logout</button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-nav">
        <TabButton label="Messages" active={tab === "messages"} badge={unreadCount} onClick={() => setTab("messages")} />
        <TabButton label="Projects" active={tab === "projects"} onClick={() => setTab("projects")} />
        <TabButton label="Blog" active={tab === "blog"} onClick={() => setTab("blog")} />
        <TabButton label="Graphic Designs" active={tab === "graphic-designs"} onClick={() => setTab("graphic-designs")} />
        <TabButton label="Appointments" active={tab === "appointments"} badge={appointments.length} onClick={() => setTab("appointments")} />
      </div>

      {/* ── Messages Tab ── */}
      {tab === "messages" && (
        <div className="admin-tab-content">
          {loading && <p>Loading messages…</p>}
          {!loading && messages.length === 0 && <p className="empty-state">No messages yet.</p>}
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg._id} className={`message-card ${msg.isRead ? "read" : "unread"}`}>
                <div className="msg-header">
                  <div>
                    <h3>{msg.name} {!msg.isRead && <span className="new-badge">New</span>}</h3>
                    <span className="msg-email">{msg.email}</span>
                  </div>
                  <div className="msg-actions">
                    {!msg.isRead && (
                      <button className="icon-btn read-btn" onClick={() => markAsRead(msg._id)} title="Mark as read">
                        <FaCheck />
                      </button>
                    )}
                    <button className="icon-btn delete-btn" onClick={() => deleteMessage(msg._id)} title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p><strong>Subject:</strong> {msg.subject}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p><strong>Contact via:</strong> {msg.contactMethod}</p>
                {msg.referral && <p><strong>Referral:</strong> {msg.referral}</p>}
                {msg.appointmentDate && <p><strong>Appointment:</strong> {msg.appointmentDate} at {msg.appointmentTime || "TBD"}</p>}
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Projects Tab ── */}
      {tab === "projects" && (
        <div className="admin-tab-content">
          <div className="tab-actions-row">
            <button className="refresh-btn" onClick={() => setShowProjectForm(true)}>
              <FaPlus /> Add Project
            </button>
          </div>

          {showProjectForm && (
            <ProjectForm
              API_BASE_URL={API_BASE_URL}
              token={token}
              initial={editingProject}
              onSave={(p) => {
                if (editingProject) {
                  setProjects((prev) => prev.map((x) => x._id === p._id ? p : x));
                } else {
                  setProjects((prev) => [p, ...prev]);
                }
                setShowProjectForm(false);
                setEditingProject(null);
              }}
              onCancel={() => { setShowProjectForm(false); setEditingProject(null); }}
            />
          )}

          <div className="projects-admin-list">
            {projects.length === 0 && !loading && <p className="empty-state">No projects yet. Add one above.</p>}
            {projects.map((p) => (
              <div key={p._id} className="project-admin-card">
                <div className="proj-info">
                  <h3>{p.title}</h3>
                  <span className="proj-cat">{p.category}</span>
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link">↗ Live Site</a>}
                </div>
                <div className="msg-actions">
                  <button className="icon-btn read-btn" title="Edit" onClick={() => { setEditingProject(p); setShowProjectForm(true); }}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn delete-btn" title="Delete" onClick={() => deleteProject(p._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Blog Tab ── */}
      {tab === "blog" && (
        <div className="admin-tab-content">
          <div className="tab-actions-row">
            <button className="refresh-btn" onClick={() => setShowBlogForm(true)}>
              <FaPlus /> Add Post
            </button>
          </div>

          {showBlogForm && (
            <BlogForm
              API_BASE_URL={API_BASE_URL}
              token={token}
              initial={editingBlog}
              onSave={(p) => {
                if (editingBlog) {
                  setBlogPosts((prev) => prev.map((x) => x._id === p._id ? p : x));
                } else {
                  setBlogPosts((prev) => [p, ...prev]);
                }
                setShowBlogForm(false);
                setEditingBlog(null);
              }}
              onCancel={() => { setShowBlogForm(false); setEditingBlog(null); }}
            />
          )}

          <div className="projects-admin-list">
            {blogPosts.length === 0 && !loading && <p className="empty-state">No blog posts yet. Add one above.</p>}
            {blogPosts.map((p) => (
              <div key={p._id} className="project-admin-card">
                <div className="proj-info">
                  <h3>{p.title} {!p.published && <span className="new-badge">Draft</span>}</h3>
                  <span className="proj-cat">{p.views} views</span>
                  <span className="proj-link">{new Date(p.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="msg-actions">
                  <button className="icon-btn read-btn" title="Edit" onClick={() => { setEditingBlog(p); setShowBlogForm(true); }}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn delete-btn" title="Delete" onClick={() => deleteBlogPost(p._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Graphic Designs Tab ── */}
      {tab === "graphic-designs" && (
        <div className="admin-tab-content">
          <div className="tab-actions-row">
            <button className="refresh-btn" onClick={() => setShowGraphicForm(true)}>
              <FaPlus /> Add Design
            </button>
          </div>

          {showGraphicForm && (
            <GraphicDesignForm
              API_BASE_URL={API_BASE_URL}
              token={token}
              initial={editingGraphic}
              onSave={(d) => {
                if (editingGraphic) {
                  setGraphicDesigns((prev) => prev.map((x) => x._id === d._id ? d : x));
                } else {
                  setGraphicDesigns((prev) => [d, ...prev]);
                }
                setShowGraphicForm(false);
                setEditingGraphic(null);
              }}
              onCancel={() => { setShowGraphicForm(false); setEditingGraphic(null); }}
            />
          )}

          <div className="projects-admin-list">
            {graphicDesigns.length === 0 && !loading && <p className="empty-state">No designs yet. Add one above.</p>}
            {graphicDesigns.map((d) => (
              <div key={d._id} className="project-admin-card">
                <div className="proj-info">
                  <h3>{d.altText || d.category}</h3>
                  <span className="proj-cat">{d.category}</span>
                  <a href={d.imageUrl} target="_blank" rel="noopener noreferrer" className="proj-link">↗ View Image</a>
                </div>
                <div className="msg-actions">
                  <button className="icon-btn read-btn" title="Edit" onClick={() => { setEditingGraphic(d); setShowGraphicForm(true); }}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn delete-btn" title="Delete" onClick={() => deleteGraphicDesign(d._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Appointments Tab ── */}
      {tab === "appointments" && (
        <div className="admin-tab-content">
          {appointments.length === 0 && <p className="empty-state">No appointments scheduled yet.</p>}
          <div className="messages-list">
            {appointments.map((msg) => (
              <div key={msg._id} className="message-card">
                <h3>{msg.name}</h3>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Date:</strong> {msg.appointmentDate}</p>
                <p><strong>Time:</strong> {msg.appointmentTime || "Not specified"}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <small>Received: {new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Project Form ──────────────────────────────────────────────────────────────
const EMPTY_PROJECT = {
  title: "", description: "", imageUrl: "", liveUrl: "",
  githubUrl: "", category: "Web Dev", techStack: "", featured: false,
};

const ProjectForm = ({ API_BASE_URL, token, initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial
    ? { ...initial, techStack: (initial.techStack || []).join(", ") }
    : EMPTY_PROJECT
  );
  const [saving, setSaving] = useState(false);
  const isEdit = !!initial;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const url = isEdit
      ? `${API_BASE_URL}/api/projects/${initial._id}`
      : `${API_BASE_URL}/api/projects`;
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      toast.success(isEdit ? "Project updated!" : "Project added!");
      onSave(data.project);
    } catch (err) {
      toast.error(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Project" : "Add New Project"}</h3>
      <div className="form-row">
        <label>Title *<input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Web Dev</option><option>Tool</option><option>Design</option>
            <option>Branding</option><option>Other</option>
          </select>
        </label>
      </div>
      <label>Description *<textarea name="description" value={form.description} onChange={handleChange} rows={3} required /></label>
      <div className="form-row">
        <label>Live URL<input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." /></label>
        <label>GitHub URL<input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." /></label>
      </div>
      <div className="form-row">
        <label>Image URL<input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." /></label>
        <label>Tech Stack (comma-separated)<input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" /></label>
      </div>
      <label className="checkbox-label">
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
        Feature this project (show at top)
      </label>
      <div className="form-actions">
        <button type="submit" className="refresh-btn" disabled={saving}>{saving ? "Saving…" : isEdit ? "Update" : "Add Project"}</button>
        <button type="button" className="logout-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

// ── Blog Form ─────────────────────────────────────────────────────────────────
const EMPTY_BLOG = {
  title: "", content: "", excerpt: "", coverImage: "", tags: "", published: true,
};

const BlogForm = ({ API_BASE_URL, token, initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial
    ? { ...initial, tags: (initial.tags || []).join(", ") }
    : EMPTY_BLOG
  );
  const [saving, setSaving] = useState(false);
  const isEdit = !!initial;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const url = isEdit
      ? `${API_BASE_URL}/api/blog/${initial._id}`
      : `${API_BASE_URL}/api/blog`;
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      toast.success(isEdit ? "Post updated!" : "Post added!");
      onSave(data.post);
    } catch (err) {
      toast.error(err.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Post" : "Add New Post"}</h3>
      <div className="form-row">
        <label>Title *<input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Cover Image URL<input name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="https://..." /></label>
      </div>
      <label>Excerpt<input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary..." /></label>
      <label>Content (Markdown supported) *<textarea name="content" value={form.content} onChange={handleChange} rows={6} required /></label>
      <label>Tags (comma-separated)<input name="tags" value={form.tags} onChange={handleChange} placeholder="React, Node, CSS" /></label>
      <label className="checkbox-label">
        <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
        Published (visible to public)
      </label>
      <div className="form-actions">
        <button type="submit" className="refresh-btn" disabled={saving}>{saving ? "Saving…" : isEdit ? "Update" : "Add Post"}</button>
        <button type="button" className="logout-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

// ── Graphic Design Form ───────────────────────────────────────────────────────
const EMPTY_GRAPHIC = {
  imageUrl: "", category: "Flyers", altText: "", order: 0, published: true,
};

const GraphicDesignForm = ({ API_BASE_URL, token, initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || EMPTY_GRAPHIC);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Data, setBase64Data] = useState("");
  const isEdit = !!initial;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setBase64Data("");
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setBase64Data(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let resolvedImageUrl = form.imageUrl;

      if (selectedFile) {
        if (!base64Data) throw new Error("Image is still processing. Please wait and try again.");
        resolvedImageUrl = base64Data;
      }

      if (!resolvedImageUrl) {
        throw new Error("Please upload an image or provide an image URL.");
      }

      const payload = {
        ...form,
        imageUrl: resolvedImageUrl,
        order: Number(form.order) || 0,
      };
      const url = isEdit
        ? `${API_BASE_URL}/api/graphic-designs/${initial._id}`
        : `${API_BASE_URL}/api/graphic-designs`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      toast.success(isEdit ? "Design updated!" : "Design added!");
      onSave(data.design);
    } catch (err) {
      toast.error(err.message || "Failed to save design");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Design" : "Add New Design"}</h3>
      <div className="form-row">
        <label>Upload Image
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={saving} />
        </label>
        <label>Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Flyers</option><option>Logo Design</option><option>Brand Identity Design</option>
          </select>
        </label>
      </div>

      {base64Data && (
        <div className="image-preview">
          <img src={base64Data} alt="Preview" className="preview-img" />
        </div>
      )}

      <label>Or Image URL (optional — use if not uploading)
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
      </label>
      <label>Alt Text
        <input name="altText" value={form.altText} onChange={handleChange} placeholder="Description for accessibility" />
      </label>
      <div className="form-row">
        <label>Order
          <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="0" />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
          Published (visible on site)
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="refresh-btn" disabled={saving}>{saving ? "Saving…" : isEdit ? "Update" : "Add Design"}</button>
        <button type="button" className="logout-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default Admin;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import EducationExperience from "./components/EducationExperience";
import Projects from "./components/Projects";
import GraphicDesigns from "./components/GraphicDesigns";
import Admin from "./components/Admin";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Resume from "./components/Resume";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/graphic-designs" element={<GraphicDesigns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/education-experience" element={<EducationExperience />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollToTop />
        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar />
      </Router>
    </ThemeProvider>
  );
}

export default App;

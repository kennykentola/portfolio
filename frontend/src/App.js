import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import EducationExperience from "./components/EducationExperience";
import Projects from "./components/Projects";
import GraphicDesigns from "./components/GraphicDesigns";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/graphic-designs" element={<GraphicDesigns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/education-experience" element={<EducationExperience />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar />
    </Router>
  );
}

export default App;

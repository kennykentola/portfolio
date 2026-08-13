import React from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import EducationExperience from "./EducationExperience";
import Testimonials from "./Testimonials";
import Blog from "./Blog";
import Contact from "./Contact";



function Home() {
  return (
    <div className="home-container">
    
   
    
      {/* Page Content */}
      <HeroSection />
      <About />
      <Skills />
      <Projects />
      <EducationExperience />
      <Testimonials />
      <Blog />
      <Contact />
      
      
    </div>
    
  );
}

export default Home;

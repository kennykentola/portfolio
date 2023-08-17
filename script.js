// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
  // Handle button click animations
  const workButton = document.querySelector(".work-button");
  const projectButton = document.querySelector(".project-button");
  
  workButton.addEventListener("click", animateButton);
  projectButton.addEventListener("click", animateButton);

  function animateButton(event) {
    const button = event.target;
    button.classList.add("button-clicked");
    setTimeout(() => {
      button.classList.remove("button-clicked");
    }, 300);
  }

  // Toggle view all button for blog section
  const viewAllButton = document.querySelector(".view-all-button");
  const blogContainer = document.querySelector(".blog-container");

  viewAllButton.addEventListener("click", toggleBlogPosts);

  function toggleBlogPosts() {
    blogContainer.classList.toggle("show-all-posts");
  }

  // Add more interactions and animations as needed
});

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
for (const link of anchorLinks) {
  link.addEventListener('click', smoothScroll);
}

// Rest of your JavaScript code...

// Add 'click' event listener to the "View My Work" button
const ctaButton = document.querySelector('.cta-btn');
ctaButton.addEventListener('click', () => {
  ctaButton.classList.add('clicked');
  setTimeout(() => {
    ctaButton.classList.remove('clicked');
  }, 500);
});


function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  const headerHeight = document.querySelector('header').offsetHeight;
  const yOffset = -headerHeight;

  window.scrollTo({
    top: targetElement.offsetTop + yOffset,
    behavior: 'smooth',
  });
}

// Get all sections with the "sections" class
const sections = document.querySelectorAll('.sections');

// Add mouseleave event listener to each section
sections.forEach(section => {
  section.addEventListener('mouseleave', () => {
    section.style.transform = 'translateY(0)';
  });
});

document.querySelector('.mobile-toggle').addEventListener('click', function() {
  document.querySelector('.nav-list').classList.toggle('active');
});



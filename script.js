
// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Animate menu toggle bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('open'));
  });
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.remove('open'));
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
  });
  
  // Animation for elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Select elements to animate
  const animatedElements = document.querySelectorAll('.about-card, .join-info, .section-title');
  animatedElements.forEach(el => {
    el.style.opacity = '0.5';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  document.addEventListener('intersect', function(e) {
    if (e.detail.entry.isIntersecting) {
      e.detail.entry.target.classList.add('in-view');
    }
  });
  
  // Add CSS for the animated elements when they come into view
  const style = document.createElement('style');
  style.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .bar.open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .bar.open:nth-child(2) {
      opacity: 0;
    }
    
    .bar.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  `;
  document.head.appendChild(style);
});
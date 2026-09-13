/* ===================================================
   PEEHAR SINGH CHARAK - PORTFOLIO INTERACTION ENGINE
=================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initCanvasBackground();
  initNavigation();
  initContactForm();
  updateCurrentYear();
});

/* 1. Dynamic Typewriter Effect */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  const phrases = [
    'next-gen web engines.',
    'cyberpunk & dark interfaces.',
    'high-speed architectures.',
    'interactive digital systems.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      speed = 40;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      speed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      speed = 1500; // Pause at end of sentence
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400; // Pause before new sentence
    }

    setTimeout(type, speed);
  }

  type();
}

/* 2. Interactive Red Mesh & Particle Background */
function initCanvasBackground() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle configuration
  const particles = [];
  const particleCount = Math.floor(window.innerWidth / 25);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw Subtle Cyber Grid
    ctx.strokeStyle = 'rgba(255, 30, 68, 0.025)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Connect & Draw Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = 'rgba(255, 30, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect near dots
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < 110) {
          ctx.strokeStyle = `rgba(255, 30, 68, ${0.12 * (1 - dist / 110)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* 3. Mobile Navigation Toggle & Smooth Link Clicks */
function initNavigation() {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links a');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 4. Contact Form Handler (Simulated Payload) */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = 'Transmitting Data...';

    setTimeout(() => {
      feedback.style.display = 'block';
      feedback.style.color = '#ff1e44';
      feedback.textContent = '>> TRANSMISSION DELIVERED TO PEEHAR SINGH CHARAK <<';
      btn.disabled = false;
      btn.textContent = 'Send Transmission';
      form.reset();

      setTimeout(() => {
        feedback.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

/* 5. Set Automatic Year */
function updateCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Animate skill bars on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width =
        entry.target.dataset.width || entry.target.style.width;
    }
  });
}, observerOptions);

// Observe skill progress bars
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    bar.dataset.width = width;
    observer.observe(bar);
  });
});

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector(
      'input[placeholder="Subject"]'
    ).value;
    const message = contactForm.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Add loading animation for page elements
window.addEventListener("load", () => {
  const elements = document.querySelectorAll(
    ".education-card, .project-card, .certification-card"
  );
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";

    setTimeout(() => {
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }
});

// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll(
  ".education-card, .project-card, .certification-card, .skill-item, .tool-item"
);

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("revealed");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

// Add CSS for reveal animation
const style = document.createElement("style");
style.textContent = `
    .education-card, .project-card, .certification-card, .skill-item, .tool-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .education-card.revealed, .project-card.revealed, .certification-card.revealed, 
    .skill-item.revealed, .tool-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #6366f1 !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Initialize reveal on page load
document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
});

// Add particle effect to hero section (optional)
function createParticle() {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = "2px";
  particle.style.height = "2px";
  particle.style.background = "rgba(255, 255, 255, 0.5)";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.appendChild(particle);

    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const endX = startX + (Math.random() - 0.5) * 200;
    const endY = -10;
    const duration = Math.random() * 3000 + 2000;

    particle.style.left = startX + "px";
    particle.style.top = startY + "px";

    const animation = particle.animate(
      [
        { transform: "translate(0, 0)", opacity: 1 },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "linear",
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }
}

// Create particles periodically
setInterval(createParticle, 500);

// Add smooth reveal for sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  sectionObserver.observe(section);
});

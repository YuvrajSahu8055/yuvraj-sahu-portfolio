const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navAnchors.forEach(anchor => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Reveal-on-scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Active navigation item
const sections = document.querySelectorAll("section[id]");
const updateActiveNav = () => {
  const current = [...sections]
    .filter(section => window.scrollY >= section.offsetTop - 180)
    .pop()?.id;

  navAnchors.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Small cursor glow on desktop
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  if (window.innerWidth > 900) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

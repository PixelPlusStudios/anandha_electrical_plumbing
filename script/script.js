/* =====================
   ANANDHA ELECTRICAL & PLUMBING WORKS
   script.js
   ===================== */

// ── Smooth nav background on scroll ──────────────────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(13,27,42,0.99)';
  } else {
    nav.style.background = 'rgba(13,27,42,0.97)';
  }
});

// ── Scroll-reveal animation for cards ────────────────────────────
const revealElements = document.querySelectorAll(
  '.service-card, .review-card, .why-feature, .why-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 6) * 80}ms`;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// Add .revealed class styles dynamically
const revealStyle = document.createElement('style');
revealStyle.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(revealStyle);

// ── Active nav link highlight on scroll ──────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// Inject active nav style
const navStyle = document.createElement('style');
navStyle.textContent = '.active-nav { color: #E8BB6A !important; }';
document.head.appendChild(navStyle);

// ── Smooth scroll for anchor links ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Floating call button tooltip ─────────────────────────────────
const floatBtn = document.querySelector('.float-call');
if (floatBtn) {
  const tooltip = document.createElement('span');
  tooltip.textContent = 'Call Now';
  tooltip.style.cssText = `
    position: absolute;
    right: 68px;
    background: #0D1B2A;
    color: #E8BB6A;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 6px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    border: 1px solid rgba(200,151,58,0.3);
  `;
  floatBtn.style.position = 'fixed';
  floatBtn.appendChild(tooltip);

  floatBtn.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
  floatBtn.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
}

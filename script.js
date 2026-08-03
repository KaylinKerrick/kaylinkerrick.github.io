// Mark the current page's nav link as active
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPath = new URL(link.href).pathname.split('/').pop() || 'index.html';
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});

// Scroll-triggered slide-up animations
const animTargets = [
  '.content-section',
  '.card',
  '.experience-item',
  '.process-step',
  '.page-header',
  '.img-grid',
  '.img-featured',
  '.home-hero',
  '.involvement-block',
  '.section-with-photo',
  '.hero-banner',
  '.pdf-embed',
  '.media-placeholder',
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(animTargets.join(', ')).forEach((el, i) => {
  el.classList.add('animate-up');
  // Stagger cards and process steps relative to their siblings
  const parent = el.parentElement;
  if (el.classList.contains('card') || el.classList.contains('process-step') || el.classList.contains('experience-item')) {
    const siblings = Array.from(parent.children).filter(c => c.classList.contains(el.classList[0]));
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 0.08}s`;
  }
  observer.observe(el);
});

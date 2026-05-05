// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  links.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + current ? 'var(--brown)' : '';
  });
});

// Animate on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.service-card, .testimonial, .gallery-item, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ✅ Formulario Formspree sin redirección
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/mnjwvpvr', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.innerHTML = `
          <div style="text-align:center;padding:3.5rem 2rem;background:var(--cream);border:1px solid var(--sand);border-radius:2px;">
            <div style="font-size:3.5rem;margin-bottom:1.25rem">🎉</div>
            <h3 style="font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:400;color:var(--dark);margin-bottom:0.75rem">
              ¡Mensaje enviado!
            </h3>
            <p style="color:var(--muted);font-size:0.95rem;line-height:1.8;max-width:340px;margin:0 auto">
              Gracias por contactarnos.<br>
              Te responderemos en menos de <strong style="color:var(--brown)">24 horas</strong>.
            </p>
          </div>`;
      } else {
        btn.textContent = '❌ Error al enviar. Intenta de nuevo.';
        btn.disabled = false;
        btn.style.background = '#c0392b';
      }
    } catch {
      btn.textContent = '❌ Error de conexión. Intenta de nuevo.';
      btn.disabled = false;
      btn.style.background = '#c0392b';
    }
  });
}
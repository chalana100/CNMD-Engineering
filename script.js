// CNMD Engineering — navigation, scroll effects and quote form
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Update active navigation item while scrolling.
const pageSections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
pageSections.forEach(section => navObserver.observe(section));

// Quote form: validate details and prepare an email for the workshop.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('formMessage');

  if (!name || !phone || !service || !message) {
    feedback.textContent = 'Please complete all fields to prepare your enquiry.';
    feedback.className = 'form-message error';
    return;
  }

  feedback.textContent = 'Opening your email application…';
  feedback.className = 'form-message';
  const recipient = 'cnmdengineering@gmail.com';
  const subject = `Repair enquiry: ${service}`;
  const body = `Name: ${name}\nPhone: ${phone}\nService: ${service}\n\nVehicle / repair details:\n${message}`;
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();

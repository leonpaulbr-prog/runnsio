// ===========================
// STARS GENERATION
// ===========================
const starsContainer = document.getElementById('heroStars');
if (starsContainer) {
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('span');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.width = (Math.random() > 0.7 ? 3 : 2) + 'px';
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }
}

// ===========================
// TASK LIST ANIMATION
// ===========================
function animateTasks() {
  const items = document.querySelectorAll('.task-item');
  items.forEach((item, i) => {
    item.classList.remove('visible');
    setTimeout(() => item.classList.add('visible'), i * 300);
  });
}
const tasksObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateTasks();
  });
}, { threshold: 0.3 });
const tasksList = document.querySelector('.tasks-anim');
if (tasksList) tasksObserver.observe(tasksList);

// ===========================
// CHATBOT TYPING ANIMATION
// ===========================
const chatTyping = document.getElementById('chatTyping');
if (chatTyping) {
  const phrases = ['Sch...', 'Schedule email...', 'Send to leads...', 'Automate workflow...'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  function typeWriter() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      chatTyping.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeWriter, 1200);
        return;
      }
    } else {
      chatTyping.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeWriter, deleting ? 60 : 100);
  }
  typeWriter();
}

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(8,8,8,0.97)';
  } else {
    navbar.style.background = 'rgba(8,8,8,0.85)';
  }
});

// ===========================
// MOBILE MENU
// ===========================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ===========================
// SCROLL REVEAL
// ===========================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      let delay = 0;
      siblings.forEach(el => {
        if (el === entry.target || entry.target.contains(el)) {
          setTimeout(() => el.classList.add('visible'), delay);
          delay += 80;
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ===========================
// FAQ ACCORDION
// ===========================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===========================
// CONTACT FORM
// ===========================
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Mensaje enviado';
  btn.style.background = '#2ecc71';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===========================
// SMOOTH SCROLL FOR ANCHORS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

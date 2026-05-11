/* ================================================
   DROÏDE – Animations
   Collège Saint-Sacrement
================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HERO ENTRANCE ── */
  const heroEls = [
    { el: document.querySelector('.hero-eyebrow'),  delay: 100 },
    { el: document.querySelector('.hero-title'),    delay: 350 },
    { el: document.querySelector('.hero-desc'),     delay: 600 },
    { el: document.querySelector('.hero-cta'),      delay: 850 },
    { el: document.querySelector('.hero-badge'),    delay: 1100 },
  ];

  heroEls.forEach(({ el, delay }) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });

  /* ── HERO IMAGE REVEAL ── */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.clipPath = 'inset(0 100% 0 0)';
    heroVisual.style.transition = 'clip-path 1s cubic-bezier(.77,0,.18,1)';
    setTimeout(() => {
      heroVisual.style.clipPath = 'inset(0 0% 0 0)';
    }, 80);
  }

// Compteur animé sur les stats
const stats = document.querySelector('.stats');
if (stats) {
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;

    document.querySelectorAll('.stat-n').forEach((el, i) => {
      setTimeout(() => {
        const target = el.textContent.trim();
        const num = parseInt(target);
        let count = 0;

        const timer = setInterval(() => {
          count++;
          el.textContent = isNaN(num) ? count : count;
          if (count >= (isNaN(num) ? 99 : num)) {
            clearInterval(timer);
            el.textContent = target; 
          }
        }, isNaN(num) ? 10 : 1000 / num);

      }, i * 100);
    });

    stats.unobserve?.(); // stop observer
  }, { threshold: 0.4 }).observe(stats);
}
  /* ── ABOUT CARDS SCROLL REVEAL ── */
  const aboutCards = document.querySelectorAll('.about-card');
  if (aboutCards.length) {
    aboutCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(32px)';
      card.style.transition = `opacity 0.6s ${i * 0.15}s ease, transform 0.6s ${i * 0.15}s ease`;
    });

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    aboutCards.forEach(card => cardObserver.observe(card));
  }

  /* ── NAV CARDS SCROLL REVEAL ── */
  const navCards = document.querySelectorAll('.nav-card');
  if (navCards.length) {
    navCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px)';
      card.style.transition = `opacity 0.55s ${i * 0.12}s ease, transform 0.55s ${i * 0.12}s ease`;
    });

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          navObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    navCards.forEach(card => navObserver.observe(card));
  }

  /* ── NAVBAR SCROLL SHADOW ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ── NAV ACTIVE LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  /* ── HERO PARALLAX ── */
  const heroImg = document.querySelector('.hero-visual img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroImg.style.transform = `translateY(${scrolled * 0.18}px)`;
    }, { passive: true });
  }

  /* ── SECTION TITLE REVEAL ── */
  const sectionTitles = document.querySelectorAll('.section-title, .section-label');
  if (sectionTitles.length) {
    sectionTitles.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    sectionTitles.forEach(el => titleObserver.observe(el));
  }

  /* ── BUTTON RIPPLE EFFECT ── */
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        width: 10px; height: 10px;
        left: ${e.clientX - rect.left - 5}px;
        top: ${e.clientY - rect.top - 5}px;
        transform: scale(0);
        animation: ripple 0.5s linear;
        pointer-events: none;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* Ripple keyframe */
 // if (!document.getElementById('ripple-style')) {
    //const style = document.createElement('style');
    //style.id = 'ripple-style';
    //style.textContent = `
     // @keyframes ripple {
        //to { transform: scale(30); opacity: 0; }
      //}
    //`;
    d//ocument.head.appendChild(style);
  //}

});

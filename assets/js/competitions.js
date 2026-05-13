/* ================================================
   DROÏDE – Page Compétitions
   - Reveal-on-scroll
================================================ */

(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
})();

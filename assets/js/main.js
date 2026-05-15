/* ================================================
   DROÏDE – Comportements partagés
   - Transitions de page (entrée/sortie)
   - Bascules d'onglets (showTab / showLevel)
================================================ */

/* ── PAGE TRANSITIONS ── */
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const url = new URL(link.href, location.href);
  const isSamePage = url.href === location.href;
  const isInternal = url.origin === location.origin;
  const isNewTab = link.target === '_blank' || e.metaKey || e.ctrlKey;
  const isDownload = link.hasAttribute('download');

  if (!isInternal || isSamePage || isNewTab || isDownload) return;

  e.preventDefault();
  document.body.classList.remove('page-enter');
  document.body.classList.add('page-exit');

  setTimeout(() => {
    window.location.href = url.href;
  }, 350);
});

/* ── TAB SWITCHERS ── */
function showTab(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.level-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
  document.querySelector('.tabs-bar').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showLevel(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.level-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('level-' + id).classList.add('active');
  document.querySelector('.tabs-bar').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── GALLERY YEAR FILTER ── */
function filterGalleryYear(year) {
  let visible = 0;
  document.querySelectorAll('.gallery-grid .gallery-item').forEach(item => {
    const match = year === 'all' || item.dataset.year === year;
    item.classList.toggle('is-hidden', !match);
    if (match) visible++;
  });

  const empty = document.getElementById('galleryEmpty');
  if (empty) empty.hidden = visible !== 0;
}

// script.js - complete for Editkaro site
// - Includes filtering, lightbox player, hover effects, and form submission via image-beacon GET (no CORS).
// - Webhook: your deployed Google Apps Script (doGet handles query params).
// - Logo path (local) is included as a constant if you want to use it in your HTML: see LOGO_PATH.

// ----------------- CONFIG -----------------
const webhook = 'https://script.google.com/macros/s/AKfycabwHZE2E53FtngpfL0fwh08kn0aSsxElqfl0klhHGRp4EZ3_7lh4hqVWg3oP0MuzgorMJMQ/exec';

// LOCAL logo path (uploaded image in this environment) - use this path if you add logo file to repo or to preview locally
// (developer note: this is the local uploaded file path you used earlier)
const LOGO_PATH = '/mnt/data/Screenshot 2025-11-25 144917.png';

// ----------------- UTIL: send via GET beacon (avoids CORS) -----------------
function sendViaBeacon(paramsObj) {
  const parts = [];
  for (const k in paramsObj) {
    if (!Object.prototype.hasOwnProperty.call(paramsObj, k)) continue;
    parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(paramsObj[k] || ''));
  }
  const url = webhook + (parts.length ? ('?' + parts.join('&')) : '');
  // Using an Image object triggers a simple GET request that avoids CORS on static pages
  const img = new Image();
  img.src = url;
  // cleanup after a short time
  setTimeout(() => { img.src = ''; }, 5000);
  return true;
}

// ----------------- DOM LOADED -----------------
document.addEventListener('DOMContentLoaded', () => {

  // -------- Portfolio filtering --------
  const filterButtons = document.querySelectorAll('.filters .btn');
  const cards = Array.from(document.querySelectorAll('.card'));

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filters .btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filter = e.currentTarget.dataset.filter || 'all';
      if (filter === 'all') {
        cards.forEach(c => c.style.display = '');
      } else {
        cards.forEach(card => {
          const cats = card.dataset.category.split(' ').map(x => x.trim().toLowerCase());
          card.style.display = cats.includes(filter) ? '' : 'none';
        });
      }
    });
  });

  // -------- Lightbox / player --------
  const lightbox = document.getElementById('lightbox');
  const lbClose = document.getElementById('lbClose');
  const lbBackdrop = document.getElementById('lbBackdrop');
  const videoWrap = document.getElementById('videoWrap');

  function openLightbox(videoId) {
    // Use YouTube embed with autoplay
    videoWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    if (lightbox) lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    if (lightbox) lightbox.setAttribute('aria-hidden', 'true');
    if (videoWrap) videoWrap.innerHTML = '';
  }

  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const id = thumb.dataset.videoid;
      if (id) openLightbox(id);
    });
    thumb.addEventListener('mouseenter', () => {
      thumb.style.transform = 'scale(1.03)';
      thumb.style.transition = 'transform .18s';
    });
    thumb.addEventListener('mouseleave', () => {
      thumb.style.transform = '';
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // -------- Forms: use beacon GET so no CORS issues --------

  // Email collector (home page)
  const emailForm = document.getElementById('emailForm');
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('emailName') || {}).value || '';
      const email = (document.getElementById('emailAddress') || {}).value || '';
      // send via beacon GET
      sendViaBeacon({ formType: 'subscribe', name: name.trim(), email: email.trim() });
      // immediate success UX (server write happens asynchronously)
      alert('Subscribed — thank you!');
      emailForm.reset();
    });
  }

  // Contact form (contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        formType: 'contact',
        name: (document.getElementById('cname') || {}).value || '',
        email: (document.getElementById('cemail') || {}).value || '',
        phone: (document.getElementById('cphone') || {}).value || '',
        message: (document.getElementById('cmessage') || {}).value || ''
      };
      sendViaBeacon({
        formType: data.formType,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        message: data.message.trim()
      });
      alert('Message sent — thank you!');
      contactForm.reset();
    });
  }

  // accessibility: focus first interactive element if landing with keyboard nav
  // (optional small improvement)
  const mainFocusable = document.querySelector('.main a, .main button, .main input, .main textarea');
  if (mainFocusable) mainFocusable.setAttribute('tabindex', '0');

}); // DOMContentLoaded end

// ----------------- Optional helper: function to swap logo src if you want to use local file -----------------
// Use this if you later add the uploaded image to the repo and want header <img id="siteLogo">
function applyLocalLogo() {
  try {
    const logoEl = document.getElementById('siteLogo');
    if (logoEl && LOGO_PATH) {
      // If you move the image into your repo, change LOGO_PATH to relative path (e.g., 'images/logo.png')
      logoEl.src = LOGO_PATH;
    }
  } catch (e) {
    // ignore
  }
}
// call optionally if you set <img id="siteLogo"> in your header
// applyLocalLogo();

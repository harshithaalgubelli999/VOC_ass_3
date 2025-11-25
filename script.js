// script.js - final (beacon GET to avoid CORS)
const webhook = 'https://script.google.com/macros/s/AKfycabwHZE2E53FtngpfL0fwh08kn0aSsxElqfl0klhHGRp4EZ3_7lh4hqVWg3oP0MuzgorMJMQ/exec';

function sendViaBeacon(paramsObj) {
  const parts = [];
  for (const k in paramsObj) {
    if (!Object.prototype.hasOwnProperty.call(paramsObj, k)) continue;
    parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(paramsObj[k] || ''));
  }
  const url = webhook + (parts.length ? ('?' + parts.join('&')) : '');
  const img = new Image();
  img.src = url;
  setTimeout(() => { img.src = ''; }, 5000);
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const emailForm = document.getElementById('emailForm');
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('emailName') || {}).value || '';
      const email = (document.getElementById('emailAddress') || {}).value || '';
      sendViaBeacon({ formType: 'subscribe', name: name.trim(), email: email.trim() });
      alert('Subscribed — thank you!');
      emailForm.reset();
    });
  }

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
});

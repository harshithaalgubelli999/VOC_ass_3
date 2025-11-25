// script.js: filtering, lightbox, and simple form submit helpers
document.addEventListener('DOMContentLoaded', () => {
  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.filters .btn');
  const cards = Array.from(document.querySelectorAll('.card'));

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filters .btn').forEach(b=>b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filter = e.currentTarget.dataset.filter || 'all';
      if(filter === 'all'){
        cards.forEach(c => c.style.display = '');
      } else {
        cards.forEach(card => {
          const cats = card.dataset.category.split(' ').map(x=>x.trim().toLowerCase());
          card.style.display = cats.includes(filter) ? '' : 'none';
        });
      }
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbClose = document.getElementById('lbClose');
  const lbBackdrop = document.getElementById('lbBackdrop');
  const videoWrap = document.getElementById('videoWrap');

  function openLightbox(videoId){
    videoWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    videoWrap.innerHTML = '';
  }

  document.querySelectorAll('.thumb').forEach(thumb=>{
    thumb.addEventListener('click', ()=> {
      const id = thumb.dataset.videoid;
      if(id) openLightbox(id);
    });
    thumb.addEventListener('mouseenter', () => {
      thumb.style.transform = 'scale(1.03)';
      thumb.style.transition = 'transform .18s';
    });
    thumb.addEventListener('mouseleave', () => {
      thumb.style.transform = '';
    });
  });

  if(lbClose) lbClose.addEventListener('click', closeLightbox);
  if(lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLightbox();
  });

  // Email collector (home page)
  const emailForm = document.getElementById('emailForm');
  if(emailForm){
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('emailName').value;
      const email = document.getElementById('emailAddress').value;
      // Replace BELOW_WEBHOOK_URL with your Google Apps Script / webhook endpoint
      // after (example)
const webhook = 'https://script.google.com/macros/s/AKfycbx...your_deployed_id.../exec';

// Email collector (home page)
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('emailName').value;
    const email = document.getElementById('emailAddress').value;
    fetch(webhook, {
      method: 'POST',
      body: JSON.stringify({ formType: 'subscribe', name, email }),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(res => {
      if (res.status === 'ok') alert('Subscribed — thank you!');
      else alert('Submission failed.');
      emailForm.reset();
    }).catch(err => {
      console.error(err);
      alert('Submission failed (network).');
    });
  });
}

// Contact form (contact.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      formType: 'contact',
      name: document.getElementById('cname').value,
      email: document.getElementById('cemail').value,
      phone: document.getElementById('cphone').value,
      message: document.getElementById('cmessage').value
    };
    fetch(webhook, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(res => {
      if (res.status === 'ok') alert('Message sent — thank you!');
      else alert('Failed to send. Check webhook.');
      contactForm.reset();
    }).catch(err => {
      console.error(err);
      alert('Submission failed (network).');
    });
  });
}

      if(webhook === 'REPLACE_WITH_YOUR_WEBHOOK_URL'){
        alert('Thank you! (Demo)\nTo store emails to a sheet, set up a Google Apps Script webhook and paste its URL into script.js');
        emailForm.reset();
        return;
      }
      fetch(webhook, {
        method: 'POST',
        body: JSON.stringify({name, email}),
        headers: {'Content-Type':'application/json'}
      }).then(r => {
        if(r.ok) alert('Subscribed — thank you!');
        else alert('Failed to submit. Check webhook.');
        emailForm.reset();
      }).catch(err => {
        console.error(err);
        alert('Submission failed (network).');
      });
    });
  }

  // Contact form (contact.html)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('cname').value,
        email: document.getElementById('cemail').value,
        phone: document.getElementById('cphone').value,
        message: document.getElementById('cmessage').value
      };
      const webhook = 'REPLACE_WITH_YOUR_WEBHOOK_URL';
      if(webhook === 'REPLACE_WITH_YOUR_WEBHOOK_URL'){
        alert('Message queued (demo).\nTo enable real submissions, add your webhook URL in script.js');
        contactForm.reset();
        return;
      }
      fetch(webhook, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type':'application/json'}
      }).then(r => {
        if(r.ok) alert('Message sent — thank you!');
        else alert('Failed to send. Check webhook.');
        contactForm.reset();
      }).catch(err => {
        console.error(err);
        alert('Submission failed (network).');
      });
    });
  }
});

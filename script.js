// Google Script Webhook URL (yours)
const webhook = "https://script.google.com/macros/s/AKfycabwHZE2E53FtngpfL0fwh08kn0aSsxElqfl0klhHGRp4EZ3_7lh4hqVWg3oP0MuzgorMJMQ/exec";

// Helper to send data using GET + Beacon (CORS safe)
function sendToSheet(params) {
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    let url = webhook + "?" + query;

    let img = new Image();
    img.src = url;  // trigger request
    setTimeout(() => { img.src = ""; }, 3000);
}

// ==========================
// SUBSCRIBE FORM
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const emailForm = document.getElementById("emailForm");

    if (emailForm) {
        emailForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let name = document.getElementById("emailName").value.trim();
            let email = document.getElementById("emailAddress").value.trim();

            sendToSheet({
                formType: "subscribe",
                name: name,
                email: email
            });

            alert("Subscribed — thank you!");
            emailForm.reset();
        });
    }

    // ==========================
    // CONTACT FORM
    // ==========================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let data = {
                formType: "contact",
                name: document.getElementById("cname").value.trim(),
                email: document.getElementById("cemail").value.trim(),
                phone: document.getElementById("cphone").value.trim(),
                message: document.getElementById("cmessage").value.trim()
            };

            sendToSheet(data);

            alert("Message sent — thank you!");
            contactForm.reset();
        });
    }
});

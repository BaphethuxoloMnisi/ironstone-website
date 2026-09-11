/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// Close the mobile menu after a link is tapped
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});


/* ==========================================================================
   Scrollspy — highlight the nav link for the section in view
   ========================================================================== */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-bar");

function setActiveLink() {
    let currentSection = sections[0]?.id;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${currentSection}`) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);


/* ==========================================================================
   Footer Year
   ========================================================================== */
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}


/* ==========================================================================
   Contact Form — sends the message as an email
   ========================================================================== */
/*
   This site has no backend, so the form opens the visitor's own email
   client with the message pre-filled and addressed to Ironstone. The
   visitor just has to hit send in their mail app.

   If you'd rather have messages submitted silently (no mail app popup),
   swap this out for a form backend such as Formspree (formspree.io) or
   EmailJS (emailjs.com) — both work with a static site like this one.
   Update RECIPIENT_EMAIL below either way.
*/
const RECIPIENT_EMAIL = "info@ironstone.co.za";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formNote.textContent = "Please fill in every field before sending.";
            formNote.classList.add("error");
            return;
        }

        const mailSubject = encodeURIComponent(`[Website Enquiry] ${subject}`);
        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

        // Opens the visitor's default email app with everything filled in
        window.location.href = mailtoLink;

        formNote.classList.remove("error");
        formNote.textContent = "Opening your email app — hit send to reach us.";
        contactForm.reset();
    });
}
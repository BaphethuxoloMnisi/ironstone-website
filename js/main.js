/* =====================================================
   MAIN SCRIPT
   Builds the shared header and footer, and runs the
   navigation, back-to-top button and scroll animations.
   Requires js/config.js to be loaded first.
===================================================== */

const page = document.body.dataset.page;

/* ---------- Header ---------- */
function buildHeader() {
  const links = NAV.map(([file, label]) => {
    const current = file === page;
    return `<a href="${file}.html" class="${current ? "active" : ""}" ${current ? 'aria-current="page"' : ""}>${label}</a>`;
  }).join("");

  return `
    <header class="nav">
      <div class="container bar">
        <a class="logo" href="index.html" aria-label="IRONSTONE home">
          <img
            src="assets/images/logo.png"
            alt="IRONSTONE logo"
            height="55"
            onerror="this.outerHTML='<b>I</b><span>IRONSTONE<small>(Pty) Ltd</small></span>'"
          />
        </a>

        <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
          <i class="fa-solid fa-bars"></i>
        </button>

        <nav id="menu" aria-label="Primary">
          ${links}
          <a class="btn btn-gold" href="contact.html?quote=1#form">Request a Quote</a>
        </nav>
      </div>
    </header>`;
}

/* ---------- Footer ---------- */
function buildFooter() {
  const social = Object.entries(CFG.social)
    .filter(([, url]) => url)
    .map(
      ([name, url]) =>
        `<a href="${url}" aria-label="${name}" rel="noopener"><i class="fa-brands fa-${name}"></i></a>`,
    )
    .join("");

  const companyLinks = [NAV[0], NAV[1], NAV[4]]
    .map(([file, label]) => `<li><a href="${file}.html">${label}</a></li>`)
    .join("");

  const serviceLinks = DIV.map(
    ([id, label]) => `<li><a href="services.html#${id}">${label}</a></li>`,
  ).join("");

  const whatsapp = CFG.whatsapp
    ? `<a id="wa" class="float" href="https://wa.me/${CFG.whatsapp}" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`
    : "";

  return `
    <footer>
      <div class="container">
        <div class="fgrid">
          <div>
            <h4>IRONSTONE (Pty) Ltd.</h4>
            <p>Delivering solutions through innovation, collaboration and excellence.</p>
            <div class="social">${social}</div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>${companyLinks}</ul>
          </div>

          <div>
            <h4>Our Services</h4>
            <ul>${serviceLinks}</ul>
          </div>

          <div>
            <h4>Contact</h4>
            <address style="font-style: normal; display: grid; gap: 0.5rem">
              <a href="mailto:${CFG.email}">${CFG.email}</a>
              <a href="tel:${CFG.tel}">${CFG.phone}</a>
              <span>${CFG.address}</span>
              <span>${CFG.region}</span>
            </address>
          </div>
        </div>

        <div class="corp">
          <span><strong>${CFG.bbbee}</strong> · Reg. No. ${CFG.reg} · Private Company (Pty) Ltd</span>
          <span>© <span id="yr"></span> ${CFG.name} All rights reserved.</span>
        </div>
      </div>
    </footer>

    <button id="top" class="float" aria-label="Back to top">
      <i class="fa-solid fa-arrow-up"></i>
    </button>
    ${whatsapp}`;
}

document.getElementById("site-header").innerHTML = buildHeader();
document.getElementById("site-footer").innerHTML = buildFooter();

/* ---------- Fill in config values (data-cfg="reg", etc.) ---------- */
document.querySelectorAll("[data-cfg]").forEach((el) => {
  el.textContent = CFG[el.dataset.cfg];
});
document.getElementById("yr").textContent = new Date().getFullYear();

/* ---------- Mobile menu: hamburger <-> X ---------- */
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
const burgerIcon = burger.querySelector("i");

function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  burgerIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setMenu(false);
});

/* ---------- Back to top ---------- */
const topBtn = document.getElementById("top");
topBtn.addEventListener("click", () => window.scrollTo({ top: 0 }));
window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 600), {
  passive: true,
});

/* ---------- Scroll reveal animations ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

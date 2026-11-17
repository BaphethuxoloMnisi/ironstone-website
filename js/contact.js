/* Contact form – validation + mailto hand-off. Set FORM_ENDPOINT to a backend/email service (e.g. Formspree) to send directly. */
const FORM_ENDPOINT = "";
const f = document.getElementById("enquiry");
if (f) {
  if (new URLSearchParams(location.search).get("quote"))
    f.category.value = "Procurement and supply";
  const rules = {
    name: (v) => v.trim().length > 1 || "Enter your full name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
    phone: (v) => !v || /^[+\d\s()-]{9,}$/.test(v) || "Enter a valid phone number.",
    category: (v) => !!v || "Choose an enquiry category.",
    subject: (v) => v.trim().length > 2 || "Enter a subject.",
    message: (v) => v.trim().length >= 10 || "Message must be at least 10 characters.",
  };
  f.onsubmit = async (e) => {
    e.preventDefault();
    let ok = true;
    const m = document.getElementById("msg");
    m.className = "msg";
    for (const k in rules) {
      const el = f[k],
        r = rules[k](el.value);
      el.setAttribute("aria-invalid", r !== true);
      document.getElementById("e-" + k).textContent = r === true ? "" : r;
      if (r !== true) ok = false;
    }
    if (!ok) {
      m.className = "msg bad";
      m.textContent = "Please correct the highlighted fields and try again.";
      return;
    }
    const d = Object.fromEntries(new FormData(f));
    if (FORM_ENDPOINT) {
      try {
        const r = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d),
        });
        if (!r.ok) throw 0;
        m.className = "msg ok";
        m.textContent = "Thank you. Your enquiry has been sent.";
        f.reset();
        return;
      } catch {
        m.className = "msg bad";
        m.textContent = "Sending failed. Please email us directly.";
        return;
      }
    }
    const body = `Name: ${d.name}\nCompany: ${d.company}\nPhone: ${d.phone}\nCategory: ${d.category}\n\n${d.message}`;
    location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
    m.className = "msg ok";
    m.textContent =
      "Your email app should now open with your enquiry ready to send. This form is not yet connected to an automatic delivery service, so please press Send in your email app.";
  };
}

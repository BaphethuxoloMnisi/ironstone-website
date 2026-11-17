/* Project data – edit here. Add url/tech/requirements once confirmed by IRONSTONE. */
const U = (i, w = 900) => `https://images.unsplash.com/${i}?auto=format&fit=crop&w=${w}&q=70`;
const PROJECTS = [
  {
    n: "Zinikeleni Secondary School",
    c: "Education",
    d: "Website development and digital platform solutions for a secondary school.",
    img: U("photo-1503676260728-1c00da094a0b"),
    tech: "",
    url: "",
    scope: "Website development and digital platform solutions.",
  },
  {
    n: "Maretlagadi Welfare Centre",
    c: "Community & Welfare",
    d: "Digital platforms and technology solutions for a welfare centre.",
    img: U("photo-1488521787991-ed7bbaae773c"),
    tech: "",
    url: "",
    scope: "Digital platforms and technology solutions.",
  },
  {
    n: "Mabuza Holdings",
    c: "Business",
    d: "Corporate website development.",
    img: U("photo-1460925895917-afdab827c52f"),
    tech: "",
    url: "",
    scope: "Website development.",
  },
  {
    n: "Emkhontweni Nutriwell",
    c: "Health & Nutrition",
    d: "Website development for a nutrition-focused business.",
    img: U("photo-1547658719-da2b51169166"),
    tech: "",
    url: "",
    scope: "Website development.",
  },
];
const grid = document.getElementById("projectGrid"),
  dlg = document.getElementById("pd");
if (grid) {
  grid.innerHTML = PROJECTS.map(
    (p, i) => `<article class="card reveal in">
<img loading="lazy" src="${p.img}" alt="${p.n} – ${p.c} project visual">
<div class="in">
<span class="tag">${p.c}</span>
<h3>${p.n}</h3>
<p>${p.d}</p>
<p>
<small>Technologies: ${p.tech || "[to be confirmed]"}</small>
</p>
<button class="btn btn-dark" data-i="${i}">View Project Details</button>${p.url ? `<a class="link" href="${p.url}" rel="noopener" target="_blank">Visit live site</a>` : ""}</div>
</article>`,
  ).join("");
  grid.onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const p = PROJECTS[b.dataset.i];
    dlg.innerHTML = `<h2>${p.n}</h2>
<p class="tag">${p.c}</p>
<h3 style="margin-top:1rem">Scope of work</h3>
<p>${p.scope}</p>
<h3 style="margin-top:1rem">Client requirements</h3>
<p>[To be supplied by IRONSTONE]</p>
<h3 style="margin-top:1rem">Solution &amp; technology</h3>
<p>[To be supplied by IRONSTONE]</p>
<div class="btns">
<button class="btn btn-dark" onclick="pd.close()">Close</button>
</div>`;
    dlg.showModal();
  };
}

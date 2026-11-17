/* Renders news cards from NEWS (js/news-data.js), filters by category and opens articles in a dialog. */
const grid = document.getElementById("newsGrid"),
  dlg = document.getElementById("nd");
const list = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
const fmt = (d) =>
  new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
function draw(c = "All") {
  const l = list.filter((n) => c === "All" || n.cat === c);
  grid.innerHTML = l.length
    ? l
        .map(
          (n) => `<article class="card">
<img loading="lazy" src="${n.img}" alt="${n.title}">
<div class="in">
<span class="tag">${n.cat} · <time datetime="${n.date}">${fmt(n.date)}</time>
</span>
<h3>${n.title}</h3>
<p>${n.intro}</p>
<button class="link" data-i="${list.indexOf(n)}">Read More</button>
</div>
</article>`,
        )
        .join("")
    : "<p>No articles have been published in this category yet.</p>";
}
document.getElementById("cats").onclick = (e) => {
  if (e.target.dataset.c) draw(e.target.dataset.c);
};
grid.onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const n = list[b.dataset.i];
  dlg.innerHTML = `<span class="tag">${n.cat} · ${fmt(n.date)}</span>
<h2 style="margin:.5rem 0 1rem">${n.title}</h2>${n.body.map((p) => `<p style="margin-bottom:1rem">${p}</p>`).join("")}<button class="btn btn-dark" onclick="nd.close()">Close</button>`;
  dlg.showModal();
};
draw();

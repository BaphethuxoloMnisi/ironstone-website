/* Mobile menu */
var m = document.querySelector('.menu'), n = document.getElementById('nav');
if (m && n) {
  m.addEventListener('click', function () { var o = n.classList.toggle('open'); m.setAttribute('aria-expanded', o); });
  n.addEventListener('click', function (e) { if (e.target.tagName === 'A') { n.classList.remove('open'); m.setAttribute('aria-expanded', false); } });
}

/* Enquiry form (contact page only) */
var form = document.getElementById('enquiry');
if (form) {
  var TO = 'hello@yourdomain.com'; /* replace with your email, or swap for your own form handler/API */
  var sel = document.getElementById('svc');
  /* Pre-select the service when arriving from a service page: contact.html?service=custom-software */
  var want = new URLSearchParams(location.search).get('service');
  if (want && sel) { for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].value === want) sel.selectedIndex = i; } }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form), svc = sel.options[sel.selectedIndex].text;
    var b = 'Name: ' + d.get('n') + '\nOrganisation: ' + d.get('o') + '\nInterest: ' + svc + '\n\n' + d.get('m');
    location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Enquiry from ' + d.get('n')) + '&body=' + encodeURIComponent(b);
  });
}

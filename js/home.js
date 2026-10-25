/* Home page only: services accordion, testimonials, contact form. */
(function () {
var C = window.BM_DATA || {}, track = window.BM.track;
var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

$$('#svc details').forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) $$('#svc details').forEach(function (o) { if (o !== d) o.open = false; }); }); });
$$('[data-service]').forEach(function (a) { a.addEventListener('click', function () { $('#s').value = a.dataset.service; track('proposal_click', { service: a.dataset.service }); }); });

var tms = C.testimonials || [];
if (tms.length) { $('#testimonials').hidden = false; $('#tm').innerHTML = tms.map(function (t) { return '<div class="card"><p>“' + esc(t.quote) + '”</p><h3>' + esc(t.name) + '</h3><p>' + esc(t.role) + ', ' + esc(t.company) + '</p></div>'; }).join(''); }

var f = $('#form'), msg = $('#msg');
function err(id, t) { var el = $('#' + id); $('#' + id + '-e').textContent = t || ''; el.setAttribute('aria-invalid', !!t); }
f.addEventListener('submit', function (ev) {
  ev.preventDefault(); msg.textContent = '';
  if (f._gotcha && f._gotcha.value) return;
  var bad = null;
  [['n', $('#n').value.trim(), 'Please enter your full name.'], ['c', $('#c').value.trim(), 'Please enter your company or brand.'], ['e', /^\S+@\S+\.\S+$/.test($('#e').value.trim()), 'Please enter a valid email address.'], ['s', $('#s').value, 'Please choose a service.']].forEach(function (r) { var ok = !!r[1]; err(r[0], ok ? '' : r[2]); if (!ok && !bad) bad = r[0]; });
  if (bad) { $('#' + bad).focus(); return; }
  if (!C.FORM_ENDPOINT) { msg.textContent = 'The form is not connected yet. Please email hello@boomerangmedia.me or use WhatsApp.'; return; }
  var btn = f.querySelector('button'); btn.disabled = true; msg.textContent = 'Sending…';
  fetch(C.FORM_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(f) })
    .then(function (r) { if (!r.ok) throw 0; f.reset(); msg.textContent = 'Thank you! Your inquiry was sent. We’ll get back to you shortly.'; track('generate_lead', { form: 'inquiry' }); })
    .catch(function () { msg.textContent = 'Something went wrong. Please email hello@boomerangmedia.me or use WhatsApp.'; })
    .then(function () { btn.disabled = false; });
});
})();

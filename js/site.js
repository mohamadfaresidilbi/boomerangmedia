/* Boomerang Media: shared script (every page). Needs js/data.js loaded first. */
(function () {
var C = window.BM_DATA || {};
var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
window.dataLayer = window.dataLayer || [];
function track(ev, p) { var o = { event: ev }; for (var k in p || {}) o[k] = p[k]; dataLayer.push(o); }
window.BM = { track: track, data: C };
try { if (C.GTM_ID && localStorage.getItem('consent') === 'yes') { var g = document.createElement('script'); g.async = 1; g.src = 'https://www.googletagmanager.com/gtm.js?id=' + C.GTM_ID; document.head.appendChild(g); } } catch (e) {}

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
var cats = {}; (C.categories || []).forEach(function (c) { cats[c.slug] = c; });
var projects = C.projects || [];

/* ---- projects: cards, filters, tiles, featured, next ---- */
function card(p, i) {
  var c = cats[p.cat] || { name: '' };
  var bg = p.cover ? ' style="background-image:url(\'/assets/projects/' + esc(p.slug) + '/' + esc(p.cover) + '\')"' : '';
  return '<a class="pc" href="/projects/' + esc(p.slug) + '.html" data-cat="' + esc(p.cat) + '"><span class="bg g' + (i % 5 + 1) + '"' + bg + '></span><span class="ct"><small>' + esc(c.name) + '</small><h3>' + esc(p.name) + '</h3><span class="more">View project →</span></span></a>';
}
var grid = $('#grid');
if (grid) {
  var lim = parseInt(grid.dataset.limit, 10) || projects.length;
  grid.innerHTML = projects.slice(0, lim).map(card).join('');
  var used = (C.categories || []).filter(function (c) { return projects.some(function (p) { return p.cat === c.slug; }); });
  var fl = $('#filters');
  if (fl && used.length > 1) {
    fl.innerHTML = [{ slug: '', name: 'All' }].concat(used).map(function (c, i) { return '<button class="fb" aria-pressed="' + (i === 0) + '" data-c="' + esc(c.slug) + '">' + esc(c.name) + '</button>'; }).join('');
    fl.addEventListener('click', function (e) {
      var b = e.target.closest('.fb'); if (!b) return;
      $$('#filters .fb').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      $$('#grid .pc').forEach(function (p) { p.hidden = !!b.dataset.c && p.dataset.cat !== b.dataset.c; });
      track('portfolio_filter', { category: b.dataset.c || 'All' });
    });
  }
  var tiles = $('#tiles');
  if (tiles) {
    if (used.length) { tiles.innerHTML = used.map(function (c, i) { return '<button class="tile" data-c="' + esc(c.slug) + '"><span class="bg g' + (i % 5 + 1) + '"></span><span>' + esc(c.name) + '</span></button>'; }).join(''); $('#industries').hidden = false; }
    tiles.addEventListener('click', function (e) {
      var t = e.target.closest('.tile'); if (!t) return;
      var b = $$('#filters .fb').filter(function (x) { return x.dataset.c === t.dataset.c; })[0];
      if (b) b.click();
      $('#work').scrollIntoView();
    });
  }
}
var feat = $('#feat');
if (feat) {
  var fp = projects.filter(function (p) { return p.featured; });
  if (fp.length) { feat.innerHTML = fp.map(card).join(''); $('#featured').hidden = false; }
}
var nx = $('#next-project'), me = document.body.dataset.project;
if (nx && me && projects.length > 1) {
  var k = projects.map(function (p) { return p.slug; }).indexOf(me), n = projects[(k + 1) % projects.length];
  if (k > -1) nx.innerHTML = '<small>Next project</small><a class="nx" href="/projects/' + esc(n.slug) + '.html">' + esc(n.name) + '</a>';
}

/* ---- scroll reveal ---- */
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1 });
  $$('.rv').forEach(function (e) { io.observe(e); });
} else { $$('.rv').forEach(function (e) { e.classList.add('in'); }); }

/* ---- header + footer ---- */
function include(id, url) {
  var el = document.getElementById(id); if (!el) return Promise.resolve();
  return fetch(url).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(function (h) { el.outerHTML = h; }).catch(function () { console.warn('Could not load ' + url + ' (open the site through a web server, not file://)'); });
}
function wa() { return C.WA_NUMBER ? 'https://wa.me/' + C.WA_NUMBER + '?text=' + encodeURIComponent('Hi Boomerang Media! I’d like to discuss a project with your team.') : ''; }
function init() {
  var nav = $('nav');
  if (nav) { var sc = function () { nav.classList.toggle('sc', scrollY > 40); }; addEventListener('scroll', sc, { passive: true }); sc(); }
  var b = $('#burger'), m = $('#menu');
  if (b && m) {
    var set = function (o) { b.classList.toggle('open', o); m.classList.toggle('open', o); b.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; };
    b.onclick = function () { set(!m.classList.contains('open')); };
    $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    addEventListener('resize', function () { if (innerWidth > 860) set(false); });
  }
  if ('IntersectionObserver' in window) {
    var map = {};
    var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) $$('.nl a:not(.btn)').forEach(function (a) { a.classList.toggle('act', a === map['#' + e.target.id]); }); }); }, { rootMargin: '-45% 0px -50% 0px' });
    $$('.nl a:not(.btn)').forEach(function (a) { var t = a.hash && document.querySelector(a.hash); if (t) { map[a.hash] = a; so.observe(t); } });
  }
  var w = wa();
  $$('.wa2,#wa').forEach(function (a) { if (w) a.href = w; else (a.closest('li') || a).remove(); });
  $$('[data-social]').forEach(function (a) { var u = (C.social || {})[a.dataset.social]; if (u) a.href = u; else a.closest('li').remove(); });
  var wb = $('#wa'); if (wb) wb.addEventListener('click', function () { track('whatsapp_click'); });
  if (location.hash) { var t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }
}
Promise.all([include('site-header', '/partials/header.html'), include('site-footer', '/partials/footer.html')]).then(init);
})();

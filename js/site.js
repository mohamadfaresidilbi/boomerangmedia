/* Boomerang Media: shared script (every page). Needs js/data.js loaded first. */
(function () {
var C = window.BM_DATA || {};
var scr = document.currentScript || document.querySelector('script[src*="js/site.js"]');
var ROOT = scr.src.replace(/js\/site\.js.*$/, '');   /* works from any folder, domain or file:// */
var HEADER = "<nav><div class=\"wrap\">\n<a href=\"{R}index.html\" class=\"logo\" aria-label=\"Boomerang Media home\"><svg viewBox=\"0 0 220 120\" aria-hidden=\"true\"><path fill=\"#f7931e\" d=\"M5 98C-3 86 8 72 24 56C56 24 90 6 118 6C152 6 188 34 213 84C220 98 206 108 194 98C176 80 150 46 118 46C96 46 68 66 38 100C28 110 12 108 5 98Z\"/></svg>boomerang</a>\n<div class=\"nl\"><a href=\"{R}index.html#hero\">Home</a><a href=\"{R}index.html#work\">Our Work</a><a href=\"{R}index.html#services\">Services</a><a href=\"{R}index.html#about\">About</a><a href=\"{R}index.html#contact\">Contact</a><a href=\"{R}index.html#contact\" class=\"btn\" data-track=\"nav_cta\">Let’s Talk</a></div>\n<button id=\"burger\" aria-label=\"Open menu\" aria-expanded=\"false\" aria-controls=\"menu\"><i></i><i></i></button>\n</div></nav>\n<div id=\"menu\"><a href=\"{R}index.html#hero\">Home</a><a href=\"{R}index.html#work\">Our Work</a><a href=\"{R}index.html#services\">Services</a><a href=\"{R}index.html#about\">About</a><a href=\"{R}index.html#contact\">Contact</a><a href=\"{R}index.html#contact\" class=\"btn\">Let’s Talk</a></div>\n";
var FOOTER = "<footer><div class=\"wrap\">\n<div class=\"fg\">\n<div><h4>Boomerang Media</h4><p>Creative Production &amp; Marketing Agency</p><p style=\"color:var(--mut)\">We create. We connect. We make an impact.</p></div>\n<div><h4>Quick links</h4><ul><li><a href=\"{R}index.html#work\">Our Work</a></li><li><a href=\"{R}index.html#services\">Services</a></li><li><a href=\"{R}index.html#about\">About</a></li><li><a href=\"{R}index.html#contact\">Contact</a></li></ul></div>\n<div><h4>Connect</h4><ul><li><a href=\"#\" data-social=\"instagram\" target=\"_blank\" rel=\"noopener\">Instagram</a></li><li><a href=\"#\" data-social=\"linkedin\" target=\"_blank\" rel=\"noopener\">LinkedIn</a></li><li><a href=\"#\" data-social=\"facebook\" target=\"_blank\" rel=\"noopener\">Facebook</a></li><li><a href=\"mailto:hello@boomerangmedia.me\">hello@boomerangmedia.me</a></li><li><a href=\"#\" class=\"wa2\" target=\"_blank\" rel=\"noopener\">WhatsApp</a></li><li>Lebanon</li></ul></div>\n</div>\n<div class=\"gi\" aria-hidden=\"true\">boomerang</div>\n<div class=\"fb2\"><span>© 2026 Boomerang Media</span><span><a href=\"{R}privacy.html\">Privacy Policy</a></span></div>\n</div></footer>\n";
function put(id, h) { var el = document.getElementById(id); if (el) el.outerHTML = h.replace(/\{R\}/g, ROOT); }
put('site-header', HEADER); put('site-footer', FOOTER);
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
  var bg = p.cover ? ' style="background-image:url(\'' + ROOT + 'assets/projects/' + esc(p.slug) + '/' + esc(p.cover) + '\')"' : '';
  return '<a class="pc" href="' + ROOT + 'projects/' + esc(p.slug) + '.html" data-cat="' + esc(p.cat) + '"><span class="bg g' + (i % 5 + 1) + '"' + bg + '></span><span class="ct"><small>' + esc(c.name) + '</small><h3>' + esc(p.name) + '</h3><span class="more">View project →</span></span></a>';
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
  if (k > -1) nx.innerHTML = '<small>Next project</small><a class="nx" href="' + ROOT + 'projects/' + esc(n.slug) + '.html">' + esc(n.name) + '</a>';
}

/* ---- scroll reveal ---- */
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1 });
  $$('.rv').forEach(function (e) { io.observe(e); });
} else { $$('.rv').forEach(function (e) { e.classList.add('in'); }); }

/* ---- header + footer behaviour ---- */
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
init();
})();

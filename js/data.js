/* ==========================================================================
   BOOMERANG MEDIA: SITE DATA. This is the ONLY file you edit to add clients.
   ========================================================================== */
window.BM_DATA = {

  /* ---- Settings ---- */
  WA_NUMBER: '',        // WhatsApp, digits only with country code, e.g. '9611234567'. Empty = WhatsApp buttons hidden.
  FORM_ENDPOINT: '',    // Formspree / Web3Forms URL, e.g. 'https://formspree.io/f/abcd1234'
  GTM_ID: '',           // Google Tag Manager, e.g. 'GTM-XXXXXXX'
  HOME_LIMIT: 12,       // how many projects show on the home page (all show on /work.html)
  social: {
    instagram: 'https://www.instagram.com/boomerangmedia.me/',
    linkedin: '',       // empty = link hidden
    facebook: ''
  },

  /* ---- Industries (filters + tiles). slug = short id used by projects below ---- */
  categories: [
    { slug: 'hospitality', name: 'Hospitality & F&B' },
    { slug: 'healthcare',  name: 'Healthcare' },
    { slug: 'beauty',      name: 'Beauty & Lifestyle' },
    { slug: 'corporate',   name: 'Corporate & Commercial' }
  ],

  /* ---- Clients / projects. Order here = order on the site (also drives "next project").
     slug      -> page is /projects/<slug>.html and images live in /assets/projects/<slug>/
     cat       -> one of the category slugs above
     featured  -> true = also shown in "Case studies" on the home page
     cover     -> image file name inside /assets/projects/<slug>/ (e.g. 'cover.jpg'). Empty = colour gradient.
     ---- */
  projects: [
    { slug: 'candele',   name: 'Candele Resto Lounge',      cat: 'hospitality', featured: true,  cover: '' },
    { slug: 'rawad',     name: 'Dr. Rawad Rachwan',         cat: 'healthcare',  featured: true,  cover: '' },
    { slug: 'moonfluff', name: 'Moonfluff | Bakery & Café', cat: 'hospitality', featured: false, cover: '' },
    { slug: 'sybelle',   name: 'Sybelle | Psychomotrician', cat: 'healthcare',  featured: false, cover: '' },
    { slug: 'lola',      name: 'Lola Cosmetics | UAE',      cat: 'beauty',      featured: false, cover: '' },
    { slug: 'mcdo',      name: 'McDonald’s Lebanon',        cat: 'hospitality', featured: false, cover: '' }
  ],

  /* ---- Testimonials: add only real, approved quotes. Empty = section hidden. ----
     { quote: '...', name: 'Full Name', role: 'Title', company: 'Company' } */
  testimonials: []
};

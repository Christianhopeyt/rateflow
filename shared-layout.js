// shared-layout.js
const SITE_URL = 'https://rateflowcurrency.netlify.app';
const GA_ID    = 'G-5HPX9Z4PRQ';

/* ── Google Analytics ── */
function injectAnalytics() {
  if (document.getElementById('rf-ga')) return;
  const s1 = document.createElement('script');
  s1.id='rf-ga'; s1.async=true;
  s1.src=`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s1);
  const s2 = document.createElement('script');
  s2.textContent=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;
  document.head.appendChild(s2);
}

/* ── Theme ── */
function initTheme() {
  const saved = localStorage.getItem('rf-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}
function applyThemeIcon() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const icon  = document.getElementById('theme-icon');
  if (!icon) return;
  const r = window.location.pathname.includes('/blog/') ? '../' : '';
  icon.src = r + (theme==='dark' ? 'icons/moon.svg' : 'icons/sun.svg');
  icon.alt = theme==='dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

/* ── SVG icons (inline, theme-aware via currentColor) ── */
const I = {
  home:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  converter:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  rates:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>`,
  bell:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  star:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  blog:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  info:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  mail:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  lock:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  file:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  cookie:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/></svg>`,
  chevron:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  guide:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};
function icon(name, cls='nav-icon') {
  return `<span class="${cls}" aria-hidden="true">${I[name]||''}</span>`;
}

/* ── Navbar ── */
function injectNavbar(activePage) {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const isInBlog = window.location.pathname.includes('/blog/');
  const r = isInBlog ? '../' : '';

  nav.innerHTML = `
    <div class="nav-inner">

      <a href="${r}index.html" class="nav-logo">

      <a href="${r}" class="nav-logo">

        <div class="nav-logo-icon"><img src="${r}icon-192.png" alt="RateFlow" width="34" height="34"></div>
        <span class="nav-logo-text">RateFlow</span>
      </a>
      <ul class="nav-links">

        <li><a href="${r}index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>

        <li><a href="${r}" ${activePage==='home'?'class="active"':''}>Home</a></li>

        <li class="nav-dropdown">
          <a href="${r}blog" class="nav-drop-trigger" ${activePage==='blog'?'class="active"':''}>
            Articles ${icon('chevron','nav-chevron')}
          </a>
          <ul class="nav-sub">
            <li><a href="${r}blog">${icon('blog')} All Articles</a></li>
            <li><a href="${r}blog/wise-cheapest-way-send-money-abroad">${icon('rates')} Wise Guides</a></li>
            <li><a href="${r}blog/remitly-best-app-send-money-africa">${icon('rates')} Remitly Guides</a></li>
            <li><a href="${r}blog/western-union-cash-pickup-guide">${icon('rates')} Western Union Guides</a></li>
            <li><a href="${r}blog/usd-to-eur-guide">${icon('rates')} Exchange Rate Guides</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <a href="${r}tools" class="nav-drop-trigger" ${activePage==='tools'?'class="active"':''}>
            Tools ${icon('chevron','nav-chevron')}
          </a>
          <ul class="nav-sub">

            <li><a href="${r}index.html#converter">${icon('converter')} Currency Converter</a></li>
            <li><a href="${r}index.html#rates">${icon('rates')} Live Rates</a></li>

            <li><a href="${r}#converter">${icon('converter')} Currency Converter</a></li>
            <li><a href="${r}#rates">${icon('rates')} Live Rates</a></li>

            <li><a href="${r}tools">${icon('calculator')} Calculator Tools</a></li>
            <li><a href="${r}alerts">${icon('bell')} Rate Alerts</a></li>
            <li><a href="${r}favorites">${icon('star')} Favorites</a></li>
            <li><a href="${r}guide">${icon('guide')} How-to Guide</a></li>
          </ul>
        </li>
        <li><a href="${r}about" ${activePage==='about'?'class="active"':''}>About</a></li>
        <li><a href="${r}contact" ${activePage==='contact'?'class="active"':''}>Contact</a></li>
      </ul>
      <div class="nav-right">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark/light mode" title="Toggle dark/light mode">
          <img src="${r}icons/moon.svg" alt="Toggle theme" id="theme-icon" width="18" height="18">
        </button>

        <a href="${r}index.html#affiliate" class="btn-gradient nav-cta-btn">Send Money</a>

        <a href="${r}#affiliate" class="btn-gradient nav-cta-btn">Send Money</a>

        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" role="dialog" aria-hidden="true">

      <a href="${r}index.html" ${activePage==='home'?'class="active"':''}>${icon('home','mob-icon')} Home</a>
      <div class="mob-section-label">Tools</div>
      <a href="${r}index.html#converter">${icon('converter','mob-icon')} Currency Converter</a>
      <a href="${r}index.html#rates">${icon('rates','mob-icon')} Live Rates</a>

      <a href="${r}" ${activePage==='home'?'class="active"':''}>${icon('home','mob-icon')} Home</a>
      <div class="mob-section-label">Tools</div>
      <a href="${r}#converter">${icon('converter','mob-icon')} Currency Converter</a>
      <a href="${r}#rates">${icon('rates','mob-icon')} Live Rates</a>

      <a href="${r}tools" ${activePage==='tools'?'class="active"':''}>${icon('calculator','mob-icon')} Calculator Tools</a>
      <a href="${r}alerts" ${activePage==='alerts'?'class="active"':''}>${icon('bell','mob-icon')} Rate Alerts</a>
      <a href="${r}favorites" ${activePage==='favs'?'class="active"':''}>${icon('star','mob-icon')} Favorites</a>
      <a href="${r}guide" ${activePage==='guide'?'class="active"':''}>${icon('guide','mob-icon')} How-to Guide</a>
      <div class="mob-section-label">Articles</div>
      <a href="${r}blog" ${activePage==='blog'?'class="active"':''}>${icon('blog','mob-icon')} All Articles</a>
      <a href="${r}blog/wise-cheapest-way-send-money-abroad">${icon('rates','mob-icon')} Wise Guides</a>
      <a href="${r}blog/remitly-best-app-send-money-africa">${icon('rates','mob-icon')} Remitly Guides</a>
      <a href="${r}blog/western-union-cash-pickup-guide">${icon('rates','mob-icon')} Western Union</a>
      <div class="mob-section-label">Company</div>
      <a href="${r}about" ${activePage==='about'?'class="active"':''}>${icon('info','mob-icon')} About</a>
      <a href="${r}contact" ${activePage==='contact'?'class="active"':''}>${icon('mail','mob-icon')} Contact</a>
      <div class="mob-section-label">Legal</div>
      <a href="${r}privacy-policy">${icon('lock','mob-icon')} Privacy Policy</a>
      <a href="${r}terms">${icon('file','mob-icon')} Terms of Service</a>
      <a href="${r}cookies">${icon('cookie','mob-icon')} Cookie Notice</a>

      <a href="${r}index.html#affiliate" class="btn-gradient" style="margin-top:16px;width:100%;justify-content:center;padding:14px;">Send Money Free</a>

      <a href="${r}#affiliate" class="btn-gradient" style="margin-top:16px;width:100%;justify-content:center;padding:14px;">Send Money Free</a>

    </div>
  `;

  applyThemeIcon();

  /* Hamburger */
  const hbg = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      const open = hbg.classList.toggle('open');
      mob.classList.toggle('open', open);
      hbg.setAttribute('aria-expanded', String(open));
      mob.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hbg.classList.remove('open'); mob.classList.remove('open');
      hbg.setAttribute('aria-expanded','false'); mob.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && mob.classList.contains('open')) {
        hbg.classList.remove('open'); mob.classList.remove('open');
        hbg.setAttribute('aria-expanded','false'); mob.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
      }
    });
  }

  /* Desktop dropdowns */
  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    dd.querySelector('.nav-drop-trigger')?.addEventListener('click', e => {
      e.preventDefault();
      const was = dd.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      if (!was) dd.classList.add('open');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dropdown'))
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  });

  /* Active highlight — works with clean URLs */
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const curSlug  = pathname.split('/').pop() || '';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const raw = (a.getAttribute('href') || '').split('?')[0].split('#')[0].replace(/\/$/, '');
    if (!raw || raw === '#') return;
    if (raw === pathname || raw === curSlug || raw === '/' + curSlug ||

        (pathname === '/' && (raw === '' || raw === '/' || raw === 'index.html'))) {

        (pathname === '/' && (raw === '' || raw === '/' || raw === '/'))) {

      a.classList.add('active');
    }
  });

  /* Theme toggle */
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const t = document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('rf-theme', t);
    applyThemeIcon();
  });
}

/* ── Footer ── */
function injectFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  const isInBlog = window.location.pathname.includes('/blog/');
  const r = isInBlog ? '../' : '';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">

          <a href="${r}index.html" class="nav-logo">

          <a href="${r}" class="nav-logo">

            <div class="nav-logo-icon"><img src="${r}icon-192.png" alt="RateFlow" width="34" height="34"></div>
            <span class="nav-logo-text">RateFlow</span>
          </a>
          <p>Real-time exchange rates for 170+ currencies including all African currencies. Free, no signup, forever.</p>
        </div>
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>

            <li><a href="${r}index.html#converter"><span class="ft-icon">${I.converter}</span> Currency Converter</a></li>
            <li><a href="${r}index.html#rates"><span class="ft-icon">${I.rates}</span> Live Rates</a></li>

            <li><a href="${r}#converter"><span class="ft-icon">${I.converter}</span> Currency Converter</a></li>
            <li><a href="${r}#rates"><span class="ft-icon">${I.rates}</span> Live Rates</a></li>

            <li><a href="${r}tools"><span class="ft-icon">${I.calculator}</span> Calculator Tools</a></li>
            <li><a href="${r}alerts"><span class="ft-icon">${I.bell}</span> Rate Alerts</a></li>
            <li><a href="${r}favorites"><span class="ft-icon">${I.star}</span> Favorites</a></li>
            <li><a href="${r}guide"><span class="ft-icon">${I.guide}</span> How-to Guide</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="${r}blog"><span class="ft-icon">${I.blog}</span> Blog</a></li>
            <li><a href="${r}about"><span class="ft-icon">${I.info}</span> About</a></li>
            <li><a href="${r}contact"><span class="ft-icon">${I.mail}</span> Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="${r}privacy-policy"><span class="ft-icon">${I.lock}</span> Privacy Policy</a></li>
            <li><a href="${r}terms"><span class="ft-icon">${I.file}</span> Terms of Service</a></li>
            <li><a href="${r}cookies"><span class="ft-icon">${I.cookie}</span> Cookie Notice</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Rates sourced from open.er-api.com. For informational purposes only — not financial advice.</p>
        <p>Contains affiliate links. We may earn a small commission at no extra cost to you. &nbsp;|&nbsp; © ${new Date().getFullYear()} RateFlow. All rights reserved.</p>
      </div>
    </div>`;
}

/* ── Cookie Banner (modal popup) ── */
function injectCookieBanner() {
  if (localStorage.getItem('rf-cookie-consent')) return;
  const isInBlog = window.location.pathname.includes('/blog/');
  const r = isInBlog ? '../' : '';

  // Overlay backdrop
  const overlay = document.createElement('div');
  overlay.id = 'cookie-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(3px);z-index:9998;';
  document.body.appendChild(overlay);

  const b = document.createElement('div');
  b.className = 'cookie-popup'; b.id = 'cookie-popup';
  b.setAttribute('role','dialog');
  b.setAttribute('aria-modal','true');
  b.setAttribute('aria-labelledby','cookie-title');
  b.innerHTML = `
    <div class="cookie-popup-icon">${I.cookie}</div>
    <h2 id="cookie-title">We Value Your Privacy</h2>
    <p>RateFlow itself <strong>does not use cookies</strong>. However, our advertising partner <strong>Google AdSense</strong> may place cookies on your device to serve personalised ads based on your browsing history across the web. We have no control over those cookies.</p>
    <p>You can accept these third-party advertising cookies, decline them (ads will still show but won't be personalised), or manage your preferences at any time.</p>
    <div class="cookie-popup-links">
      <a href="${r}cookies">Cookie Notice</a> &nbsp;·&nbsp;
      <a href="${r}privacy-policy">Privacy Policy</a> &nbsp;·&nbsp;
      <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ad Settings</a>
    </div>
    <div class="cookie-popup-actions">
      <button class="cookie-btn-decline" id="cookie-decline">Decline</button>
      <button class="cookie-btn-accept"  id="cookie-accept">Accept All</button>
    </div>`;
  document.body.appendChild(b);

  const close = (val) => {
    localStorage.setItem('rf-cookie-consent', val);
    b.remove(); overlay.remove();
  };
  document.getElementById('cookie-accept').onclick  = () => close('accepted');
  document.getElementById('cookie-decline').onclick = () => close('declined');
}

/* ── Toast ── */
function showToast(msg, dur=3000) {
  let t = document.getElementById('rf-toast');
  if (!t) { t=document.createElement('div'); t.id='rf-toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'), dur);
}

injectAnalytics();

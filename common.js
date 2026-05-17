// common.js — RateFlow currency utilities
// All API calls go through /api/rates (Netlify serverless proxy)
// This means ZERO CORS issues regardless of domain name.

/* ════════════════════════════════════════
   LOCALSTORAGE CACHE
════════════════════════════════════════ */
function setCached(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch(e) {}
}
function getCached(key, ttlMs) {
  try {
    const item = JSON.parse(localStorage.getItem(key));
    if (item && Date.now() - item.ts < (ttlMs || 3600000)) return item.data;
  } catch {}
  return null;
}

/* ════════════════════════════════════════
   CURRENCY FLAGS
════════════════════════════════════════ */
const CURRENCY_FLAGS = {
  AED:'🇦🇪',AFN:'🇦🇫',ALL:'🇦🇱',AMD:'🇦🇲',ANG:'🇳🇱',AOA:'🇦🇴',ARS:'🇦🇷',
  AUD:'🇦🇺',AWG:'🇦🇼',AZN:'🇦🇿',BAM:'🇧🇦',BBD:'🇧🇧',BDT:'🇧🇩',BGN:'🇧🇬',
  BHD:'🇧🇭',BIF:'🇧🇮',BMD:'🇧🇲',BND:'🇧🇳',BOB:'🇧🇴',BRL:'🇧🇷',BSD:'🇧🇸',
  BTN:'🇧🇹',BWP:'🇧🇼',BYN:'🇧🇾',BZD:'🇧🇿',CAD:'🇨🇦',CDF:'🇨🇩',CHF:'🇨🇭',
  CLP:'🇨🇱',CNY:'🇨🇳',COP:'🇨🇴',CRC:'🇨🇷',CUP:'🇨🇺',CVE:'🇨🇻',CZK:'🇨🇿',
  DJF:'🇩🇯',DKK:'🇩🇰',DOP:'🇩🇴',DZD:'🇩🇿',EGP:'🇪🇬',ERN:'🇪🇷',ETB:'🇪🇹',
  EUR:'🇪🇺',FJD:'🇫🇯',GBP:'🇬🇧',GEL:'🇬🇪',GHS:'🇬🇭',GMD:'🇬🇲',GNF:'🇬🇳',
  GTQ:'🇬🇹',GYD:'🇬🇾',HKD:'🇭🇰',HNL:'🇭🇳',HTG:'🇭🇹',HUF:'🇭🇺',IDR:'🇮🇩',
  ILS:'🇮🇱',INR:'🇮🇳',IQD:'🇮🇶',IRR:'🇮🇷',ISK:'🇮🇸',JMD:'🇯🇲',JOD:'🇯🇴',
  JPY:'🇯🇵',KES:'🇰🇪',KGS:'🇰🇬',KHR:'🇰🇭',KMF:'🇰🇲',KRW:'🇰🇷',KWD:'🇰🇼',
  KYD:'🇰🇾',KZT:'🇰🇿',LAK:'🇱🇦',LBP:'🇱🇧',LKR:'🇱🇰',LRD:'🇱🇷',LSL:'🇱🇸',
  LYD:'🇱🇾',MAD:'🇲🇦',MDL:'🇲🇩',MGA:'🇲🇬',MKD:'🇲🇰',MMK:'🇲🇲',MNT:'🇲🇳',
  MOP:'🇲🇴',MRU:'🇲🇷',MUR:'🇲🇺',MVR:'🇲🇻',MWK:'🇲🇼',MXN:'🇲🇽',MYR:'🇲🇾',
  MZN:'🇲🇿',NAD:'🇳🇦',NGN:'🇳🇬',NIO:'🇳🇮',NOK:'🇳🇴',NPR:'🇳🇵',NZD:'🇳🇿',
  OMR:'🇴🇲',PAB:'🇵🇦',PEN:'🇵🇪',PGK:'🇵🇬',PHP:'🇵🇭',PKR:'🇵🇰',PLN:'🇵🇱',
  PYG:'🇵🇾',QAR:'🇶🇦',RON:'🇷🇴',RSD:'🇷🇸',RUB:'🇷🇺',RWF:'🇷🇼',SAR:'🇸🇦',
  SBD:'🇸🇧',SCR:'🇸🇨',SDG:'🇸🇩',SEK:'🇸🇪',SGD:'🇸🇬',SHP:'🇸🇭',SLL:'🇸🇱',
  SOS:'🇸🇴',SRD:'🇸🇷',SSP:'🇸🇸',STN:'🇸🇹',SYP:'🇸🇾',SZL:'🇸🇿',THB:'🇹🇭',
  TJS:'🇹🇯',TMT:'🇹🇲',TND:'🇹🇳',TOP:'🇹🇴',TRY:'🇹🇷',TTD:'🇹🇹',TWD:'🇹🇼',
  TZS:'🇹🇿',UAH:'🇺🇦',UGX:'🇺🇬',USD:'🇺🇸',UYU:'🇺🇾',UZS:'🇺🇿',VES:'🇻🇪',
  VND:'🇻🇳',VUV:'🇻🇺',WST:'🇼🇸',XAF:'🌍',XCD:'🌎',XOF:'🌍',XPF:'🇵🇫',
  YER:'🇾🇪',ZAR:'🇿🇦',ZMW:'🇿🇲',ZWL:'🇿🇼'
};
function getFlag(code) { return CURRENCY_FLAGS[code] || '💱'; }

/* ════════════════════════════════════════
   CURRENCY NAMES
════════════════════════════════════════ */
const CURRENCY_NAMES = {
  AED:'UAE Dirham',AFN:'Afghan Afghani',ALL:'Albanian Lek',AMD:'Armenian Dram',
  ANG:'Antillean Guilder',AOA:'Angolan Kwanza',ARS:'Argentine Peso',
  AUD:'Australian Dollar',AWG:'Aruban Florin',AZN:'Azerbaijani Manat',
  BAM:'Bosnia-Herzegovina Mark',BBD:'Barbadian Dollar',BDT:'Bangladeshi Taka',
  BGN:'Bulgarian Lev',BHD:'Bahraini Dinar',BIF:'Burundian Franc',
  BMD:'Bermudan Dollar',BND:'Brunei Dollar',BOB:'Bolivian Boliviano',
  BRL:'Brazilian Real',BSD:'Bahamian Dollar',BTN:'Bhutanese Ngultrum',
  BWP:'Botswanan Pula',BYN:'Belarusian Ruble',BZD:'Belize Dollar',
  CAD:'Canadian Dollar',CDF:'Congolese Franc',CHF:'Swiss Franc',
  CLP:'Chilean Peso',CNY:'Chinese Yuan',COP:'Colombian Peso',
  CRC:'Costa Rican Colón',CUP:'Cuban Peso',CVE:'Cape Verdean Escudo',
  CZK:'Czech Koruna',DJF:'Djiboutian Franc',DKK:'Danish Krone',
  DOP:'Dominican Peso',DZD:'Algerian Dinar',EGP:'Egyptian Pound',
  ERN:'Eritrean Nakfa',ETB:'Ethiopian Birr',EUR:'Euro',
  FJD:'Fijian Dollar',GBP:'British Pound',GEL:'Georgian Lari',
  GHS:'Ghanaian Cedi',GMD:'Gambian Dalasi',GNF:'Guinean Franc',
  GTQ:'Guatemalan Quetzal',GYD:'Guyanaese Dollar',HKD:'Hong Kong Dollar',
  HNL:'Honduran Lempira',HTG:'Haitian Gourde',HUF:'Hungarian Forint',
  IDR:'Indonesian Rupiah',ILS:'Israeli Shekel',INR:'Indian Rupee',
  IQD:'Iraqi Dinar',IRR:'Iranian Rial',ISK:'Icelandic Króna',
  JMD:'Jamaican Dollar',JOD:'Jordanian Dinar',JPY:'Japanese Yen',
  KES:'Kenyan Shilling',KGS:'Kyrgystani Som',KHR:'Cambodian Riel',
  KMF:'Comorian Franc',KRW:'South Korean Won',KWD:'Kuwaiti Dinar',
  KYD:'Cayman Islands Dollar',KZT:'Kazakhstani Tenge',LAK:'Laotian Kip',
  LBP:'Lebanese Pound',LKR:'Sri Lankan Rupee',LRD:'Liberian Dollar',
  LSL:'Lesotho Loti',LYD:'Libyan Dinar',MAD:'Moroccan Dirham',
  MDL:'Moldovan Leu',MGA:'Malagasy Ariary',MKD:'Macedonian Denar',
  MMK:'Myanma Kyat',MNT:'Mongolian Tugrik',MOP:'Macanese Pataca',
  MRU:'Mauritanian Ouguiya',MUR:'Mauritian Rupee',MVR:'Maldivian Rufiyaa',
  MWK:'Malawian Kwacha',MXN:'Mexican Peso',MYR:'Malaysian Ringgit',
  MZN:'Mozambican Metical',NAD:'Namibian Dollar',NGN:'Nigerian Naira',
  NIO:'Nicaraguan Córdoba',NOK:'Norwegian Krone',NPR:'Nepalese Rupee',
  NZD:'New Zealand Dollar',OMR:'Omani Rial',PAB:'Panamanian Balboa',
  PEN:'Peruvian Sol',PGK:'Papua New Guinean Kina',PHP:'Philippine Peso',
  PKR:'Pakistani Rupee',PLN:'Polish Zloty',PYG:'Paraguayan Guarani',
  QAR:'Qatari Rial',RON:'Romanian Leu',RSD:'Serbian Dinar',
  RUB:'Russian Ruble',RWF:'Rwandan Franc',SAR:'Saudi Riyal',
  SBD:'Solomon Islands Dollar',SCR:'Seychellois Rupee',SDG:'Sudanese Pound',
  SEK:'Swedish Krona',SGD:'Singapore Dollar',SHP:'Saint Helena Pound',
  SLL:'Sierra Leonean Leone',SOS:'Somali Shilling',SRD:'Surinamese Dollar',
  SSP:'South Sudanese Pound',STN:'São Tomé & Príncipe Dobra',SYP:'Syrian Pound',
  SZL:'Swazi Lilangeni',THB:'Thai Baht',TJS:'Tajikistani Somoni',
  TMT:'Turkmenistani Manat',TND:'Tunisian Dinar',TOP:"Tongan Pa'anga",
  TRY:'Turkish Lira',TTD:'Trinidad & Tobago Dollar',TWD:'Taiwan Dollar',
  TZS:'Tanzanian Shilling',UAH:'Ukrainian Hryvnia',UGX:'Ugandan Shilling',
  USD:'US Dollar',UYU:'Uruguayan Peso',UZS:'Uzbekistani Som',
  VES:'Venezuelan Bolívar',VND:'Vietnamese Dong',VUV:'Vanuatu Vatu',
  WST:'Samoan Tala',XAF:'CFA Franc (Central Africa)',XCD:'East Caribbean Dollar',
  XOF:'CFA Franc (West Africa)',XPF:'CFP Franc',YER:'Yemeni Rial',
  ZAR:'South African Rand',ZMW:'Zambian Kwacha',ZWL:'Zimbabwean Dollar'
};

/* ════════════════════════════════════════
   API — calls our own Netlify proxy
   /api/rates?base=USD  →  /.netlify/functions/rates?base=USD
   Same-domain = no CORS, works on ANY Netlify subdomain or custom domain
════════════════════════════════════════ */
const _sessionCache = {};

async function _fetchBaseRates(base) {
  const key = `rf_rates_${base}`;

  // 1. In-memory (fastest — within page session)
  if (_sessionCache[key]) return _sessionCache[key];

  // 2. localStorage (survives page reload, 1-hour TTL)
  const stored = getCached(key, 3600000);
  if (stored) { _sessionCache[key] = stored; return stored; }

  // 3. Fetch from our own proxy — SAME ORIGIN, no CORS ever
  const res = await fetch(`/api/rates?base=${encodeURIComponent(base)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Proxy error ${res.status}`);
  }
  const data = await res.json();
  if (!data.rates) throw new Error('Invalid response from rates proxy');

  _sessionCache[key] = data;
  setCached(key, data);
  return data;
}

async function fetchRate(from, to) {
  if (from === to) return { rate: 1, date: new Date().toISOString().slice(0, 10) };
  const data = await _fetchBaseRates(from);
  let rate = data.rates[to];
  if (rate == null) {
    // Try inverse
    try {
      const inv = await _fetchBaseRates(to);
      const r = inv.rates[from];
      if (r) rate = 1 / r;
    } catch {}
  }
  if (rate == null) throw new Error(`Rate not available: ${from}/${to}`);
  return { rate: parseFloat(rate), date: data.date };
}

async function fetchAllRates(base, symbols) {
  const data = await _fetchBaseRates(base);
  if (!symbols) return { rates: data.rates, date: data.date };
  const rates = {};
  symbols.forEach(s => { if (data.rates[s] != null) rates[s] = data.rates[s]; });
  return { rates, date: data.date };
}

async function fetchCurrencies() {
  const cacheKey = 'rf_currencies_list';
  const stored   = getCached(cacheKey, 86400000); // 24h
  if (stored) return stored;

  // Build from our static names map — don't depend on API for the list
  // (API call is only needed for rates, not for currency discovery)
  const sorted = {};
  Object.keys(CURRENCY_NAMES).sort().forEach(k => { sorted[k] = CURRENCY_NAMES[k]; });

  // Add USD explicitly in case it wasn't in names (it is, but be safe)
  sorted['USD'] = sorted['USD'] || 'US Dollar';

  setCached(cacheKey, sorted);
  return sorted;
}

/* ════════════════════════════════════════
   FAVORITES
════════════════════════════════════════ */
function getFavorites() {
  try { return JSON.parse(localStorage.getItem('rf-favorites')) || []; } catch { return []; }
}
function saveFavorites(favs) {
  try { localStorage.setItem('rf-favorites', JSON.stringify(favs)); } catch {}
}
function toggleFavorite(from, to) {
  const favs = getFavorites();
  const key  = `${from}_${to}`;
  const idx  = favs.findIndex(f => f.key === key);
  if (idx >= 0) { favs.splice(idx, 1); saveFavorites(favs); return false; }
  favs.push({ key, from, to, added: Date.now() });
  saveFavorites(favs);
  return true;
}
function isFavorite(from, to) {
  return getFavorites().some(f => f.key === `${from}_${to}`);
}

/* ════════════════════════════════════════
   RATE ALERTS
════════════════════════════════════════ */
function getAlerts() {
  try { return JSON.parse(localStorage.getItem('rf-alerts')) || []; } catch { return []; }
}
function saveAlerts(a) {
  try { localStorage.setItem('rf-alerts', JSON.stringify(a)); } catch {}
}
function addAlert(from, to, targetRate, direction) {
  const a = getAlerts();
  a.push({ id: Date.now(), from, to, targetRate: parseFloat(targetRate), direction, created: Date.now(), triggered: false });
  saveAlerts(a);
}
function removeAlert(id) { saveAlerts(getAlerts().filter(a => a.id !== id)); }
async function checkAlerts() {
  const alerts = getAlerts().filter(a => !a.triggered);
  if (!alerts.length) return;
  const all = [...getAlerts()];
  for (const alert of alerts) {
    try {
      const { rate } = await fetchRate(alert.from, alert.to);
      const hit = alert.direction === 'above' ? rate >= alert.targetRate : rate <= alert.targetRate;
      if (hit) {
        const idx = all.findIndex(a => a.id === alert.id);
        if (idx >= 0) all[idx].triggered = true;
        if (typeof showToast === 'function')
          showToast(`🔔 ${alert.from}/${alert.to} reached ${formatAmount(rate)} — target ${alert.direction} ${alert.targetRate}`);
      }
    } catch {}
  }
  saveAlerts(all);
}

/* ════════════════════════════════════════
   THOUSAND SEPARATOR FORMATTER
════════════════════════════════════════ */
function formatAmount(value) {
  if (value === null || value === undefined || value === '') return '';
  const num = parseFloat(value);
  if (isNaN(num)) return String(value);
  const abs = Math.abs(num);
  const dec = abs >= 10000 ? 2 : abs >= 1 ? 4 : abs >= 0.01 ? 5 : 6;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  }).format(num);
}

/* ════════════════════════════════════════
   SEARCHABLE CURRENCY SELECT
   buildSearchSelect(containerEl, options, defaultVal, onChange)
   options: [{value, label, flag}]
════════════════════════════════════════ */
function buildSearchSelect(container, options, defaultValue, onChange) {
  if (!container) return;
  container.innerHTML = '';

  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'ss-btn';
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');

  const dropdown = document.createElement('div');
  dropdown.className = 'ss-dropdown';
  dropdown.setAttribute('role', 'listbox');

  const search = document.createElement('input');
  search.type = 'text'; search.className = 'ss-search';
  search.placeholder = 'Search currency…';
  search.setAttribute('aria-label', 'Search currency');
  search.setAttribute('autocomplete', 'off');
  search.setAttribute('autocorrect', 'off');
  search.setAttribute('spellcheck', 'false');

  const list = document.createElement('ul');
  list.className = 'ss-list';
  list.setAttribute('role', 'listbox');

  dropdown.appendChild(search);
  dropdown.appendChild(list);
  container.appendChild(btn);
  container.appendChild(dropdown);

  let selected = defaultValue;
  let open = false;

  function setSelected(val, fire = true) {
    selected = val;
    const opt = options.find(o => o.value === val);
    btn.innerHTML = opt
      ? `<span class="ss-flag">${opt.flag}</span><span class="ss-code">${opt.value}</span><span class="ss-chevron">▾</span>`
      : `<span class="ss-code">${val}</span><span class="ss-chevron">▾</span>`;
    list.querySelectorAll('.ss-item').forEach(li => {
      const active = li.dataset.value === val;
      li.classList.toggle('ss-active', active);
      li.setAttribute('aria-selected', String(active));
    });
    if (fire && typeof onChange === 'function') onChange(val);
    closeDD();
  }

  function renderList(q) {
    q = (q || '').toLowerCase().trim();
    list.innerHTML = '';
    const filtered = q
      ? options.filter(o => o.value.toLowerCase().includes(q) || o.label.toLowerCase().includes(q))
      : options;
    if (!filtered.length) {
      const li = document.createElement('li');
      li.className = 'ss-empty'; li.textContent = 'No currencies found';
      list.appendChild(li); return;
    }
    filtered.forEach(opt => {
      const li = document.createElement('li');
      li.className = 'ss-item' + (opt.value === selected ? ' ss-active' : '');
      li.dataset.value = opt.value;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(opt.value === selected));
      li.innerHTML = `<span class="ss-flag">${opt.flag}</span><span class="ss-code">${opt.value}</span><span class="ss-name">${opt.label}</span>`;
      li.addEventListener('mousedown', e => { e.preventDefault(); setSelected(opt.value); });
      li.addEventListener('touchend',  e => { e.preventDefault(); setSelected(opt.value); });
      list.appendChild(li);
    });
    list.querySelector('.ss-active')?.scrollIntoView({ block: 'nearest' });
  }

  function openDD() {
    // Close other open dropdowns
    document.querySelectorAll('.ss-dropdown.ss-open').forEach(d => {
      if (d !== dropdown) { d.classList.remove('ss-open'); }
    });
    open = true;
    dropdown.classList.add('ss-open');
    btn.setAttribute('aria-expanded', 'true');
    search.value = ''; renderList('');
    requestAnimationFrame(() => search.focus());
  }

  function closeDD() {
    open = false;
    dropdown.classList.remove('ss-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', e => { e.stopPropagation(); open ? closeDD() : openDD(); });
  search.addEventListener('input', () => renderList(search.value));
  search.addEventListener('keydown', e => {
    if (e.key === 'Escape')    { closeDD(); btn.focus(); }
    if (e.key === 'Enter')     { const f = list.querySelector('.ss-item'); if (f) setSelected(f.dataset.value); }
    if (e.key === 'ArrowDown') { moveHighlight(1); }
    if (e.key === 'ArrowUp')   { moveHighlight(-1); }
  });
  function moveHighlight(dir) {
    const items = [...list.querySelectorAll('.ss-item')];
    const cur   = list.querySelector('.ss-active');
    const idx   = items.indexOf(cur);
    const next  = items[(idx + dir + items.length) % items.length];
    if (next) { items.forEach(i => i.classList.remove('ss-active')); next.classList.add('ss-active'); next.scrollIntoView({ block: 'nearest' }); }
  }
  document.addEventListener('click', e => { if (!container.contains(e.target)) closeDD(); });

  // Initialise
  setSelected(defaultValue, false);

  // Public API
  container._ssGetValue  = () => selected;
  container._ssSetValue  = (v, fire) => setSelected(v, fire !== false);
  container._ssSetOptions = (newOpts) => {
    options.length = 0; newOpts.forEach(o => options.push(o));
    renderList(search.value); setSelected(selected, false);
  };
}

function buildCurrencyOptions(currencies) {
  return Object.keys(currencies).sort().map(code => ({
    value: code,
    label: currencies[code] || code,
    flag:  CURRENCY_FLAGS[code] || '💱'
  }));
}

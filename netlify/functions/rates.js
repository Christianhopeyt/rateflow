// netlify/functions/rates.js
// Serverless proxy for exchange rate APIs.
// Called as: /.netlify/functions/rates?base=USD
// Runs on Netlify's servers — zero CORS issues on any domain.

const ER_PRIMARY  = 'https://open.er-api.com/v6/latest';
const ER_FALLBACK = 'https://api.frankfurter.dev/v1/latest';
const XAF_PER_EUR = 655.957; // fixed peg

exports.handler = async function(event) {
  const base = (event.queryStringParameters?.base || 'USD').toUpperCase().trim();

  // Validate base currency (letters only, 2-4 chars)
  if (!/^[A-Z]{2,4}$/.test(base)) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Invalid base currency' })
    };
  }

  let data = null;

  // --- Try primary: open.er-api.com ---
  try {
    const res = await fetch(`${ER_PRIMARY}/${base}`);
    if (res.ok) {
      const json = await res.json();
      if (json.result === 'success' && json.rates) {
        data = normalise(json.rates, base, json.time_last_update_utc);
      }
    }
  } catch(e) {
    console.log('[rates] Primary API error:', e.message);
  }

  // --- Fallback: api.frankfurter.dev (ECB) ---
  if (!data) {
    try {
      const res = await fetch(`${ER_FALLBACK}?base=${base}`);
      if (res.ok) {
        const json = await res.json();
        if (json.rates) {
          data = normalise(json.rates, base, json.date);
        }
      }
    } catch(e) {
      console.log('[rates] Fallback API error:', e.message);
    }
  }

  if (!data) {
    return {
      statusCode: 502,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'All upstream APIs failed. Please try again.' })
    };
  }

  return {
    statusCode: 200,
    headers: {
      ...corsHeaders(),
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
};

function normalise(rates, base, rawDate) {
  const r = { ...rates };
  r[base] = 1; // always include self

  // Inject XAF/XOF via EUR peg if possible
  if (base === 'EUR') {
    r['XAF'] = XAF_PER_EUR;
    r['XOF'] = XAF_PER_EUR;
  } else if (r['EUR']) {
    r['XAF'] = parseFloat((r['EUR'] * XAF_PER_EUR).toFixed(4));
    r['XOF'] = parseFloat((r['EUR'] * XAF_PER_EUR).toFixed(4));
  }

  return {
    base,
    date: formatDate(rawDate),
    rates: r
  };
}

function formatDate(raw) {
  if (!raw) return new Date().toISOString().slice(0, 10);
  try {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  } catch {}
  return String(raw).slice(0, 10);
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

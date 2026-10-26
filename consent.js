// Public website identifier; not an account credential.
const analyticsToken = 'a021badab1504eac98abb776ae501c18';
const preferenceKey = 'carvajal-analytics-preference';
let loaded = false;
function readPreference() { try { return localStorage.getItem(preferenceKey); } catch { return null; } }
function loadAnalytics() {
  if (loaded || readPreference() !== 'yes' || !/^[a-f0-9]{32}$/i.test(analyticsToken)) return;
  loaded = true;
  const script = document.createElement('script');
  script.id = 'carvajal-analytics-beacon'; script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: analyticsToken, spa: false }));
  document.head.append(script);
}
function updatePreferenceUI() {
  const choice = readPreference();
  const status = document.getElementById('stats-status');
  if (status) status.textContent = choice === 'yes' ? 'Estadísticas opcionales permitidas. Puedes cambiar tu elección cuando quieras.' : choice === 'no' ? 'Solo lo necesario. No cargamos estadísticas opcionales.' : 'Aún no has elegido. No cargamos estadísticas opcionales.';
  const banner = document.getElementById('analytics-choice');
  if (banner) banner.hidden = choice !== null;
}
function choose(value) {
  try { localStorage.setItem(preferenceKey, value); }
  catch { const status = document.getElementById('stats-status'); if (status) status.textContent = 'Tu navegador no permite guardar esta elección. Las estadísticas siguen desactivadas.'; return; }
  if (value === 'no' && loaded) { location.reload(); return; }
  updatePreferenceUI(); loadAnalytics();
}
const reject = document.getElementById('reject-stats'), allow = document.getElementById('allow-stats');
if (reject) reject.addEventListener('click', () => choose('no'));
if (allow) allow.addEventListener('click', () => choose('yes'));
if (!document.getElementById('stats-status')) {
  const banner = document.createElement('section'); banner.id = 'analytics-choice';
  banner.setAttribute('aria-label', 'Preferencia de estadísticas');
  const content = document.createElement('div');
  const heading = document.createElement('strong'); heading.textContent = 'Tú eliges las estadísticas';
  const detail = document.createElement('p'); detail.textContent = 'Podemos medir visitas y rendimiento sin cookies de analítica. Solo si lo permites.';
  const link = document.createElement('a'); link.href = 'analytics.html'; link.textContent = 'Más información y preferencias';
  content.append(heading, detail, link);
  const controls = document.createElement('div'); controls.className = 'analytics-actions';
  const no = document.createElement('button'), yes = document.createElement('button');
  no.type = yes.type = 'button'; no.textContent = 'Solo lo necesario'; yes.textContent = 'Permitir estadísticas';
  no.addEventListener('click', () => choose('no')); yes.addEventListener('click', () => choose('yes'));
  controls.append(no, yes); banner.append(content, controls); document.body.append(banner);
}
updatePreferenceUI(); loadAnalytics();
addEventListener('storage', event => { if (event.key === preferenceKey) { if (loaded && readPreference() !== 'yes') location.reload(); else { updatePreferenceUI(); loadAnalytics(); } } });

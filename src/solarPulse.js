const KP_ENDPOINT = 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';
const POLL_MS = 60_000;

function intensityFromKp(kp) {
  const clamped = Math.max(0, Math.min(9, kp));
  return Math.sqrt(clamped / 9);
}

async function fetchLatestKp() {
  const res = await fetch(KP_ENDPOINT);
  if (!res.ok) throw new Error(`NOAA request failed: ${res.status}`);
  const rows = await res.json();
  return rows[rows.length - 1];
}

export function initSolarPulse({ dotEl, readoutEl }) {
  async function update() {
    try {
      const latest = await fetchLatestKp();
      const kp = latest.estimated_kp;
      const intensity = intensityFromKp(kp);

      const duration = (1.6 - intensity * 1.1).toFixed(2);
      const glow = Math.round(8 + intensity * 40);

      dotEl.style.setProperty('--pulse-duration', `${duration}s`);
      dotEl.style.setProperty('--pulse-glow', `${glow}px`);

      readoutEl.textContent = `Kp ${kp.toFixed(2)} · ${latest.time_tag.replace('T', ' ')} UTC`;
    } catch (err) {
      console.error('solar pulse update failed:', err);
      readoutEl.textContent = 'live feed unavailable — showing resting pulse';
    }
  }
  update();
  setInterval(update, POLL_MS);
}
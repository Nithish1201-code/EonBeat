const KP_ENDPOINT = 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';
const POLL_MS = 60_000;

function levelFromKp(kp) {
  if (kp >= 7) return { label: 'storm', color: '#e0715c' };
  if (kp >= 5) return { label: 'active', color: '#caa06a' };
  if (kp >= 3) return { label: 'unsettled', color: '#9aa08f' };
  return { label: 'quiet', color: '#7c9a7e' };
}

function paintChip(chipEl, label, color) {
  chipEl.textContent = label;
  chipEl.style.color = color;
  chipEl.style.borderColor = color;
}

async function fetchLatestKp() {
  const res = await fetch(KP_ENDPOINT);
  if (!res.ok) throw new Error(`NOAA request failed: ${res.status}`);
  const rows = await res.json();
  return rows[rows.length - 1];
}

export function initSpaceWeather({ readoutEl, chipEl }) {
  async function update() {
    try {
      const latest = await fetchLatestKp();
      const kp = latest.estimated_kp;
      const level = levelFromKp(kp);

      readoutEl.textContent = `Kp ${kp.toFixed(2)} · ${latest.time_tag.replace('T', ' ')} UTC`;
      paintChip(chipEl, level.label, level.color);
    } catch (err) {
      console.error('space weather update failed:', err);
      readoutEl.textContent = 'live feed unavailable';
      paintChip(chipEl, 'offline', '#86837c');
    }
  }

  update();
  setInterval(update, POLL_MS);
}

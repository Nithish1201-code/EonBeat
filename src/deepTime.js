const SECONDS_PER_YEAR = 365.25 * 24 * 3600;
const UNIVERSE_AGE_YEARS = 13.797e9;
const YEARS_UNTIL_RED_GIANT = 5e9;

function marsSolDate(date) {
  const JD_UNIX_EPOCH = 2440587.5;
  const JD_UTC = JD_UNIX_EPOCH + date.getTime() / 86400000;
  const TT_OFFSET_DAYS = 69.184 / 86400;
  const JD_TT = JD_UTC + TT_OFFSET_DAYS;
  const daysSinceJ2000 = JD_TT - 2451545.0;
  return (daysSinceJ2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;
}

function formatMarsTime(msd) {
  const fractionOfSol = msd - Math.floor(msd);
  const totalSeconds = fractionOfSol * 86400;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const pad = (n) => String(n).padStart(2, '0');
  return `Sol ${Math.floor(msd)} · ${pad(h)}:${pad(m)}:${pad(s)}`;
}

const yearsFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 });

export function initDeepTime({ universeEl, marsEl, earthEl, redGiantEl }) {
  const startMs = Date.now();
  function tick() {
    const now = new Date();
    const elapsedYears = (now.getTime() - startMs) / 1000 / SECONDS_PER_YEAR;

    universeEl.textContent = `${yearsFormatter.format(UNIVERSE_AGE_YEARS + elapsedYears)} years`;
    redGiantEl.textContent = `${yearsFormatter.format(YEARS_UNTIL_RED_GIANT - elapsedYears)} years`;
    earthEl.textContent = now.toUTCString().replace('GMT', 'UTC');
    marsEl.textContent = formatMarsTime(marsSolDate(now));
  }
  tick();
  setInterval(tick, 100);
}
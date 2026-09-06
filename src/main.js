import { initSolarPulse } from './solarPulse.js';
import { initDeepTime } from './deepTime.js';

initSolarPulse({
    dotEl: document.getElementById('pulse-dot'),
    readoutEl: document.getElementById('pulse-readout'),
})
initDeepTime({
  universeEl: document.getElementById('universe-age'),
  marsEl: document.getElementById('mars-time'),
  earthEl: document.getElementById('earth-time'),
  redGiantEl: document.getElementById('red-giant'),
});

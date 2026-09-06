import './style.css';
import { initSolarPulse } from './solarPulse.js';
import { initDeepTime } from './deepTime.js';
import { initSearch } from './search.js';

initSearch({
  inputEl: document.getElementById('search-input'),
});

initSolarPulse({
  waveformEl: document.getElementById('waveform'),
  readoutEl: document.getElementById('pulse-readout'),
  detailEl: document.getElementById('pulse-detail'),
});

initDeepTime({
  universeEl: document.getElementById('universe-age'),
  earthEl: document.getElementById('earth-time'),
  marsEl: document.getElementById('mars-time'),
  marsSolEl: document.getElementById('mars-sol'),
  redGiantEl: document.getElementById('red-giant'),
});
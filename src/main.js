import './style.css';
import { initBackground } from './background.js';
import { initDeepTime } from './deepTime.js';
import { initSpaceWeather } from './spaceWeather.js';
import { initSearch } from './search.js';
import { initShortcuts } from './shortcuts.js';
import { initApod } from './apod.js';


const GATE_TIMEOUT_MS = 8000;

initBackground(document.getElementById('bg-canvas'));

initSearch(document.getElementById('search-form'), document.getElementById('search-input'));
initShortcuts(document.getElementById('shortcuts'));

initDeepTime({
  universeEl: document.getElementById('universe-age'),
  marsEl: document.getElementById('mars-time'),
  earthEl: document.getElementById('earth-time'),
  redGiantEl: document.getElementById('red-giant'),
  clockEl: document.getElementById('clock'),
  clockDateEl: document.getElementById('clock-date'),
});

initSpaceWeather({
  readoutEl: document.getElementById('kp-readout'),
  chipEl: document.getElementById('kp-chip'),
});

const apodReady = initApod({
  widgetEl: document.getElementById('apod-widget'),
  thumbEl: document.getElementById('apod-thumb'),
  dateEl: document.getElementById('apod-date'),
  lightboxEl: document.getElementById('apod-lightbox'),
  lightboxBodyEl: document.getElementById('apod-lightbox-body'),
  closeEl: document.getElementById('apod-lightbox-close'),
});

const gateTimeout = new Promise((resolve) => setTimeout(resolve, GATE_TIMEOUT_MS));

Promise.race([apodReady, gateTimeout]).then(() => {
  document.documentElement.classList.remove('is-loading');
});

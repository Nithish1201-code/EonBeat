// NASA Astronomy Picture of the Day (APOD) — the mission's guided
// deliverable. Shown as a small corner widget instead of a big hero
// block; clicking it opens the full-size image with its title and
// explanation. The returned promise resolves once the day's image has
// fully loaded, so main.js can hold the page reveal on it — see the
// "load the image fully before startup" requirement in the readme.

const APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod';

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image failed to load'));
    img.src = src;
  });
}

function buildLightboxMedia(data) {
  if (data.media_type === 'image') {
    const src = data.hdurl || data.url;
    return `<img class="apod-lightbox-media" src="${src}" alt="${data.title}" />`;
  }
  if (typeof data.url === 'string' && data.url.includes('youtube')) {
    return `<iframe class="apod-lightbox-media apod-lightbox-frame" src="${data.url}" title="${data.title}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>`;
  }
  return `<video class="apod-lightbox-media" src="${data.url}" controls></video>`;
}

export function initApod({ widgetEl, thumbEl, dateEl, lightboxEl, lightboxBodyEl, closeEl }) {
  if (!widgetEl) return Promise.resolve();

  function openLightbox(data) {
    lightboxBodyEl.innerHTML = `
      ${buildLightboxMedia(data)}
      <div class="apod-lightbox-copy">
        <p class="apod-lightbox-date">${data.date}</p>
        <h2 class="apod-lightbox-title">${data.title}</h2>
        <p class="apod-lightbox-explanation">${data.explanation}</p>
        ${data.copyright ? `<p class="apod-lightbox-credit">© ${data.copyright.trim()}</p>` : ''}
      </div>
    `;
    lightboxEl.hidden = false;
    document.body.style.overflow = 'hidden';
    closeEl.focus();
  }

  function closeLightbox() {
    lightboxEl.hidden = true;
    document.body.style.overflow = '';
    widgetEl.focus();
  }

  closeEl.addEventListener('click', closeLightbox);
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxEl.hidden) closeLightbox();
  });

  return (async () => {
    const apiKey = import.meta.env.VITE_NASA_API_KEY;

    if (!apiKey) {
      console.warn('APOD widget: no VITE_NASA_API_KEY set, see .env.example');
      return;
    }

    try {
      const res = await fetch(`${APOD_ENDPOINT}?api_key=${apiKey}`);
      if (!res.ok) throw new Error(`NASA APOD request failed: ${res.status}`);
      const data = await res.json();

      if (data.media_type !== 'image') {
        throw new Error(`today's APOD is a ${data.media_type}, skipping the image widget`);
      }

      await preloadImage(data.url);

      thumbEl.src = data.url;
      thumbEl.alt = data.title;
      dateEl.textContent = data.date;
      widgetEl.hidden = false;
      widgetEl.addEventListener('click', () => openLightbox(data));
    } catch (err) {
      console.warn('APOD widget unavailable today:', err.message);
    }
  })();
}

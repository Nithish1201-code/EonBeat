const STORAGE_KEY = 'eonpulse:shortcuts';

const DEFAULT_LINKS = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: 'NASA', url: 'https://www.nasa.gov' },
  { label: 'YouTube', url: 'https://youtube.com' },
  { label: 'Mail', url: 'https://mail.google.com' },
];

function loadLinks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (err) {
    console.warn('shortcuts: could not read localStorage', err);
  }
  return DEFAULT_LINKS;
}

function saveLinks(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch (err) {
    console.warn('shortcuts: could not persist to localStorage', err);
  }
}

export function initShortcuts(rootEl) {
  if (!rootEl) return;

  let links = loadLinks();

  function render() {
    rootEl.innerHTML = '';

    links.forEach((link, index) => {
      const item = document.createElement('span');
      item.className = 'shortcut-item';

      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'shortcut';
      a.innerHTML = `<span class="shortcut-dot"></span>${link.label}`;
      a.title = link.url;

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'shortcut-remove';
      remove.setAttribute('aria-label', `Remove ${link.label}`);
      remove.textContent = '×';
      remove.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        links = links.filter((_, i) => i !== index);
        saveLinks(links);
        render();
      });

      item.appendChild(a);
      item.appendChild(remove);
      rootEl.appendChild(item);
    });

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'shortcut-add';
    addBtn.textContent = '+ add';
    addBtn.addEventListener('click', () => {
      const label = window.prompt('Shortcut label:');
      if (!label) return;
      let url = window.prompt('URL (include https://):');
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

      links = [...links, { label, url }];
      saveLinks(links);
      render();
    });
    rootEl.appendChild(addBtn);
  }

  render();
}
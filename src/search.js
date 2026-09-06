// A minimal new-tab search bar: plain text goes to a web search,
// anything that already looks like a URL is navigated to directly.
// There is no visible button on purpose — press Enter, the same way
// a browser's own address bar works.

export function initSearch(formEl, inputEl) {
  if (!formEl || !inputEl) return;

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = inputEl.value.trim();
    if (!query) return;

    const looksLikeUrl = /^https?:\/\//i.test(query) || /^[\w-]+\.[a-z]{2,}(\/.*)?$/i.test(query);

    if (looksLikeUrl) {
      window.location.href = /^https?:\/\//i.test(query) ? query : `https://${query}`;
      return;
    }

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  });
}

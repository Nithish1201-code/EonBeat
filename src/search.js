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

// Pagefind search integration — Cmd+K / Ctrl+K overlay
// Uses safe DOM methods (createElement, textContent) — no innerHTML
(function () {
  var overlay = document.querySelector('[data-search-overlay]');
  var input = document.querySelector('[data-search-input]');
  var resultsContainer = document.querySelector('[data-search-results]');
  var triggers = document.querySelectorAll('[data-search-trigger]');

  if (!overlay || !input || !resultsContainer) return;

  var pagefind = null;

  // Lazy-load Pagefind on first open
  async function loadPagefind() {
    if (pagefind) return pagefind;
    try {
      pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
    } catch (e) {
      pagefind = null;
    }
    return pagefind;
  }

  function openSearch() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    input.focus();
    document.body.style.overflow = 'hidden';
    loadPagefind();
  }

  function closeSearch() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    input.value = '';
    clearResults();
    document.body.style.overflow = '';
  }

  function clearResults() {
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }
    var empty = document.createElement('p');
    empty.className = 'search-dialog__empty';
    empty.textContent = 'Type to search across all resources';
    resultsContainer.appendChild(empty);
  }

  function showNoResults() {
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }
    var empty = document.createElement('p');
    empty.className = 'search-dialog__empty';
    empty.textContent = 'No results found';
    resultsContainer.appendChild(empty);
  }

  function renderResult(result) {
    var item = document.createElement('a');
    item.className = 'search-result';
    item.href = result.url;

    var title = document.createElement('p');
    title.className = 'search-result__title';
    title.textContent = result.meta && result.meta.title ? result.meta.title : result.url;
    item.appendChild(title);

    if (result.excerpt) {
      var excerpt = document.createElement('p');
      excerpt.className = 'search-result__excerpt';
      // Pagefind uses <mark> in excerpts — parse safely
      var temp = document.createElement('div');
      temp.textContent = '';
      // Strip HTML tags from excerpt for safe display
      var cleanExcerpt = result.excerpt.replace(/<mark>/g, '\u00AB').replace(/<\/mark>/g, '\u00BB').replace(/<[^>]*>/g, '');
      // Rebuild with marks
      var parts = cleanExcerpt.split(/\u00AB|\u00BB/);
      var isHighlight = cleanExcerpt.indexOf('\u00AB') === 0;
      parts.forEach(function (part, i) {
        if (!part) return;
        if ((i % 2 === 0 && !isHighlight) || (i % 2 === 1 && isHighlight)) {
          excerpt.appendChild(document.createTextNode(part));
        } else {
          var mark = document.createElement('mark');
          mark.textContent = part;
          excerpt.appendChild(mark);
        }
      });
      item.appendChild(excerpt);
    }

    return item;
  }

  var searchTimeout = null;

  async function doSearch(query) {
    if (!query || query.length < 2) {
      clearResults();
      return;
    }

    var pf = await loadPagefind();
    if (!pf) {
      showNoResults();
      return;
    }

    var search = await pf.search(query);
    if (!search.results.length) {
      showNoResults();
      return;
    }

    // Clear container
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }

    // Show first 8 results
    var limit = Math.min(search.results.length, 8);
    for (var i = 0; i < limit; i++) {
      var data = await search.results[i].data();
      resultsContainer.appendChild(renderResult(data));
    }

    if (search.results.length > limit) {
      var more = document.createElement('p');
      more.className = 'search-dialog__more';
      more.textContent = '+ ' + (search.results.length - limit) + ' more results';
      resultsContainer.appendChild(more);
    }
  }

  // Event listeners
  input.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function () {
      doSearch(input.value.trim());
    }, 200);
  });

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', openSearch);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('is-open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
    }
  });
})();

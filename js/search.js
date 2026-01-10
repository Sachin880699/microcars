document.addEventListener('DOMContentLoaded', function () {
  function createResultsContainer() {
    let existing = document.getElementById('search-results');
    if (existing) return existing;
    const div = document.createElement('div');
    div.id = 'search-results';
    div.className = 'container mt-3';
    div.style.border = '1px solid #eee';
    div.style.padding = '12px';
    div.style.background = '#fff';
    div.innerHTML = '<div class="d-flex justify-content-between align-items-center mb-2"><strong id="search-results-heading"></strong><button id="search-results-close" class="btn btn-sm btn-outline-secondary">Close</button></div><div id="search-results-items" class="row"></div>';
    // insert after nav if possible
    var nav = document.getElementById('nav');
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(div, nav.nextSibling);
    } else {
      document.body.insertBefore(div, document.body.firstChild);
    }
    document.getElementById('search-results-close').addEventListener('click', function () {
      div.remove();
    });
    return div;
  }

  function performSearch(query) {
    query = (query || '').trim().toLowerCase();
    const existing = document.getElementById('search-results');
    if (!query) {
      if (existing) existing.remove();
      return;
    }
    const results = createResultsContainer();
    const heading = document.getElementById('search-results-heading');
    const itemsWrap = document.getElementById('search-results-items');
    itemsWrap.innerHTML = '';

    const candidates = Array.from(document.querySelectorAll('.project, .blog-card'));
    const matches = [];
    candidates.forEach(function (el) {
      const text = (el.innerText || el.textContent || '').toLowerCase();
      if (text.indexOf(query) !== -1) {
        matches.push(el);
      }
    });

    heading.textContent = 'Search results for "' + query + '" (' + matches.length + ')';

    if (matches.length === 0) {
      itemsWrap.innerHTML = '<div class="col-12">No results found.</div>';
      return;
    }

    matches.forEach(function (el) {
      // clone an anchor or the element itself and put into a small column
      var clone;
      var anchor = el.closest('a');
      if (anchor) clone = anchor.cloneNode(true);
      else clone = el.cloneNode(true);

      var col = document.createElement('div');
      col.className = 'col-lg-3 col-md-4 col-6 mb-3';
      // keep the visual compact: if clone is an article, wrap inside anchor-like div
      col.appendChild(clone);
      itemsWrap.appendChild(col);
    });
    // scroll to results
    results.scrollIntoView({ behavior: 'smooth' });
  }

  // attach to all search forms with an input[type=search]
  const searchForms = document.querySelectorAll('form');
  searchForms.forEach(function (form) {
    const input = form.querySelector('input[type=search]');
    if (!input) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      performSearch(input.value || input.placeholder || '');
    });
    // optional: handle live search on Enter in input
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        performSearch(input.value || '');
      }
    });
  });
});

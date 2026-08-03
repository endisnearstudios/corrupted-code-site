(function () {
  function init() {
    var input = document.getElementById('wiki-search-input');
    var results = document.getElementById('wiki-search-results');
    var empty = document.getElementById('wiki-search-empty');
    if (!input || !results || typeof SEARCH_INDEX === 'undefined') return;

    function escapeHtml(s) {
      return s.replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    function render(query) {
      results.innerHTML = '';
      var q = query.trim().toLowerCase();
      if (!q) {
        results.style.display = 'none';
        if (empty) empty.style.display = 'none';
        return;
      }
      var matches = SEARCH_INDEX.filter(function (item) {
        return item.t.toLowerCase().indexOf(q) !== -1 ||
               item.d.toLowerCase().indexOf(q) !== -1 ||
               item.c.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 30);

      if (matches.length === 0) {
        results.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
      }
      if (empty) empty.style.display = 'none';
      results.style.display = 'flex';
      matches.forEach(function (item) {
        var row = document.createElement('a');
        row.className = 'search-result';
        row.href = item.u;
        row.innerHTML =
          '<span class="search-result-cat">' + escapeHtml(item.c) + '</span>' +
          '<span class="search-result-title">' + escapeHtml(item.t) + '</span>' +
          '<span class="search-result-desc">' + escapeHtml(item.d) + '</span>';
        results.appendChild(row);
      });
    }

    input.addEventListener('input', function () { render(input.value); });
    render(input.value);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Tag filtering — toggles resource card visibility based on selected tags
(function () {
  var filterBar = document.querySelector('[data-tag-filter]');
  if (!filterBar) return;

  var tagButtons = filterBar.querySelectorAll('[data-tag]');
  var activeTags = new Set();

  function filterResources() {
    var cards = document.querySelectorAll('.resource-card[data-tags]');
    cards.forEach(function (card) {
      if (activeTags.size === 0) {
        card.style.display = '';
        return;
      }

      var cardTags = (card.getAttribute('data-tags') || '').split(',');
      var match = false;
      activeTags.forEach(function (tag) {
        if (cardTags.indexOf(tag) !== -1) match = true;
      });
      card.style.display = match ? '' : 'none';
    });
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.getAttribute('data-tag');
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        activeTags.add(tag);
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
      }
      filterResources();
    });
  });
})();

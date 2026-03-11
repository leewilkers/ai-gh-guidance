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

// Role filtering — tools page only
(function () {
  var roleBar = document.querySelector('[data-role-filter]');
  if (!roleBar) return;

  var roleButtons = roleBar.querySelectorAll('[data-role]');
  var activeRole = null;

  function filterByRole() {
    var cards = document.querySelectorAll('.resource-card[data-roles]');
    cards.forEach(function (card) {
      if (!activeRole) {
        card.style.display = '';
        card.classList.remove('is-dimmed');
        return;
      }

      var cardRoles = (card.getAttribute('data-roles') || '').split(',');
      if (cardRoles.indexOf(activeRole) !== -1) {
        card.style.display = '';
        card.classList.remove('is-dimmed');
      } else {
        card.classList.add('is-dimmed');
        card.style.display = '';
      }
    });
  }

  roleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var role = btn.getAttribute('data-role');
      if (activeRole === role) {
        activeRole = null;
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        roleButtons.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        activeRole = role;
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
      }
      filterByRole();
    });
  });
})();

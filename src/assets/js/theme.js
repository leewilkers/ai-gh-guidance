// Dark mode toggle — respects system preference, persists to localStorage
(function () {
  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggle.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  toggle.addEventListener('click', function () {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

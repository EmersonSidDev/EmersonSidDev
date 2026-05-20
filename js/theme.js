/* ============================================
   Theme — Dark/Light mode toggle & persistence
   ============================================ */

const Theme = (() => {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /**
   * Get the initial theme: localStorage > OS preference > dark (default)
   */
  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT;
    }
    return DARK;
  }

  /**
   * Apply theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleIcon(theme);
  }

  /**
   * Update the toggle button icon
   */
  function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;

    if (theme === DARK) {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  /**
   * Toggle between dark and light
   */
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || DARK;
    const next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /**
   * Initialize theme system
   */
  function init() {
    const theme = getInitialTheme();
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
    }
  }

  return { init, toggle };
})();

/* ============================================
   i18n — Internationalization (PT/EN)
   ============================================ */

const I18n = (() => {
  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'pt'];

  let currentLang = DEFAULT_LANG;
  let translations = {};

  /**
   * Get stored or default language
   */
  function getInitialLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
    return DEFAULT_LANG;
  }

  /**
   * Fetch language file
   */
  async function loadTranslations(lang) {
    try {
      const basePath = getBasePath();
      const response = await fetch(`${basePath}data/lang/${lang}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`[i18n] Failed to load ${lang}.json:`, err);
      return {};
    }
  }

  /**
   * Apply translations to all elements with data-i18n attributes
   */
  function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations, key);
      if (value) el.textContent = value;
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(translations, key);
      if (value) el.setAttribute('placeholder', value);
    });

    // Alt text
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const value = getNestedValue(translations, key);
      if (value) el.setAttribute('alt', value);
    });

    // Aria labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const value = getNestedValue(translations, key);
      if (value) el.setAttribute('aria-label', value);
    });

    // Title (tooltip)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const value = getNestedValue(translations, key);
      if (value) el.setAttribute('title', value);
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', currentLang);

    // Update meta description
    const metaDesc = getNestedValue(translations, 'meta.description');
    if (metaDesc) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', metaDesc);
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  /**
   * Update the language toggle button text
   */
  function updateToggleText() {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = currentLang === 'en' ? 'PT' : 'EN';
    }
  }

  /**
   * Set language and re-render
   */
  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;

    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    translations = await loadTranslations(lang);
    applyTranslations();
    updateToggleText();

    // Dispatch event for data-loader to re-render content
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }

  /**
   * Toggle between PT and EN
   */
  function toggle() {
    const next = currentLang === 'en' ? 'pt' : 'en';
    setLanguage(next);
  }

  /**
   * Get current language
   */
  function getLang() {
    return currentLang;
  }

  /**
   * Get a translation value by key
   */
  function t(key) {
    return getNestedValue(translations, key) || key;
  }

  /**
   * Determine base path relative to current page
   */
  function getBasePath() {
    // All pages are at root level, so base path is always ./
    return './';
  }

  /**
   * Initialize i18n system
   */
  async function init() {
    currentLang = getInitialLang();
    translations = await loadTranslations(currentLang);
    applyTranslations();
    updateToggleText();

    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
    }
  }

  return { init, setLanguage, toggle, getLang, t };
})();

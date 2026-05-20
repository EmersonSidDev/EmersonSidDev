/* ============================================
   Main — Initialization & page orchestration
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Init theme (sync — no fetch needed)
  Theme.init();

  // 2. Init i18n (async — fetches lang JSON)
  await I18n.init();

  // 3. Detect current page and load appropriate data
  const page = detectPage();
  await loadPageData(page);

  // 4. Init shared UI components
  initHamburger();
  initActiveNav();
  initScrollHeader();
  initCopyright();
});

/**
 * Detect current page from URL
 */
function detectPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('projects')) return 'projects';
  if (path.includes('about')) return 'about';
  if (path.includes('404')) return '404';
  return 'index';
}

/**
 * Load page-specific data
 */
async function loadPageData(page) {
  // Social links are on every page (footer)
  DataLoader.renderSocial();

  switch (page) {
    case 'index':
      await Promise.all([
        DataLoader.renderHero(),
        DataLoader.renderShowreel(),
        DataLoader.renderFeaturedProjects(),
        DataLoader.renderSkillsSummary(),
      ]);
      break;

    case 'projects':
      await DataLoader.renderAllProjects();
      break;

    case 'about':
      await Promise.all([
        DataLoader.renderAbout(),
        DataLoader.renderSkillsDetailed(),
      ]);
      break;
  }
}

/**
 * Re-render on language change
 */
window.addEventListener('langChanged', async () => {
  const page = detectPage();
  await loadPageData(page);
});

/**
 * Hamburger menu toggle
 */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  if (!btn || !navList) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('hamburger--active');
    navList.classList.toggle('nav__list--open');
    document.body.style.overflow = navList.classList.contains('nav__list--open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('hamburger--active');
      navList.classList.remove('nav__list--open');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Highlight active nav link based on current page
 */
function initActiveNav() {
  const page = detectPage();
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    let isActive = false;

    if (page === 'index' && (href === 'index.html' || href === './' || href === '/')) {
      isActive = true;
    } else if (page === 'projects' && href.includes('projects')) {
      isActive = true;
    } else if (page === 'about' && href.includes('about')) {
      isActive = true;
    }

    link.classList.toggle('nav__link--active', isActive);
  });
}

/**
 * Add background opacity to header on scroll
 */
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  }, { passive: true });
}

/**
 * Set dynamic copyright year
 */
function initCopyright() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================
   Data Loader — Fetch JSON & render content
   ============================================ */

const DataLoader = (() => {
  const cache = {};
  const BASE = './';

  /**
   * Generic JSON loader with caching
   */
  async function loadJSON(path) {
    if (cache[path]) return cache[path];
    try {
      const response = await fetch(`${BASE}${path}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      cache[path] = data;
      return data;
    } catch (err) {
      console.warn(`[DataLoader] Failed to load ${path}:`, err);
      return null;
    }
  }

  /**
   * Get localized text from an object with {pt, en} keys
   */
  function localized(obj) {
    if (!obj) return '';
    const lang = I18n.getLang();
    return obj[lang] || obj.en || obj.pt || '';
  }

  // ============= HERO =============
  async function renderHero() {
    const data = await loadJSON('data/hero.json');
    if (!data) return;

    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');

    if (titleEl) titleEl.textContent = localized(data.title);
    if (subtitleEl) subtitleEl.textContent = localized(data.subtitle);
  }

  // ============= SHOWREEL =============
  async function renderShowreel() {
    const data = await loadJSON('data/hero.json');
    if (!data) return;

    const wrapper = document.getElementById('showreel-content');
    if (!wrapper) return;

    if (data.video_url) {
      wrapper.innerHTML = `<iframe src="${encodeURI(data.video_url)}" 
        frameborder="0" allowfullscreen 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Showreel"></iframe>`;
    } else {
      wrapper.innerHTML = `<img src="${BASE}assets/images/showreel-placeholder.svg" 
        alt="Showreel placeholder" loading="lazy">`;
    }
  }

  // ============= PROJECTS =============
  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'card card--visible animate-in';
    card.setAttribute('data-genre', project.genero || 'all');

    const techIcons = (project.tecnologias || [])
      .map(t => `<span class="card__tag">${t}</span>`)
      .join('');

    card.innerHTML = `
      <div class="card__image-wrapper">
        <img class="card__image" 
             src="${BASE}${project.imagem}" 
             alt="${localized(project.titulo)}"
             loading="lazy">
        <div class="card__overlay"></div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${localized(project.titulo)}</h3>
        <p class="card__description">${localized(project.descricao)}</p>
        <div class="card__tags">${techIcons}</div>
      </div>
    `;
    return card;
  }

  async function renderFeaturedProjects() {
    const data = await loadJSON('data/projects.json');
    if (!data) return;

    const grid = document.getElementById('featured-projects');
    if (!grid) return;

    const featured = data.filter(p => p.destaque);
    grid.innerHTML = '';
    featured.forEach(p => grid.appendChild(createProjectCard(p)));
  }

  async function renderAllProjects() {
    const data = await loadJSON('data/projects.json');
    if (!data) return;

    const grid = document.getElementById('all-projects');
    if (!grid) return;

    grid.innerHTML = '';
    data.forEach(p => grid.appendChild(createProjectCard(p)));

    // Build filter buttons
    buildFilters(data);
  }

  function buildFilters(projects) {
    const filterContainer = document.getElementById('project-filters');
    if (!filterContainer) return;

    const genres = [...new Set(projects.map(p => p.genero).filter(Boolean))];

    filterContainer.innerHTML = '';

    // "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter__btn filter__btn--active';
    allBtn.setAttribute('data-filter', 'all');
    allBtn.textContent = I18n.t('projects.filter_all') || 'All';
    allBtn.addEventListener('click', () => filterProjects('all'));
    filterContainer.appendChild(allBtn);

    genres.forEach(genre => {
      const btn = document.createElement('button');
      btn.className = 'filter__btn';
      btn.setAttribute('data-filter', genre);
      // Try to get translated genre name, fallback to capitalized genre
      btn.textContent = I18n.t(`projects.genres.${genre}`) || genre.charAt(0).toUpperCase() + genre.slice(1);
      btn.addEventListener('click', () => filterProjects(genre));
      filterContainer.appendChild(btn);
    });
  }

  function filterProjects(genre) {
    const cards = document.querySelectorAll('#all-projects .card');
    const buttons = document.querySelectorAll('.filter__btn');

    buttons.forEach(btn => {
      btn.classList.toggle('filter__btn--active', btn.getAttribute('data-filter') === genre);
    });

    cards.forEach(card => {
      const cardGenre = card.getAttribute('data-genre');
      if (genre === 'all' || cardGenre === genre) {
        card.classList.remove('card--hidden');
        card.classList.add('card--visible');
      } else {
        card.classList.remove('card--visible');
        card.classList.add('card--hidden');
      }
    });
  }

  // ============= SKILLS (index summary) =============
  async function renderSkillsSummary() {
    const data = await loadJSON('data/skills.json');
    if (!data || !data.categorias) return;

    const container = document.getElementById('skills-summary');
    if (!container) return;

    container.innerHTML = '';
    data.categorias.forEach(cat => {
      const section = document.createElement('div');
      section.className = 'skills-category';
      section.innerHTML = `
        <h3 class="skills-category__title">${localized(cat.nome)}</h3>
        <div class="skills-category__list">
          ${cat.itens.map(s => `
            <span class="skill-badge">
              <i class="skill-badge__icon ${s.icone}"></i>
              ${s.nome}
            </span>
          `).join('')}
        </div>
      `;
      container.appendChild(section);
    });
  }

  // ============= SKILLS DETAILED (about page) =============
  async function renderSkillsDetailed() {
    const data = await loadJSON('data/skills.json');
    if (!data || !data.categorias) return;

    const container = document.getElementById('skills-detailed');
    if (!container) return;

    container.innerHTML = '';
    data.categorias.forEach(cat => {
      const section = document.createElement('div');
      section.className = 'skills-detailed__category';
      section.innerHTML = `
        <h3 class="skills-detailed__title">${localized(cat.nome)}</h3>
        ${cat.itens.map(s => `
          <div class="progress">
            <div class="progress__header">
              <span class="progress__label"><i class="${s.icone}"></i> ${s.nome}</span>
              <span class="progress__value">${s.nivel}%</span>
            </div>
            <div class="progress__bar">
              <div class="progress__fill progress__fill--animate" style="width: ${s.nivel}%"></div>
            </div>
          </div>
        `).join('')}
      `;
      container.appendChild(section);
    });
  }

  // ============= ABOUT =============
  async function renderAbout() {
    const data = await loadJSON('data/about.json');
    if (!data) return;

    // Bio
    const bioEl = document.getElementById('about-bio');
    if (bioEl) bioEl.textContent = localized(data.bio);

    // Experience
    const expContainer = document.getElementById('experience-timeline');
    if (expContainer && data.experiencias) {
      expContainer.innerHTML = '';
      data.experiencias.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline__item';
        item.innerHTML = `
          <span class="timeline__period">${exp.periodo}</span>
          <h4 class="timeline__title">${localized(exp.cargo)}</h4>
          <p class="timeline__subtitle">${localized(exp.empresa)}</p>
          <p class="timeline__description">${localized(exp.descricao)}</p>
        `;
        expContainer.appendChild(item);
      });
    }

    // Education
    const eduContainer = document.getElementById('education-list');
    if (eduContainer && data.educacao) {
      eduContainer.innerHTML = '';
      data.educacao.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'timeline__item';
        item.innerHTML = `
          <span class="timeline__period">${edu.periodo}</span>
          <h4 class="timeline__title">${localized(edu.curso)}</h4>
          <p class="timeline__subtitle">${localized(edu.instituicao)}</p>
        `;
        eduContainer.appendChild(item);
      });
    }
  }

  // ============= SOCIAL =============
  async function renderSocial() {
    const data = await loadJSON('data/social.json');
    if (!data) return;

    document.querySelectorAll('.social').forEach(container => {
      container.innerHTML = '';

      const links = [
        { url: data.github, icon: 'fa-brands fa-github', label: 'GitHub' },
        { url: data.linkedin, icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
        { url: data.itch_io, icon: 'fa-brands fa-itch-io', label: 'Itch.io' },
        { url: `mailto:${data.email}`, icon: 'fa-solid fa-envelope', label: 'Email' },
      ];

      links.forEach(link => {
        if (!link.url) return;
        const a = document.createElement('a');
        a.className = 'social__link';
        a.href = link.url;
        a.target = link.url.startsWith('mailto:') ? '_self' : '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', link.label);
        a.innerHTML = `<i class="${link.icon}"></i>`;
        container.appendChild(a);
      });
    });
  }

  return {
    renderHero,
    renderShowreel,
    renderFeaturedProjects,
    renderAllProjects,
    renderSkillsSummary,
    renderSkillsDetailed,
    renderAbout,
    renderSocial,
    filterProjects,
    localized,
  };
})();

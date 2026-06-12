# EmersonSidDev | Portfolio / Resume

## English

Portfolio and resume website for GitHub Pages, focused on game development.

### Demo

- Live site: https://emersonsiddev.github.io/EmersonSidDev/

### About this project

This project is a static website that is fast, easy to maintain, and driven by JSON data files.

### Features

- Light/Dark theme toggle with `localStorage` persistence
- PT/EN internationalization with dynamic language switching
- JSON-driven content (`hero`, `projects`, `skills`, `about`, `social`)
- Projects page with genre filters
- Responsive layout with mobile hamburger menu
- Basic SEO setup with meta tags, Open Graph, `robots.txt`, and `sitemap.xml`
- Custom `404` page with theme/language support

### Tech stack

- HTML5
- CSS3 (modular files)
- Vanilla JavaScript (no framework)
- JSON for content
- Font Awesome + Google Fonts
- GitHub Pages for deployment

### Project structure

```text
.
|-- index.html
|-- projects.html
|-- about.html
|-- 404.html
|-- css/
|-- js/
|-- data/
|   |-- hero.json
|   |-- projects.json
|   |-- skills.json
|   |-- about.json
|   |-- social.json
|   `-- lang/
|       |-- pt.json
|       `-- en.json
`-- assets/
```

### Run locally

Because this project uses `fetch` to load JSON files, run it with a local server:

1. Clone this repository
2. Open the project folder
3. Start a static server

Example with Python:

```bash
python -m http.server 5500
```

Then open:

- http://localhost:5500

### Customize content

- Home/Hero: `data/hero.json`
- Projects: `data/projects.json`
- About/Experience/Education: `data/about.json`
- Skills: `data/skills.json`
- Social links and email: `data/social.json`
- UI translations (PT/EN): `data/lang/pt.json` and `data/lang/en.json`
- Images: `assets/images/`
- Resume PDF (About page button): `assets/cv.pdf`

### Deploy to GitHub Pages

1. Push changes to the main branch
2. Open `Settings > Pages` in GitHub
3. Under `Build and deployment`, select `Deploy from a branch`
4. Choose branch `main` and folder `/ (root)`
5. Save and wait for publication

### Contact

- GitHub: https://github.com/emersonsiddev
- LinkedIn: https://linkedin.com/in/emersonsiddev
- Itch.io: https://emersonsiddev.itch.io
- Email: contact@emersonsiddev.com

---

## Portugues (BR)

Site de portfolio e curriculo para GitHub Pages, com foco em desenvolvimento de jogos.

### Demo

- Site online: https://emersonsiddev.github.io/

### Sobre o projeto

Este projeto e um site estatico rapido, simples de manter e com conteudo desacoplado em arquivos JSON.

### Funcionalidades

- Tema claro/escuro com persistencia em `localStorage`
- Internacionalizacao PT/EN com troca dinamica de idioma
- Conteudo renderizado via JSON (`hero`, `projects`, `skills`, `about`, `social`)
- Pagina de projetos com filtros por genero
- Layout responsivo com menu mobile (hamburger)
- SEO basico com meta tags, Open Graph, `robots.txt` e `sitemap.xml`
- Pagina `404` customizada com suporte a tema e idioma

### Stack

- HTML5
- CSS3 (arquivos modulares)
- JavaScript Vanilla (sem framework)
- JSON para conteudo
- Font Awesome + Google Fonts
- GitHub Pages para deploy

### Estrutura do projeto

```text
.
|-- index.html
|-- projects.html
|-- about.html
|-- 404.html
|-- css/
|-- js/
|-- data/
|   |-- hero.json
|   |-- projects.json
|   |-- skills.json
|   |-- about.json
|   |-- social.json
|   `-- lang/
|       |-- pt.json
|       `-- en.json
`-- assets/
```

### Como rodar localmente

Como o projeto usa `fetch` para carregar arquivos JSON, rode com um servidor local:

1. Clone este repositorio
2. Abra a pasta do projeto
3. Inicie um servidor estatico

Exemplo com Python:

```bash
python -m http.server 5500
```

Depois acesse:

- http://localhost:5500

### Como personalizar o conteudo

- Home/Hero: `data/hero.json`
- Projetos: `data/projects.json`
- Sobre/Experiencia/Educacao: `data/about.json`
- Skills: `data/skills.json`
- Links sociais e email: `data/social.json`
- Traducoes da interface (PT/EN): `data/lang/pt.json` e `data/lang/en.json`
- Imagens: `assets/images/`
- Curriculo em PDF (botao na pagina About): `assets/cv.pdf`

### Deploy no GitHub Pages

1. Faca push das alteracoes para a branch principal
2. No GitHub, abra `Settings > Pages`
3. Em `Build and deployment`, selecione `Deploy from a branch`
4. Escolha a branch `main` e a pasta `/ (root)`
5. Salve e aguarde a publicacao

### Contato

- GitHub: https://github.com/emersonsiddev
- LinkedIn: https://linkedin.com/in/emersonsiddev
- Itch.io: https://emersonsiddev.itch.io
- E-mail: contact@emersonsiddev.com

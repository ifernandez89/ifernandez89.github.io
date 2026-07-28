# Changelog

## [2026-07-27 - Update v3] — Auditoría Mobile UX/UI — Imágenes, Diagrama y Layout

> Todos los cambios están **estrictamente acotados a breakpoints mobile** (`max-width: 768px` / `max-width: 480px`). El layout de escritorio **no fue modificado**.

### Galerías de imágenes (JarBees & Archeoscope)
- **`.gallery-main-img`**: Añadido `width: 100%` y `object-fit: cover`; `transition: none` para evitar herencia del zoom `.item`.
- **JarBees mobile**: En `≤768px` se forza `max-width: 100%; max-height: 480px; object-fit: contain; object-position: center top`.
- **Archeoscope gallery**: Corregido `max-width: 320px` sin `width: 100%` → ahora `max-width: 340px; width: 100%`.
- **`.jarbees-col-media`**: En mobile recibe `order: -1` — imagen aparece **arriba** del texto (mobile-first UX).

### Diagrama de Flujo Cognitivo (terminal)
- **`.terminal-body`**: Añadido `-webkit-overflow-scrolling: touch` para scroll iOS/Android suave.
- **`pre` y `code`**: `white-space: pre` explícito para preservar el diagrama ASCII.
- **Mobile font**: `0.7rem` en `≤768px`, `0.65rem` en `≤480px`.

### Zoom en imágenes `.item` — desktop intacto
- Efecto `scale(1.12)` y `cursor: zoom-in` ahora sólo activos con `@media (hover: hover) and (pointer: fine)` (mouse real). En touch: sin zoom ni overflow. Desktop mantiene el efecto con scale reducido de `1.2` → `1.12`.

### Otros ajustes mobile
- **Footer**: `flex-wrap: wrap; gap: 8px` en `.footer-inner` para adaptarse a phones pequeños.
- **`.jarbees-container`**: Padding lateral `16px` en `≤480px`.
- **`section` global**: Sin cambio en desktop (`width: 80%; max-width: 500px`). Sólo en `≤480px` expande a `100%` para aprovechar todo el ancho.

---

## [2026-07-27 - Update] — Responsive Mobile, SEO & Plantas Project Upgrades

### Mobile Responsive & Layout
- **Scroll horizontal**: Se agregó `max-width: 100%; overflow-x: hidden;` a `html` y `body` en `style.css` para solucionar el scroll horizontal involuntario en dispositivos móviles.
- **Diagrama de JarBees**: Se aplicó restricción de `width: 100%` y `max-width: 100%` en el contenedor `.diagram-terminal` y `.terminal-body` para forzar el scroll interno del diagrama y evitar el desborde del viewport en pantallas pequeñas.

### Posicionamiento y SEO
- **Identidad**: Actualización de todas las referencias de nombre de "Ignacio Fernández" a su nombre completo "**Ignacio Gabriel Fernández**" en `<title>`, `<h1>` principal, perfiles, esquemas JSON-LD y footer.
- **Meta-descripción**: Actualizado el tag de descripción de SEO con: "Portfolio de Ignacio Gabriel Fernández, Técnico Universitario en Programación. Proyectos de IA, NestJS, JarBees y Archeoscope."
- **Enlaces**: Integración de enlace directo al repositorio de **JarBees** en su sección de Flagship.

### Ecosistema de Desarrollo
- **Radar Dev**: Eliminado el proyecto del ecosistema por completo.
- **Plantas**: Tarjeta rediseñada incorporando una galería interactiva con capturas del proyecto (`portfolio-home-desktop.png`, `portfolio-list-desktop.png` y `portfolio-detail-calendula-desktop.png`) y agregando links para "Live preview" (modal embebido mediante `projects.json`) y enlace al sitio público `https://ifernandez89.github.io/PlantasMedicinales/`.

---

## [2026-07-27] — Reestructuración Narrativa y Posicionamiento como Arquitecto de Software

### JarBees (Nuevo Flagship Project)
- **Sección JarBees**: Agregado como proyecto principal con foco en su arquitectura cognitiva (QICA 2.0 y JarBees 3.0), destacando métricas (+60 fuentes, RAG híbrido, local-first) y un diagrama interactivo de consola.
- **Galería**: Galería de fotos interactiva para alternar entre capturas de la interfaz.

### Archeoscope (Flagship Project)
- **Galería**: Añadido galería interactiva de fotos que complementa la imagen original con capturas del motor de cómputo celeste y astrológico.
- **Logo**: Integración del logo oficial (`logo-archeoscope-main.png`) al lado del título del ecosistema ArcheoScope y en los menús de navegación (Navbar desplegable y menú móvil) en reemplazo del emoji `🌌`.
- **PC Game**: Actualizado el estado del juego original de PC a '¡Listo! (Próximamente video de promoción)'.
- **Copy**: Copy reescrito para destacar los aspectos de ingeniería astronómica y desarrollo asistido por IA de alta madurez.

### Identidad & SEO (Hero y Meta Tags)
- **Hero**: Tagline y subtexto actualizados con el rol de "Software Architect · AI Systems · Knowledge Engineering" y la frase de visión.
- **Meta-tags**: Meta-etiquetas actualizadas (título, descripción, tags de Open Graph y Twitter) junto al esquema JSON-LD para reflejar la orientación arquitectónica.

### Experiencia & Ecosistema (Ex-Works)
- **Experiencia**: Creación de la sección independiente para S.I.G.A.P, destacando el impacto de la transformación digital de alumbrado público con bases de datos espaciales (PostGIS) y removiendo el badge de 'Producción activa' de la tarjeta.
- **Ecosistema**: Creación de una sección para micro-sistemas, que agrupa Oxlahun Cauac y Pillow con dos nuevos proyectos de desarrollo: **Radar Dev** (telemetría de agentes) y **Plantas** (módulo documental para RAG local).

### Componentes de UI & Navegación
- **Estilos**: Estilos premium agregados en `style.css` para el diagrama de terminal, las tarjetas de métricas y las transiciones de las galerías interactivas de fotos.
- **Galería de fotos**: Implementado una función genérica en `script.js` (`setProjectImage`) para cambiar imágenes de proyectos en caliente.

---

## [2025-05-06] — Project descriptions rewrite + positioning

### Works Descriptions
- **SIGAP**: rewritten as technical system description (GIS + backend + spatial DB), removed "en producción" claim
- **Pillow**: repositioned from product copy to UX case study ("prototipo de e-commerce con foco en UX, microinteracciones, drawer cart, feedback en tiempo real")
- **Oxlahun Cauac**: rewritten as design project ("identidad visual propia, diseño responsive, animaciones CSS, narrativa visual coherente")

### Archeoscope PC
- Description rewritten to balance "juego + sistema": "experiencia lúdica construida sobre un sistema modular de interacción"

### Hero
- "Software Público" → "Open Source" (más alineado con el perfil)

---

## [2025-05-05] — Layout fixes, AI horizontal, Works flattened

### Works Section
- Removed subgroup separation ("Sistemas reales" / "Independientes") — all projects now in a single flat grid at equal hierarchy

### AI-Assisted Development Section
- Redesigned from vertical stacked layout to **horizontal two-column**: text left + 4 mini-cards right (2×2 grid)
- Reduced from 6 cards to 4 (Multi-modelo, Skills reutilizables, Validación humana, Control arquitectónico)
- Removed redundant subtitle and insight block — integrated into main text column
- Responsive: collapses to single column on mobile
- **Fix**: added `width/max-width/margin !important` reset to prevent generic `section {}` rule from collapsing `.ai-section` width to 500px

### Fixes
- Hero: "ENGINEER" → "DEVELOPER" (título técnico, no ingeniería)
- Archeoscope PC: removed "Unity" from tech tags (only Three.js)
- Live preview buttons: simplified to solid background, removed broken pseudo-elements
- Footer year: now dynamic via `new Date().getFullYear()`
- Service worker cache bumped to v3

### Asset Cleanup
- Deleted 7 remaining obsolete videos (ergovideo, gsites, mate, portfolio, Sigap, upsidewaves, waves)
- Removed CSS for unused `.works-subgroup` styles

---

## [2025-05-05] — Major Redesign & PWA

### Visual & Typography
- New font system: **Inter** (headings/UI) + **IBM Plex Sans** (body/descriptions)
- Unified blue-tinted color palette across all sections (cool greys, navy accents)
- Hero rewritten: "Construyo sistemas reales + interfaces experimentales"
- Title corrected: "Full Stack Developer" (not Engineer)

### Sections Redesigned
- **Works**: split into "Sistemas reales" (SIGAP with production badge) and "Proyectos independientes" (Oxlahun Cauac, Pillow)
- **Figma / Design Work**: minimal gallery grid with hover zoom
- **Contact**: inline section (not modal), FormSubmit → Gmail, honeypot spam protection
- **Visual Lab**: replaced D3 hypercube with interactive 3D model viewer (ufo.glb via Google model-viewer)
- **AI-Assisted Development**: promoted to standalone section with capability cards and grid pattern background

### Archeoscope
- Clarified as ecosystem: PC game (original) + mobile companion app (different functions)
- Narrative rewrite explaining the relationship between both versions
- Added AI-Assisted Dev tag and methodology description

### AI-Assisted Development Section
- 6 capability cards: Multi-modelo, Skills reutilizables, Validación humana, Prompting estratégico, Control arquitectónico, Iteración acelerada
- Closing insight: "El diferencial no es usar IA, es saber dirigirla"

### PWA
- `manifest.json` with icons (72–512px), theme color, standalone display
- `sw.js` service worker: cache-first for assets, network-first for HTML, skip videos
- Apple touch icon, favicon, meta tags for iOS/Android
- Mobile fixes: safe-area insets, 44px touch targets, iOS zoom prevention, smooth scroll

### Dynamic Project Previews
- `projects.json` config for Archeoscope, Pillow, Oxlahun Cauac
- Async HEAD check for remote preview videos (Playwright-generated)
- Iframe modal with backdrop blur, Escape close, fallback for X-Frame-Options
- "Live preview" buttons on project cards
- `_repo-template/` with GitHub Actions workflow + Playwright recorder for each project repo

### Removed
- Ergonomic project (removed from Works and navbar)
- D3/hypercube (replaced by model-viewer)
- 70+ obsolete assets (dragons, mountains, old logos, unused videos, duplicate images)
- Old fonts (Montserrat, Lato, Space Grotesk, Aguafina Script, Bitstream Vera Sans Mono)

### Infrastructure
- Service worker cache versioning (v2)
- `fuentes/` folder kept but no longer loaded (fonts via Google CDN)
- Git remote switched to SSH-compatible setup

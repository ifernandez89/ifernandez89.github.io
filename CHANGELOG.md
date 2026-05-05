# Changelog

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

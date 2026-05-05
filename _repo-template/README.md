# 🎬 Auto-Preview Template

Este template genera automáticamente un video preview del sitio y lo publica junto al deploy de GitHub Pages. El portfolio de Ignacio Fernández (https://ifernandez89.github.io/) consume ese preview dinámicamente.

## Qué genera

- `preview.webm` — grabación Playwright (10-15s, resolución 1280x720)
- `preview.mp4` — conversión H.264 para máxima compatibilidad (iOS, etc.)

Ambos quedan accesibles en:
```
https://<usuario>.github.io/<repo>/preview.webm
https://<usuario>.github.io/<repo>/preview.mp4
```

## Cómo instalarlo en un repo

### 1. Copiar los archivos

Copiá estos archivos al root del repo:

```
.github/workflows/preview.yml
scripts/record-preview.js
scripts/package.json
```

### 2. Configurar la URL a grabar

Editá `scripts/record-preview.js` y cambiá la constante `TARGET_URL` por la URL pública del sitio (el Pages del mismo repo generalmente). Si el repo NO sirve desde el root, ajustalo.

### 3. Configurar el flujo de grabación (opcional)

Dentro de `record-preview.js` hay una función `performActions(page)` donde podés simular navegación específica de tu proyecto: scroll, clicks, hovers. El template incluye un scroll suave por defecto que funciona para la mayoría de los sitios.

### 4. Habilitar GitHub Actions

En tu repo: Settings → Actions → General → "Workflow permissions" → marcar **"Read and write permissions"**. Esto permite que el workflow commitee el preview.

### 5. Correr por primera vez

Ir a la pestaña **Actions** → "Generate preview video" → **Run workflow**. Tarda ~2-3 minutos. Al terminar, revisá que en la rama `main` aparezcan `preview.webm` y `preview.mp4`.

GitHub Pages los servirá automáticamente en la próxima publicación.

## Triggers del workflow

El workflow corre:
- **Manual**: botón "Run workflow" en Actions (para forzar regeneración)
- **Semanal**: todos los domingos a las 04:00 UTC (para mantener el preview fresco)

> No corre en cada push para evitar commits en loop.

## Cómo funciona

1. Playwright abre la URL pública del sitio en Chromium headless
2. Graba video mientras ejecuta la función `performActions()` (scroll + interacciones opcionales)
3. ffmpeg convierte `.webm` → `.mp4` con codec H.264
4. El workflow commitea ambos archivos al repo
5. GitHub Pages los re-publica automáticamente

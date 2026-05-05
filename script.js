// Script for side navigation
function w3_open() {
  var x = document.getElementById("mySidebar");
  x.style.fontFamily="Inter, sans-serif";
  x.style.width = "250px";
  x.style.paddingTop = "15%";
  x.style.display = "block";
}

// Close side navigation
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  x.style.paddingTop = "15%";
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

/*-----------------------------------------------------------------------------------------*/
/* Service Worker Registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(reg) {
        console.log('SW registered:', reg.scope);
      })
      .catch(function(err) {
        console.warn('SW registration failed:', err);
      });
  });
}

/*-----------------------------------------------------------------------------------------*/
/* PWA Install prompt */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) {
    btn.style.display = 'inline-flex';
    btn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        btn.style.display = 'none';
      });
    });
  }
});

window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'none';
});

/*-----------------------------------------------------------------------------------------*/
/* Mobile: close nav on link click */
document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('#navDemo a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      var x = document.getElementById("navDemo");
      x.className = x.className.replace(" w3-show", "");
    });
  });
});

/*-----------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------*/
/* Experimental Systems — Particle Background */
(function() {
  var canvas = document.getElementById('particle-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var COUNT = 60;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  };
  Particle.prototype.update = function() {
    // Subtle attraction toward mouse
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.vx += dx * 0.00015;
      this.vy += dy * 0.00015;
    }
    // Speed cap
    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 1.2) { this.vx *= 0.95; this.vy *= 0.95; }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  };

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(126,184,212,' + (0.12 * (1 - dist / 90)) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(126,184,212,' + particles[i].alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', function() {
    resize();
  });

  var section = document.getElementById('about');
  if (section) {
    section.addEventListener('mousemove', function(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', function() {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  init();
  animate();
})();

/*-----------------------------------------------------------------------------------------*/
/* Dynamic Project Previews — loads projects.json, swaps videos with remote previews,
   wires interactive iframe modal. Fully non-blocking: if anything fails, falls back to
   the locally-committed video/image already in the DOM. */
(function() {
  const CONFIG_URL = 'projects.json';

  // Test if a remote resource exists (HEAD request, short timeout)
  async function remoteExists(url) {
    if (!url) return false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, { method: 'HEAD', signal: controller.signal, mode: 'cors' });
      clearTimeout(timeoutId);
      return res.ok;
    } catch (err) {
      return false;
    }
  }

  // Build the <source> tags and inject into an existing <video> element.
  // If remote preview exists -> use it (webm + mp4). Else keep the existing src.
  async function enhanceVideo(videoEl, project) {
    if (!videoEl) return;

    const hasRemoteMp4 = await remoteExists(project.previewMp4);
    const hasRemoteWebm = await remoteExists(project.previewWebm);

    if (!hasRemoteMp4 && !hasRemoteWebm) return; // keep local fallback

    // Clear existing src and use <source> tags (webm first for quality)
    const currentSrc = videoEl.getAttribute('src');
    videoEl.removeAttribute('src');
    videoEl.innerHTML = '';

    if (hasRemoteWebm) {
      const s = document.createElement('source');
      s.src = project.previewWebm;
      s.type = 'video/webm';
      videoEl.appendChild(s);
    }
    if (hasRemoteMp4) {
      const s = document.createElement('source');
      s.src = project.previewMp4;
      s.type = 'video/mp4';
      videoEl.appendChild(s);
    }
    // Final fallback: original local source
    if (currentSrc) {
      const s = document.createElement('source');
      s.src = currentSrc;
      videoEl.appendChild(s);
    }

    videoEl.load();
    const playPromise = videoEl.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {});
  }

  // ─── Iframe Modal ─────────────────────────────────────────────────────────
  let modalEl = null;
  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'iframe-modal';
    modalEl.innerHTML = `
      <div class="iframe-modal-backdrop" data-close></div>
      <div class="iframe-modal-inner">
        <div class="iframe-modal-header">
          <span class="iframe-modal-title"></span>
          <div class="iframe-modal-actions">
            <a class="iframe-modal-open" target="_blank" rel="noopener noreferrer" aria-label="Abrir en nueva pestaña">
              <i class="fa fa-external-link"></i>
            </a>
            <button class="iframe-modal-close" data-close aria-label="Cerrar">×</button>
          </div>
        </div>
        <div class="iframe-modal-body">
          <iframe title="Project preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" loading="lazy"></iframe>
          <div class="iframe-modal-fallback" hidden>
            <p>Este sitio no permite embeberse en otra página.</p>
            <a class="iframe-modal-fallback-btn" target="_blank" rel="noopener noreferrer">Abrir en nueva pestaña ↗</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);

    // Close on backdrop / X button
    modalEl.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
    });

    return modalEl;
  }

  function openModal(project) {
    const el = ensureModal();
    const iframe = el.querySelector('iframe');
    const title = el.querySelector('.iframe-modal-title');
    const openLink = el.querySelector('.iframe-modal-open');
    const fallback = el.querySelector('.iframe-modal-fallback');
    const fallbackBtn = el.querySelector('.iframe-modal-fallback-btn');

    title.textContent = project.name;
    openLink.href = project.liveUrl;
    fallbackBtn.href = project.liveUrl;
    fallback.hidden = true;
    iframe.hidden = false;

    // Try to load iframe; if blocked by X-Frame-Options or CSP, show fallback.
    // (onload fires even on blocked pages, so we check post-load with a small delay.)
    iframe.onload = () => {
      try {
        // If cross-origin and blocked, accessing contentWindow.location throws.
        // We can't reliably detect X-Frame-Options blocking, so trust the load event.
      } catch (err) {
        iframe.hidden = true;
        fallback.hidden = false;
      }
    };

    iframe.src = project.liveUrl;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    const iframe = modalEl.querySelector('iframe');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';
  }

  // ─── Wire up ──────────────────────────────────────────────────────────────
  async function init() {
    let data;
    try {
      const res = await fetch(CONFIG_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('projects.json not found');
      data = await res.json();
    } catch (err) {
      console.warn('Project previews disabled:', err.message);
      return;
    }

    // For every [data-project="key"] in the DOM, enhance its media
    // and wire its interact button.
    const hosts = document.querySelectorAll('[data-project]');
    hosts.forEach((host) => {
      const key = host.getAttribute('data-project');
      const project = data.projects[key];
      if (!project) return;

      const video = host.querySelector('video');
      if (video) enhanceVideo(video, project);

      const interactBtn = host.querySelector('[data-interact]');
      if (interactBtn) {
        interactBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (project.embeddable) {
            openModal(project);
          } else {
            window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
          }
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

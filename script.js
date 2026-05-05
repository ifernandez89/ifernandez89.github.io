// Script for side navigation
function w3_open() {
  var x = document.getElementById("mySidebar");
  x.style.fontFamily="Orbitron-Regular";
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

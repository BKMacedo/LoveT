
const canvas = document.getElementById('chuvaFofo');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

const hearts = Array.from({ length: 30 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: 20 + Math.random() * 10,
  speed: 1 + Math.random() * 2
}));

const emoji = "✨";

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.font = "24px serif";

  hearts.forEach(h => {
    ctx.fillText(emoji, h.x, h.y);
    h.y += h.speed;
    if (h.y > height) {
      h.y = -20;
      h.x = Math.random() * width;
    }
  });

  requestAnimationFrame(draw);
}

draw();

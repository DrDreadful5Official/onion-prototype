// Starfield effect code
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const numStars = 1000; // Number of stars
const stars = [];
let speed = 2; // Speed of the stars

// Initialize stars
function initStars() {
  stars.length = 0; // Clear existing stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width,
    });
  }
}

initStars(); // Initialize the stars initially

function drawStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  stars.forEach(star => {
    star.z -= speed;
    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width - centerX;
      star.y = Math.random() * canvas.height - centerY;
    }

    const sx = (star.x / star.z) * canvas.width + centerX;
    const sy = (star.y / star.z) * canvas.height + centerY;
    const size = (1 - star.z / canvas.width) * 3;

    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();

// Adjust canvas size and stars position on window resize
window.addEventListener('resize', () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  initStars(); // Reinitialize stars based on new canvas size
});

// 3D Card Rotation
const card = document.querySelector('.card');
const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = cardContainer.getBoundingClientRect();
  const mouseX = e.clientX - left;
  const mouseY = e.clientY - top;

  const rotateX = ((mouseY / height) - 0.5) * 20; // Rotation on X axis
  const rotateY = ((mouseX / width) - 0.5) * -20; // Rotation on Y axis

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

cardContainer.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
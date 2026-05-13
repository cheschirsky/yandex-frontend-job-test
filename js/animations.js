const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(element => {
  observer.observe(element);
});

// Самолетик

if (window.matchMedia('(min-width: 601px)').matches) {
	
const plane = document.querySelector('.plane');
const section = document.querySelector('.stages');

let current = 0;
let target = 0;

window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = (windowHeight - rect.top) / (windowHeight + rect.height);

  // диапазон движения (позже старт / раньше финиш)
  const startDelay = 0.35;
  const endEarly = 0.95;

  progress = (progress - startDelay) / (endEarly - startDelay);

  target = Math.max(0, Math.min(progress, 1));
});

// плавный "догоняющий" рендер
function animate() {
  // инерция (чем меньше коэффициент — тем "тяжелее" самолёт)
  current += (target - current) * 0.08;

  // дрейф (как лёгкая турбулентность)
  const driftX = Math.sin(Date.now() * 0.0012) * 6;
  const driftY = Math.cos(Date.now() * 0.001) * 3;

  // ease-in-out для основного движения
  const eased = current * current * (3 - 2 * current);

  const x = eased * -1250 + driftX;
  const y = eased * -30 + driftY;

  plane.style.transform =
    `translate(${x}px, ${y}px) rotate(-12deg)`;

  requestAnimationFrame(animate);
}

animate();

}

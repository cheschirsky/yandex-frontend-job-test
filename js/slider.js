/* --- Слайдер этапов --- */

if (window.matchMedia('(max-width: 991px)').matches) {
	
function initStagesSlider() {
  const cards = document.querySelectorAll('.stage-card');
  const track = document.querySelector('.stages__track');
  const dotsContainer = document.querySelector('.slider__dots');
  const prevBtn = document.querySelector('.stage-btn--prev');
  const nextBtn = document.querySelector('.stage-btn--next');

  const slidesData = [
  [0, 1], // 1,2
  [2],    // 3
  [3, 4], // 4,5
  [5],    // 6
  [6]     // 7
  ];

  let current = 0;

  // создаём слайды
  const slides = slidesData.map(group => {
    const slide = document.createElement('div');
    slide.classList.add('stage-slide');

    group.forEach(i => {
      slide.appendChild(cards[i]);
    });

    track.appendChild(slide);
    return slide;
  });

  // dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = index;
    update();
  }

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    update();
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  update();
}

initStagesSlider();

}

/* --- Слайдер участников --- */

function initParticipantsSlider() {
  const track = document.querySelector('.participants__track');

  const nextBtn = document.querySelector('.participants-btn--next');
  const prevBtn = document.querySelector('.participants-btn--prev');

  const currentNumberEl = document.querySelector('.slide-number');
  const totalNumberEl = document.querySelector('.slide-number__all');

  // оригиналы ДО клонов (ВАЖНО)
  const originalSlides = [...track.querySelectorAll('.participant-card')];

  const visibleSlides = 3;

  // клоны
  const firstClones = originalSlides
    .slice(0, visibleSlides)
    .map(slide => slide.cloneNode(true));

  const lastClones = originalSlides
    .slice(-visibleSlides)
    .map(slide => slide.cloneNode(true));

  lastClones.reverse().forEach(clone => track.prepend(clone));
  firstClones.forEach(clone => track.append(clone));

  // теперь ВСЕ элементы трека (включая клоны)
  const slides = [...track.children];

  let index = visibleSlides;
  let isAnimating = false;

  function getSlideWidth() {
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return slide.offsetWidth + gap;
  }

  function updateSlider(animated = true) {
    track.style.transition = animated ? 'transform 1.2s ease' : 'none';
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
  }

  function updateCounter() {
    const total = originalSlides.length;

    let current = index - visibleSlides;

    if (current >= total) current = 0;
    if (current < 0) current = total - 1;

    currentNumberEl.textContent = current + 1;
    totalNumberEl.textContent = total;
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    index++;
    updateSlider();
    updateCounter();
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    index--;
    updateSlider();
    updateCounter();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  track.addEventListener('transitionend', () => {
    const total = originalSlides.length;

    if (index >= total + visibleSlides) {
      track.style.transition = 'none';
      index = visibleSlides;
      updateSlider(false);
      updateCounter();
      track.offsetHeight;
      track.style.transition = 'transform 0.4s ease';
    }

    if (index < visibleSlides) {
      track.style.transition = 'none';
      index = total + visibleSlides - 1;
      updateSlider(false);
      updateCounter();
      track.offsetHeight;
      track.style.transition = 'transform 0.4s ease';
    }

    isAnimating = false;
  });

  setInterval(nextSlide, 4000);

  window.addEventListener('resize', () => {
    updateSlider(false);
  });

  updateSlider(false);
  updateCounter();
}

initParticipantsSlider();
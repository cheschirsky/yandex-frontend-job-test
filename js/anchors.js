const anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(anchor => {
  anchor.addEventListener('click', event => {
    const id = anchor.getAttribute('href');

    if (id === '#') return;

    event.preventDefault();

    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
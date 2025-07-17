document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('.carousel-images img');
  const indicators = carousel.querySelectorAll('.bar');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const imagesContainer = carousel.querySelector('.carousel-images');
  let index = 0;
  let interval;

  function updateCarousel() {
    const width = images[0].clientWidth;
    imagesContainer.style.transform = `translateX(-${index * width}px)`;
    indicators.forEach((bar, i) => {
      bar.classList.toggle('active', i === index);
    });
  }

  function nextImage() {
    index = (index + 1) % images.length;
    updateCarousel();
  }

  function prevImage() {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextImage, 4000);
  }

  nextBtn.addEventListener('click', () => {
    nextImage();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevImage();
    resetInterval();
  });

  window.addEventListener('resize', updateCarousel);
  window.addEventListener('load', () => {
    updateCarousel();
    resetInterval();
  });
});





document.querySelectorAll('.ver-mas-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const parent = this.closest('.texto-contenido');
    const textoOculto = parent.querySelector('.texto-oculto');

    if (textoOculto.style.display === 'inline' || textoOculto.style.display === '') {
      textoOculto.style.display = 'none';
      this.textContent = 'Ver más';
    } else {
      textoOculto.style.display = 'inline';
      this.textContent = 'Ver menos';
    }
  });
});


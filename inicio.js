// 🔵 1. Seleccionamos elementos clave del DOM
const carrusel = document.getElementById('carrusel');       // Contenedor horizontal del carrusel
const indicadores = document.getElementById('indicadores'); // Contenedor de los indicadores (dots)
const reseñas = carrusel.querySelectorAll('.reseña');       // Todas las tarjetas de reseñas

// 🔵 2. Variables de configuración
const gap = 30;                         // Espacio entre reseñas
const totalItems = reseñas.length;     // Total de reseñas
let visibleItems = 3;                  // Cuántas reseñas se muestran al mismo tiempo
let totalSlides = 0;                   // Cuántas "páginas" hay en total
let currentSlide = 0;                  // Slide actual (página actual del carrusel)
let autoScroll;                        // Intervalo para auto-avance

// 🔵 3. Calcula cuántos elementos mostrar según el tamaño de pantalla
function getVisibleItems() {
  const ancho = window.innerWidth;
  if (ancho <= 500) return 1;     // 🟡 Teléfonos pequeños: 1 reseña por vez
  if (ancho <= 900) return 2;     // 🟢 Tablets: 2 reseñas
  return 3;                       // 🔵 Pantallas grandes: 3 reseñas
}

// 🔵 4. Configura carrusel e indicadores según el tamaño de pantalla
function actualizarLayout() {
  visibleItems = getVisibleItems();
  totalSlides = Math.ceil(totalItems / visibleItems);
  currentSlide = 0;
  crearIndicadores();
  actualizarTransform();
}

// 🔵 5. Crea los botones de navegación (dots) abajo del carrusel
function crearIndicadores() {
  indicadores.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('activo');
    dot.addEventListener('click', () => {
      currentSlide = i;
      actualizarTransform();
    });
    indicadores.appendChild(dot);
  }
}

// 🔵 6. Desplaza el carrusel horizontalmente según la slide actual
function actualizarTransform() {
  const reseñaWidth = carrusel.querySelector('.reseña').offsetWidth + gap;
  const desplazamiento = currentSlide * reseñaWidth;
  carrusel.style.transform = `translateX(-${desplazamiento}px)`;
  actualizarIndicadores(currentSlide);
}

// 🔵 7. Actualiza qué dot está activo
function actualizarIndicadores(index) {
  const dots = indicadores.querySelectorAll('button');
  dots.forEach(dot => dot.classList.remove('activo'));
  if (dots[index]) dots[index].classList.add('activo');
}

// 🔵 8. Mueve el carrusel manualmente hacia adelante o atrás
function moverCarrusel(direccion) {
  currentSlide += direccion;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  actualizarTransform();
}

// 🔵 9. Inicia el auto-scroll del carrusel (cada 4 segundos)
function iniciarAutoScroll() {
  autoScroll = setInterval(() => {
    moverCarrusel(1);
  }, 4000);
}

// 🔵 10. Detiene el auto-scroll temporalmente
function detenerAutoScroll() {
  clearInterval(autoScroll);
}

// 🔵 11. Pausa auto-scroll al pasar el mouse (solo desktop)
carrusel.addEventListener('mouseover', detenerAutoScroll);
carrusel.addEventListener('mouseout', iniciarAutoScroll);

// 🔵 12. Swipe en móviles: detecta movimiento horizontal
let startX = 0;
let isDown = false;

carrusel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDown = true;
  detenerAutoScroll();
});

carrusel.addEventListener('touchend', (e) => {
  if (!isDown) return;
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) moverCarrusel(1);    // swipe izquierda → siguiente
    else moverCarrusel(-1);           // swipe derecha → anterior
  }

  isDown = false;
  iniciarAutoScroll();
});

// 🔵 13. Recalcula todo cuando cambia el tamaño de la ventana
window.addEventListener('resize', actualizarLayout);

// 🔵 14. Inicializa el carrusel cuando carga la página
window.addEventListener('load', actualizarLayout);
iniciarAutoScroll();

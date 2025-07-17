document.addEventListener("DOMContentLoaded", () => {
  const menuIcono = document.getElementById('menu_icono');
  const menuLista = document.getElementById('menu_lista');
  const encabezado = document.getElementById('encabezado');
  const arriba = document.getElementById('arriba');
  let lastScrollY = window.scrollY;

  // Mostrar / ocultar menú hamburguesa
  window.toggleMenu = function () {
    menuLista.classList.toggle('show');
    menuIcono.classList.toggle('abierto');
  }

  // Ocultar barra superior al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30 && window.scrollY > lastScrollY) {
      arriba.classList.add('oculto');
      encabezado.style.top = '0';
    } else {
      arriba.classList.remove('oculto');
      encabezado.style.top = '50px';
    }
    lastScrollY = window.scrollY;
  });

  // Obtener nombre de la página actual
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  // Submenús: solo se abren en la página correspondiente
  document.querySelectorAll('.menu_item > a').forEach(link => {
    const submenu = link.nextElementSibling;

    link.addEventListener('click', e => {
      if (window.innerWidth <= 768 && submenu && submenu.classList.contains('submenu')) {
        const href = link.getAttribute('href');
        const hrefPagina = href?.split('/').pop();

        if (hrefPagina === paginaActual || href === '#') {
          e.preventDefault();
          submenu.classList.toggle('visible');

          // Cerrar otros submenús
          document.querySelectorAll('.submenu.visible').forEach(otro => {
            if (otro !== submenu) otro.classList.remove('visible');
          });
        }
      }
    });
  });

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const destino = document.getElementById(anchor.getAttribute('href').substring(1));
      if (destino) {
        e.preventDefault();
        window.scrollTo({ top: destino.offsetTop - 70, behavior: 'smooth' });
        menuLista.classList.remove('show');
        menuIcono.classList.remove('abierto');
      }
    });
  });

  //  Cerrar submenú y hamburguesa al hacer clic en una opción del submenu
  document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.submenu.visible').forEach(sub => {
        sub.classList.remove('visible');
      });

      menuLista.classList.remove('show');
      menuIcono.classList.remove('abierto');
    });
  });
});


// === Botones "Ver más / Ver menos"
document.querySelectorAll('.ver-mas-btn').forEach(boton => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.texto-contenido');
    const textoOculto = contenedor.querySelector('.texto-oculto');

    if (textoOculto.style.display === 'inline') {
      textoOculto.style.display = 'none';
      boton.textContent = 'Ver más';
    } else {
      textoOculto.style.display = 'inline';
      boton.textContent = 'Ver menos';
    }
  });
});

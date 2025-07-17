document.addEventListener("DOMContentLoaded", function () {
  const opciones = document.querySelectorAll(".opcion");

  function showVisible() {
    const triggerBottom = window.innerHeight * 0.9;

    opciones.forEach(op => {
      const boxTop = op.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        op.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", showVisible);
  showVisible();
});
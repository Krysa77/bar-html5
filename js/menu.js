// Rozbalovací menu na mobilu
(function () {
  'use strict';

  const toggler = document.querySelector('.nav-toggler');
  const menu = document.getElementById('navbarNav');
  if (!toggler || !menu) return;

  toggler.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    toggler.setAttribute('aria-expanded', String(isOpen));
  });
})();

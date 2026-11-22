// Zvětšení obrázků v galerii po kliknutí (nahrazuje knihovnu Lightbox2)
(function () {
  'use strict';

  let overlay = null;

  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  function open(src, alt) {
    close();

    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Zvětšený obrázek');

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Zavřít');
    closeBtn.textContent = '\u00d7';

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    overlay.addEventListener('click', close);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeBtn.focus();
  }

  document.querySelectorAll('a.zoom').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const thumb = link.querySelector('img');
      open(link.getAttribute('href'), thumb ? thumb.alt : '');
    });
  });
})();

function imgFallback(img) {
  var exts = ['jpg', 'jpeg', 'png', 'webp'];
  var i = parseInt(img.dataset.fbIndex || '0', 10) + 1;
  if (i < exts.length) {
    img.dataset.fbIndex = i;
    img.src = img.dataset.base + '.' + exts[i];
  } else {
    img.style.display = 'none';
    var placeholder = img.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
  }
}

(function () {
  function getOverlay() {
    var overlay = document.getElementById('lightbox-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'lightbox-overlay';
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-img" alt="">';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', closeLightbox);
    }
    return overlay;
  }

  function openLightbox(src, alt) {
    var overlay = getOverlay();
    var img = overlay.querySelector('.lightbox-img');
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('active');
  }

  function closeLightbox() {
    var overlay = document.getElementById('lightbox-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('.gallery-shot img');
    if (img && img.style.display !== 'none' && img.complete && img.naturalWidth > 0) {
      openLightbox(img.src, img.alt);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();

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

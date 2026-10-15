/* Progressive loader: only the faces near the reader's current page fetch their photo.
   Keeps a 997-photo book instant to open while everything stays in the file. */
(function () {
  var faces = Array.prototype.slice.call(document.querySelectorAll('#book .book-page'));
  var sources = faces.map(function (face) {
    return Array.prototype.slice.call(face.querySelectorAll('img[data-src]'));
  });
  var loaded = new Array(faces.length).fill(false);
  var behind = 8, ahead = 14;

  function loadFace(i) {
    if (i < 0 || i >= faces.length || loaded[i]) return;
    loaded[i] = true;
    sources[i].forEach(function (img) {
      img.src = img.getAttribute('data-src');
    });
  }

  function loadAround(center) {
    if (!Number.isFinite(center)) return;
    for (var i = center - behind; i <= center + ahead; i += 1) loadFace(i);
  }

  function currentPage() {
    var book = window.__book;
    if (!book || typeof book.getCurrentPageIndex !== 'function') return 0;
    return Number(book.getCurrentPageIndex()) || 0;
  }

  loadAround(0);

  var book = window.__book;
  if (book && typeof book.on === 'function') {
    book.on('flip', function (event) { loadAround(Number(event.data)); });
    book.on('changeOrientation', function () { loadAround(currentPage()); });
  }

  /* a deep link (?page=N) turns the book before this script exists, so catch up on the
     page the reader is actually showing instead of assuming the cover */
  loadAround(currentPage());

  /* safety net: whichever control the reader uses, keep the neighbourhood warm */
  ['click', 'keyup', 'touchend', 'mouseup'].forEach(function (type) {
    document.addEventListener(type, function () {
      window.setTimeout(function () { loadAround(currentPage()); }, 80);
    }, true);
  });
})();

/* SWHepos service worker — offline app shell (by ZS-Top) */
var CACHE = 'swhepos-v17';
var SHELL = [
  './', './index.html', './swmaps.js', './hepos.js', './hepos_grids.js',
  './manifest.webmanifest', './assets/zstop-logo.png', './assets/aviyaan-logo.png', './assets/softwel-logo.png',
  './icon-192.png', './icon-512.png',
  './lib/leaflet.js', './lib/leaflet.css', './lib/proj4.js',
  './lib/xlsx.full.min.js', './lib/sql-wasm.js', './lib/sql-wasm.wasm'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return Promise.allSettled(SHELL.map(function (u) { return c.add(u); })); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var u = e.request.url;
  // Χάρτες tiles: άσ' τα στον browser (δεν τα cache-άρουμε — δουλεύουν μόνο online)
  if (u.indexOf('tile.openstreetmap') >= 0 || u.indexOf('arcgisonline') >= 0) return;
  // Network-first: πάντα φρέσκο όταν υπάρχει ίντερνετ· cache fallback μόνο για offline.
  e.respondWith(
    fetch(e.request).then(function (resp) {
      if (resp && resp.ok) { var cp = resp.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cp); }); }
      return resp;
    }).catch(function () { return caches.match(e.request); })
  );
});

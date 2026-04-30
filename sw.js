const CACHE_NAME = 'v1_cache_tickets';
const urlsToCache = ['./', './index.html', './app.js', './manifest.json'];

// Instalar y guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// Responder desde caché si no hay red
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

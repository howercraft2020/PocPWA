const CACHE_NAME = 'v2_cache_tickets'; // Actualizamos la versión
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json'
];

// Instalar y forzar el guardado inmediato
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Obliga a la app a usar esta nueva versión al instante
  );
});

// Tomar el control de la app inmediatamente
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Estrategia Offline-First: Buscar primero en caché, luego en internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      // Si está en la caché, lo devuelve. Si no, lo busca en internet.
      return response || fetch(e.request);
    }).catch(() => {
      // Si no hay internet y no está en caché, muestra el index.html por defecto
      return caches.match('/index.html');
    })
  );
});

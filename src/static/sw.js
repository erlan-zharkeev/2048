const CACHE_NAME = '2048-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/main.js',
  '/main.css',
  '/site.webmanifest',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-256x256.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

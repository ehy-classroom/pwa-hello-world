const CACHE_NAME = 'pwa-sample-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Add any additional resources you want to cache (e.g., icons, CSS, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Cache add failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        // Else fetch from the network
        return fetch(event.request);
      })
  );
});

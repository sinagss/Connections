const cacheName = "cache-v1";

const precacheResources = [
  "/index.html",
  "/offline.html",
  "/src/assets/icons/icon-144x144.png",
  "/src/assets/icons/icon-152x152.png",
  "/src/assets/icons/icon-192x192.png",
  "/src/assets/icons/icon-384x384.png",
  "/src/assets/icons/icon-512x512.png",
  "/src/assets/icons/icon-72x72.png",
  "/src/assets/icons/icon-96x96.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

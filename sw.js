/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js"
);

if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: "/index.html", revision: "1" },
    { url: "/offline.html", revision: "1" },
    { url: "/src/assets/about.jpg", revision: "1" },
    { url: "/src/assets/networking.png", revision: "1" },
    { url: "/src/assets/notFound-1.svg", revision: "1" },
    { url: "/src/assets/user.png", revision: "1" },
    { url: "/src/assets/users.png", revision: "1" },
  ]);
}

if (workbox) {
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst()
  );
  // Add more route registrations and caching strategies
}

if (workbox) {
  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case "document":
        return caches.match("/offline.html");
      default:
        return Response.error();
    }
  });
}

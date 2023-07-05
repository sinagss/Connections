import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

export default defineConfig({
  build: {
    assetsDir: "assets",
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Virtual Connections",
        short_name: "Connections",
        description:
          "An app to manage all your social and professional conections.",
        theme_color: "#1976d2",
        background_color: "#1976d2",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*"],
        globDirectory: ".",
      },
      rollupOptions: {
        input: {
          index: resolve("index.html"),
          offline: resolve("offline.html"),
        },
      },
      includeAssets: ["**/*"],
    }),
  ],
});

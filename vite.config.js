import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "auto",
      manifest: {
        name: "Virtual Connections",
        short_name: "Connections",
        start_url: "/",
        icons: [
          {
            src: "./src/assets/user.png",
            sizes: "26x26",
            type: "image/png",
          },
        ],
        background_color: "#3E4EB8",
        display: "standalone",
        theme_color: "#2E3AA1",
      },
      workbox: {
        // Customize the Workbox options here
        // For example, precaching additional assets:
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,gif,svg}"],
        globDirectory: "./src/assets",
      },
    }),
  ],
});

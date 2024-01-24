// vite.config.js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/vals-v4/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["three"],
        },
      },
    },
    chunkSizeWarningLimit: 600, // set your desired size limit
  },
});

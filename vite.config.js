import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/se_project_react/",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      // Proxy any direct calls to items, users, etc. to the backend
      "/items": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/signin": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/signup": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    // __API__: JSON.stringify("http://localhost:8000"),
    __API__: JSON.stringify("https://news-profile-back.onrender.com"),
    __WEATHER_API__: JSON.stringify("https://api.openweathermap.org/data/2.5"),
    __CURRENCY_API__: JSON.stringify("https://api.exchangeratesapi.io"),
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: "modern-compiler",
  //     },
  //   },
  // },
});

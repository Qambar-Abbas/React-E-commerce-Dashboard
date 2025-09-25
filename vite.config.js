import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/React-E-commerce-Dashboard/", // 👈 this must match your repo name
});

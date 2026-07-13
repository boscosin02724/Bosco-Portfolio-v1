import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
            return "react-vendor";
          }
          if (id.includes("/framer-motion/") || id.includes("/motion-dom/") || id.includes("/motion-utils/")) {
            return "motion";
          }
          if (id.includes("/gsap/")) return "gsap";
          if (id.includes("/lenis/")) return "lenis";
          if (id.includes("/lucide-react/")) return "icons";
          return "vendor";
        },
      },
    },
  },
});

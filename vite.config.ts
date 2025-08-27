import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// If deploying to GitHub Pages under a repo (e.g. /ojas-portfolio/),
// uncomment and set base to '/<repo-name>/'.
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  base: mode === "production" ? "/ojas-portfolio/" : "/", 
}));
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths() as unknown as PluginOption,
    svgr() as unknown as PluginOption,
    react(),
  ],
  base: "/",
});
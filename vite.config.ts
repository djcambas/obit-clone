import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
});

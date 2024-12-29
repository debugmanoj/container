import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        app1: "http://localhost:5173/dist/assets/remoteEntry.js",
        app2: "http://localhost:5174/dist/assets/remoteEntry.js",
        app3: "http://localhost:5175/dist/assets/remoteEntry.js",
      },
      shared: Object.keys(pkg.dependencies).reduce(
        (sharedConfig, dependency) => {
          sharedConfig[dependency] = {
            singleton: true, // Ensure the same instance is used across micro-apps
            requiredVersion: pkg.dependencies[dependency], // Use version from package.json
          };
          return sharedConfig;
        },
        {}
      ),
    }),
  ],
  build: {
    target: "esnext",
  },
});

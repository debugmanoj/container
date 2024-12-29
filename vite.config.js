import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import pkg from "./package.json";
console.log("process.env.VITE_APP1_URL: ", process.env.VITE_APP1_URL);
console.log("process.env.VITE_APP2_URL: ", process.env.VITE_APP2_URL);
console.log("process.env.VITE_APP3_URL: ", process.env.VITE_APP3_URL);
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "conainer",
      remotes: {
        app1: process.env.VITE_APP1_URL || "http://localhost:5173",
        app2: process.env.VITE_APP2_URL || "http://localhost:5174/",
        app3: process.env.VITE_APP3_URL || "http://localhost:5175/",
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

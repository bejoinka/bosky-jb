import federation from "@originjs/vite-plugin-federation";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import { reactReplacements } from "@softarc/native-federation-esbuild/src/lib/react-replacements";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "fs";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    server: {
      fs: {
        allow: ["."],
      },
      port: 3002,
    },
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    preview: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      port: 3002,
    },
    plugins: [
      {
        name: "generate-enviroment",
        options: function () {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/enviroment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`
          );
        },
      },
      federation({
        name: "@extension",
        filename: "remoteEntry.js",
        exposes: {
          "./example": "./src/ExampleComponent.tsx",
          "./extension-one": "./src/ExtensionOne.tsx",
          "./extension-two": "./src/ExtensionTwo.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: "18.2.0" },
          "react-dom": { singleton: true, requiredVersion: "18.2.0" },
          "@apollo/client": { requiredVersion: "^3.9.9", singleton: true },
        },
        adapter: createEsBuildAdapter({
          plugins: [],
          fileReplacements: reactReplacements.dev,
        }),
      }),
      react(),
    ],
  };
});

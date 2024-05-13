import { NextFederationPlugin } from "@module-federation/nextjs-mf";

export default {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "hosted-pages",
        filename: "static/runtime/remoteEntry.js",
        remotes: {
          extension: "http://localhost:3002/assets/remoteEntry.js",
        },
        shared: {
          "react/": { singleton: true, requiredVersion: "18.2.0" },
          "react-dom/": { singleton: true, requiredVersion: "18.2.0" },
          "@apollo/client": { requiredVersion: "^3.9.9", singleton: true },
        },
      })
    );

    return config;
  },
};

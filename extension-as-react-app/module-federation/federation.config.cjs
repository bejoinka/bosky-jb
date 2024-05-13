const {
  withNativeFederation,
  shareAll,
} = require("@softarc/native-federation/build");

module.exports = withNativeFederation({
  name: "extension",
  exposes: {
    "./example": "./src/ExampleComponent.tsx",
    "./extension-one": "./src/ExtensionOne.tsx",
    "./extension-two": "./src/ExtensionTwo.tsx",
  },
  shared: shareAll(),
  skip: [
    "react-dom/server",
    "react-dom/server.node",
    "vite-react-microfrontends",
  ],
});

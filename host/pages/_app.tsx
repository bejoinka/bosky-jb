import "@/styles/globals.css";
import { init } from "@module-federation/runtime";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  init({
    name: "hosted-pages",
    remotes: [
      {
        name: "@extension",
        entry: "http://localhost:3002/assets/remoteEntry.js",
        type: "esm",
        force: true,
      },
    ],
  });
  return <Component {...pageProps} />;
}

import { Inter } from "next/font/google";
import ExternalComponentLoader from "@/components/ExternalComponentLoader";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import useGetPathways from "@/hooks/getPathways";
const inter = Inter({ subsets: ["latin"] });

const buttonStyle = {
  border: "0 solid #e2e8f0",
  margin: "10px",
  backgroundColor: "rgb(246, 179, 82)",
  borderRadius: ".25rem",
  fontWeight: "700",
  padding: ".5rem 1rem .5rem 1rem",
  color: "rgb(24, 24, 24)",
};

export default function Home() {
  const client = new ApolloClient({
    uri: "https://api.development.awellhealth.com/orchestration/m2m/graphql",
    cache: new InMemoryCache(),
    headers: {
      apikey: process.env.NEXT_PUBLIC_ORCHESTRATION_API_KEY ?? "",
    },
  });


  const [extensionName, _] = useState<string>("extension-one");

  return (
    <div>
      <h1 className="my-4 text-4xl font-inter">Host</h1>

      <ApolloProvider client={client}>
        <PathwayViewerComponent />
        <br></br>
        <hr />
          <ExternalComponentLoader extensionName={extensionName} />
      </ApolloProvider>
    </div>
  );
}

const PathwayViewerComponent = () => {
  const { loading, error, pathways } = useGetPathways();

  return (
    <>
      {!loading && !error && pathways.length && (
        <div className="my-4">
          <h2>Pathways (OrchestrationAPI)</h2>
          <ul className="flex gap-2">
            {pathways.slice(0, Math.min(pathways.length, 5)).map((pathway) => (
              <li
                className="rounded-full px-2 py-1 text-white bg-blue-500"
                key={pathway.id}
              >
                {pathway.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-red-500">Error loading pathways</p>}
    </>
  );
};

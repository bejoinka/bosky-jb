"use client";

import { FC, Suspense, useEffect, useState } from "react";
import { loadRemote } from "@module-federation/runtime";

interface ExternalComponentProps {
  extensionName: string;
}
const ExternalComponentLoader: FC<ExternalComponentProps> = ({
  extensionName,
}) => {
  const [Component, setComponent] = useState<FC<any> | null>(null);
  useEffect(() => {
    loadRemote(`@extension/${extensionName}`)
      .then((m) => {
        const mod = m as any;
        setComponent(() => mod as FC<any>);
      })
      .catch((err) => {
        setComponent(() => <p>Extension {extensionName} not found</p>);
      });
    return () => {
      setComponent(null);
    };
  }, [extensionName]);
  if (Component === null) return <p>Loading...</p>;
  return (
    <>
      <Suspense>
        <Component
          date={new Date()}
          onComplete={(object: string) => {
            console.log(`Received ${object} from host`);
          }}
        />
      </Suspense>
    </>
  );
};
export default ExternalComponentLoader;

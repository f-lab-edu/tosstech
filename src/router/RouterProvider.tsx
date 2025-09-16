import { createContext, useEffect, useState } from "react";
import type { CompiledRoute } from "./type";

type Params = Record<string, string>;

const ParamsContext = createContext<Params>({});

export function RouterProvider({ router }: { router: CompiledRoute[] }) {
  const [Element, setElement] = useState<React.ReactNode>(null);
  const [params, setParams] = useState<Params>({});

  function render(path: string) {
    let matched = false;

    for (const route of router) {
      const result = route.path.exec(path); // 한 번만 호출
      if (result) {
        setParams(result.groups ?? {});
        setElement(route.element);
        matched = true;
        break;
      }
    }

    if (!matched) {
      setParams({});
      setElement(<h1>404 ERROR PAGE</h1>);
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    render(path);

    window.addEventListener("popstate", () => {
      render(path);
    });
  }, []);

  return (
    <ParamsContext.Provider value={params}>{Element}</ParamsContext.Provider>
  );
}

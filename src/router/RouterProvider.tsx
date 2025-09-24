import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RouterContext } from "./context";
import type { Route, Router } from "./type";
import { pathToRegex } from "./utils";

type Params = Record<string, string>;

interface MatchedRouteMetadata {
  params: Params;
  element: React.ReactNode;
}

function getMatchedRoute(
  pathname: string,
  routes: Route[]
): MatchedRouteMetadata | null {
  for (const route of routes) {
    const pathRegex = pathToRegex(route.path);
    const matched = pathRegex.exec(pathname);

    if (matched) {
      return {
        params: matched.groups ?? {},
        element: route.element,
      };
    }
  }

  return null;
}

export function RouterProvider({ routes }: { routes: Route[] }) {
  const [Element, setElement] = useState<React.ReactNode>(
    getMatchedRoute(window.location.pathname, routes)?.element ?? null
  );
  const [params, setParams] = useState<Params>({});

  const update = usePreservedCallback((path: string) => {
    const matched = getMatchedRoute(path, routes);

    if (matched) {
      setParams(matched.params);
      setElement(matched.element);
    } else {
      setParams({});
      setElement(<h1>404 ERROR PAGE</h1>);
    }
  });

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      "popstate",
      () => {
        update(window.location.pathname);
      },
      {
        signal: abortController.signal,
      }
    );

    return () => abortController.abort();
  }, [update]);

  const navigate = useCallback(
    (path: string) => {
      window.history.pushState(null, "", path);
      update(path);
    },
    [update]
  );

  const back = useCallback(() => {
    window.history.back();
  }, []);

  const router = useMemo<Router>(
    () => ({
      params,
      navigate,
      back,
    }),
    [params, navigate, back]
  );

  return <RouterContext value={router}>{Element}</RouterContext>;
}

function usePreservedCallback<Fn extends (path: string) => unknown>(
  callback: Fn
) {
  const ref = useRef(callback);
  ref.current = callback;

  return useCallback((path: string) => {
    return ref.current(path);
  }, []);
}

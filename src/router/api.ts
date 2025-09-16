import type { CompiledRoute, Route } from "./type";

function pathToRegex(path: string): RegExp {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // const pattern = "^" + escaped.replace(/\/:([^/]+)/g, "/[^/]+") + "$";
  const pattern =
    "^" +
    escaped.replace(/\/:([^/]+)/g, (_m, name) => `/(?<${name}>[^/]+)`) +
    "$";

  return new RegExp(pattern);
}

export function createBrowserRouter(router: Route[]): CompiledRoute[] {
  return router.map((route) => {
    return {
      path: pathToRegex(route.path),
      element: route.element,
    };
  });
}

import type { MatchedRouteMetadata, Params, Route } from "./type";
import { pathToRegex } from "./utils";

export class Router<T> {
  private routes: Route<T>[];
  private element: T | null;
  private params: Params;
  private render: (element: T) => void;

  constructor(routes: Route<T>[], render: (element: T) => void) {
    this.routes = routes;
    this.element =
      this.getMatchedRoute(window.location.pathname)?.element ?? null;
    this.params = this.getMatchedRoute(window.location.pathname)?.params ?? {};
    this.render = render;

    this.update();
    window.addEventListener("popstate", () => {
      this.update();
    });
  }

  private getMatchedRoute(path: string): MatchedRouteMetadata<T> | null {
    for (const route of this.routes) {
      const pathRegex = pathToRegex(route.path);
      const matched = pathRegex.exec(path);

      if (matched) {
        return { params: matched.groups ?? {}, element: route.element };
      }
    }

    return null;
  }

  private update() {
    const matched = this.getMatchedRoute(window.location.pathname);

    if (matched) {
      this.params = matched.params;
      this.element = matched.element;
      this.render(this.element);
    } else {
      this.params = {};
      this.element = null;
      this.render(this.element!);
    }
  }

  public navigate = (path: string): void => {
    window.history.pushState(null, "", path);
    this.update();
  };

  public back = (): void => {
    window.history.back();
  };

  public getParams(): Params {
    return this.params;
  }
}

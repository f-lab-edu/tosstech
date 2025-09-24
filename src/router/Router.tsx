import type { MatchedRouteMetadata, Params, Route } from "./type";
import { pathToRegex } from "./utils";

export class Router {
  private routes: Route[];
  private element: React.ReactNode;
  private params: Params;
  private render: (element: React.ReactNode) => void;

  constructor(routes: Route[], render: (element: React.ReactNode) => void) {
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

  private getMatchedRoute(path: string): MatchedRouteMetadata | null {
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
      this.element = <h1>404 ERROR PAGE</h1>;
      this.render(this.element);
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

  public getElement(): React.ReactNode {
    return this.element;
  }
}

import type { MatchedRouteMetadata, Params, Route } from "./type";
import { pathToRegex } from "./utils";

class Router<TRoute extends Route> extends EventTarget {
  private routes: TRoute[];
  private currentRoute: TRoute | undefined;

  private params: Params = {};

  readonly dispose: () => void;

  constructor(routes: TRoute[]) {
    super();

    this.routes = routes;
    this.update();

    const abortController = new AbortController();

    window.addEventListener(
      "popstate",
      () => {
        this.update();
      },
      {
        signal: abortController.signal,
      }
    );

    this.dispose = () => abortController.abort();
  }

  private getMatchedRoute(path: string): MatchedRouteMetadata<TRoute> | null {
    for (const route of this.routes) {
      const pathRegex = pathToRegex(route.path);
      const matched = pathRegex.exec(path);

      if (matched) {
        return { params: matched.groups ?? {}, route };
      }
    }

    return null;
  }

  private update() {
    const matched = this.getMatchedRoute(window.location.pathname);

    this.currentRoute = matched?.route;
    this.params = matched?.params ?? {};

    if (matched) {
      this.params = matched.params;
    } else {
      this.params = {};
    }

    this.dispatchEvent(new Event("routechange"));
  }

  public getCurrentRoute() {
    return this.currentRoute;
  }

  public navigate = (path: string): void => {
    window.history.pushState(null, "", path);
    this.update();
  };

  public back = (): void => {
    window.history.back();
    this.update();
  };

  public getParams(): Params {
    return this.params;
  }
}

export { Router };
